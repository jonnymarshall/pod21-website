#!/usr/bin/env node

/**
 * Encrypt invoice customer data and add to invoices.json
 * Usage: node scripts/encrypt-invoice.js <path-to-json>
 * Example: node scripts/encrypt-invoice.js my-invoice.json
 *
 * The JSON file should contain: id, invoiceDate, dueWithin, companyName, passphrase, customerName, address, btcAddress, services
 */

import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('\n❌ Missing argument\n');
  console.error('Usage: node scripts/encrypt-invoice.js <path-to-json>');
  console.error('Example: node scripts/encrypt-invoice.js my-invoice.json\n');
  process.exit(1);
}

const filePath = args[0];

try {
  const fullPath = path.resolve(filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const data = JSON.parse(fileContent);

  // Validate required fields
  const required = ['id', 'invoiceDate', 'dueWithin', 'companyName', 'passphrase', 'customerName', 'address', 'btcAddress', 'services'];
  const missing = required.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  // Extract encryption data and metadata
  const { passphrase, id, invoiceDate, dueWithin, companyName, customerName, address, btcAddress, services } = data;

  // Data to encrypt (customer details only)
  const toEncrypt = { customerName, address, btcAddress, services };
  const jsonString = JSON.stringify(toEncrypt);
  const encrypted = CryptoJS.AES.encrypt(jsonString, passphrase).toString();

  // Create the invoice entry
  const invoiceEntry = {
    id,
    invoiceDate,
    dueWithin,
    companyName,
    encryptedData: encrypted,
    paid: false
  };

  // Read existing invoices.json
  const invoicesPath = path.join(__dirname, '..', 'secrets', 'invoices.json');
  let invoices = [];

  if (fs.existsSync(invoicesPath)) {
    const content = fs.readFileSync(invoicesPath, 'utf-8');
    invoices = JSON.parse(content);
  }

  // Remove existing invoice with same ID, then add new one
  invoices = invoices.filter(inv => inv.id !== id);
  invoices.push(invoiceEntry);

  // Write back to invoices.json
  fs.writeFileSync(invoicesPath, JSON.stringify(invoices, null, 2) + '\n');

  console.log('\n✅ Invoice encrypted and added to secrets/invoices.json\n');
  console.log(`📋 Invoice Entry:`);
  console.log(JSON.stringify(invoiceEntry, null, 2));
  console.log('\n📋 Next steps:');
  console.log('1. Run: node scripts/generate-env-secrets.js');
  console.log('2. Run: vercel env update VITE_INVOICES_JSON (paste output)');
  console.log('3. Run: vercel env pull');
  console.log('4. Run: git push origin main\n');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`\n❌ File not found: ${filePath}\n`);
  } else if (error instanceof SyntaxError) {
    console.error(`\n❌ Invalid JSON in ${filePath}\n`);
  } else {
    console.error(`\n❌ ${error.message}\n`);
  }
  process.exit(1);
}
