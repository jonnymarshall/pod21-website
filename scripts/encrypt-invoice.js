#!/usr/bin/env node

/**
 * Encrypt invoice customer data
 * Usage: node scripts/encrypt-invoice.js <path-to-json>
 * Example: node scripts/encrypt-invoice.js my-invoice.json
 *
 * The JSON file should contain: passphrase, customerName, address, btcAddress, services
 */

import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';

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
  const required = ['passphrase', 'customerName', 'address', 'btcAddress', 'services'];
  const missing = required.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  const { passphrase, ...invoiceData } = data;
  const jsonString = JSON.stringify(invoiceData);
  const encrypted = CryptoJS.AES.encrypt(jsonString, passphrase).toString();

  console.log('\n✅ Encrypted Data:\n');
  console.log(encrypted);
  console.log('\n📋 Next steps:');
  console.log('1. Copy the encrypted string above');
  console.log('2. Add to secrets/invoices.json:');
  console.log('   {');
  console.log('     "id": "INV-XXX",');
  console.log('     "invoiceDate": "2026-04-XX",');
  console.log('     "dueWithin": 30,');
  console.log('     "companyName": "...",');
  console.log('     "encryptedData": "[paste encrypted string here]",');
  console.log('     "paid": false');
  console.log('   }');
  console.log('3. Run: node scripts/generate-env-secrets.js');
  console.log('4. Update Vercel and deploy');
  console.log('\n🔐 Passphrase saved in your invoice file for future reference\n');
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
