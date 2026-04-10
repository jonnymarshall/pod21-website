#!/usr/bin/env node

/**
 * Sync invoices: Encrypt unencrypted-invoices.json and update encrypted-invoices.json
 *
 * This script:
 * 1. Reads unencrypted-invoices.json (your source of truth)
 * 2. Encrypts any invoices that don't already exist in encrypted-invoices.json
 * 3. Updates the paid status for all invoices
 * 4. Writes encrypted-invoices.json
 * 5. Updates environment variables
 *
 * Usage: node scripts/sync-invoices.js
 */

import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ANSI color codes
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';
const bold = '\x1b[1m';

try {
  console.log(`\n${cyan}${bold}🔐 Invoice Sync${reset}\n`);

  // Read unencrypted invoices
  const unencryptedPath = path.join(__dirname, '..', 'secrets', 'unencrypted-invoices.json');
  if (!fs.existsSync(unencryptedPath)) {
    throw new Error(`unencrypted-invoices.json not found at ${unencryptedPath}`);
  }

  const unencryptedContent = fs.readFileSync(unencryptedPath, 'utf-8');
  let unencrypted = JSON.parse(unencryptedContent);

  // Ensure it's an array
  if (!Array.isArray(unencrypted)) {
    unencrypted = [unencrypted];
  }

  // Read existing encrypted invoices
  const encryptedPath = path.join(__dirname, '..', 'secrets', 'encrypted-invoices.json');
  let encrypted = [];

  if (fs.existsSync(encryptedPath)) {
    const content = fs.readFileSync(encryptedPath, 'utf-8');
    if (content.trim()) {
      const parsed = JSON.parse(content);
      // Handle both old array format and new object format with metadata
      encrypted = Array.isArray(parsed) ? parsed : parsed.invoices || [];
    }
  }

  // Process each unencrypted invoice
  const newEncrypted = [];
  const added = [];
  const updated = [];

  for (const invoice of unencrypted) {
    // Validate required fields
    const required = ['id', 'invoiceDate', 'dueWithin', 'companyName', 'passphrase', 'customerName', 'address', 'btcAddress', 'services'];
    const missing = required.filter(field => !invoice[field]);
    if (missing.length > 0) {
      throw new Error(`Invoice ${invoice.id}: Missing required fields: ${missing.join(', ')}`);
    }

    // Check if this invoice already exists in encrypted
    const existing = encrypted.find(inv => inv.id === invoice.id);
    const paid = invoice.paid === true ? true : false;

    // Always encrypt (handles new invoices and updates to existing data)
    const { passphrase, customerName, address, btcAddress, services, id, invoiceDate, dueWithin, companyName } = invoice;
    const toEncrypt = { customerName, address, btcAddress, services };
    const jsonString = JSON.stringify(toEncrypt);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, passphrase).toString();

    if (existing) {
      // Track as update
      updated.push(invoice.id);
    } else {
      // Track as new
      added.push(id);
    }

    newEncrypted.push({
      id,
      invoiceDate,
      dueWithin,
      companyName,
      encryptedData,
      paid
    });
  }

  // Write encrypted invoices
  fs.writeFileSync(encryptedPath, JSON.stringify(newEncrypted, null, 2) + '\n');

  // Update sync timestamp file to trigger git changes
  const syncTimestampPath = path.join(__dirname, '..', '.invoice-sync');
  const now = new Date().toISOString();
  fs.writeFileSync(syncTimestampPath, now);

  console.log(`\n${cyan}${bold}✅ Invoices synced!${reset}\n`);
  if (added.length > 0) {
    console.log(`${cyan}📝 Added (encrypted):${reset}`);
    added.forEach(id => console.log(`   ${green}✓${reset} ${id}`));
  }
  if (updated.length > 0) {
    console.log(`${cyan}🔄 Updated (status only):${reset}`);
    updated.forEach(id => console.log(`   ${green}✓${reset} ${id}`));
  }

  // Generate environment variable value
  console.log(`\n${cyan}🔧 Generating environment variable...${reset}\n`);
  const unpaidInvoices = newEncrypted.filter(inv => !inv.paid);
  const invoicesJsonValue = JSON.stringify(unpaidInvoices);

  console.log(`${green}📊 Total invoices: ${newEncrypted.length}${reset}`);
  console.log(`${green}✓ Unpaid invoices: ${unpaidInvoices.length}${reset}\n`);
  console.log(`${bold}${yellow}VITE_INVOICES_JSON Value:${reset}`);
  console.log(`${bold}${invoicesJsonValue}${reset}`);

  console.log(`\n${cyan}${bold}📋 Next steps:${reset}\n`);
  console.log(`${cyan}1. Copy the VITE_INVOICES_JSON value above${reset}`);
  console.log(`${cyan}2. Run:${reset} ${bold}vercel env update VITE_INVOICES_JSON${reset}`);
  console.log(`${cyan}3. Run:${reset} ${bold}vercel env pull${reset}`);
  console.log(`${cyan}4. Run:${reset} ${bold}git push origin main${reset}\n`);
} catch (error) {
  console.error(`\n${yellow}❌ ${error.message}${reset}\n`);
  process.exit(1);
}
