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
const bold = '\x1b[1m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

try {
  // Read unencrypted invoices
  const unencryptedPath = path.join(__dirname, 'unencrypted-invoices.json');
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
      encrypted = JSON.parse(content);
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

    if (existing) {
      // Update paid status
      existing.paid = paid;
      newEncrypted.push(existing);
      updated.push(invoice.id);
    } else {
      // Encrypt it
      const { passphrase, customerName, address, btcAddress, services, id, invoiceDate, dueWithin, companyName } = invoice;
      const toEncrypt = { customerName, address, btcAddress, services };
      const jsonString = JSON.stringify(toEncrypt);
      const encryptedData = CryptoJS.AES.encrypt(jsonString, passphrase).toString();

      newEncrypted.push({
        id,
        invoiceDate,
        dueWithin,
        companyName,
        encryptedData,
        paid
      });
      added.push(id);
    }
  }

  // Write encrypted invoices
  fs.writeFileSync(encryptedPath, JSON.stringify(newEncrypted, null, 2) + '\n');

  console.log('\n✅ Invoices synced!\n');
  if (added.length > 0) {
    console.log(`📝 Added (encrypted):`);
    added.forEach(id => console.log(`   - ${id}`));
  }
  if (updated.length > 0) {
    console.log(`🔄 Updated (status only):`);
    updated.forEach(id => console.log(`   - ${id}`));
  }

  // Generate environment variable value
  console.log('\n🔧 Generating environment variable...\n');
  const unpaidInvoices = newEncrypted.filter(inv => !inv.paid);
  const invoicesJsonValue = JSON.stringify(unpaidInvoices);

  console.log(`📝 Total invoices: ${newEncrypted.length}`);
  console.log(`✓ Unpaid invoices: ${unpaidInvoices.length}\n`);
  console.log(`${bold}${yellow}VITE_INVOICES_JSON Value:${reset}`);
  console.log(invoicesJsonValue);

  console.log('📋 Next steps:');
  console.log('1. Copy the VITE_INVOICES_JSON value above');
  console.log('2. Run: vercel env update VITE_INVOICES_JSON');
  console.log('3. Run: vercel env pull');
  console.log('4. Run: git push origin main\n');
} catch (error) {
  console.error(`\n❌ ${error.message}\n`);
  process.exit(1);
}
