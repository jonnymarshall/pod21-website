#!/usr/bin/env node

/**
 * Generate encrypted invoice data
 * Usage: node scripts/generate-encrypted-invoice.js <passphrase>
 * Example: node scripts/generate-encrypted-invoice.js "mypassphrase123"
 */

import CryptoJS from 'crypto-js';

const passphrase = process.argv[2];

if (!passphrase) {
  console.error('Usage: node scripts/generate-encrypted-invoice.js <passphrase>');
  console.error('Example: node scripts/generate-encrypted-invoice.js "mypassphrase123"');
  process.exit(1);
}

const data = {
  customerName: "Test Customer",
  address: "123 Test St, Test City, Test State 12345",
  services: [
    {
      description: "Test Service",
      quantity: 10,
      unitValue: 100.00
    }
  ],
  btcAddress: "bc1qtest123456789test"
};

const jsonString = JSON.stringify(data);
const encrypted = CryptoJS.AES.encrypt(jsonString, passphrase).toString();

console.log('\n✅ Encrypted Invoice Data\n');
console.log('Passphrase:', passphrase);
console.log('\nEncrypted Data (copy to encryptedData field):\n');
console.log(encrypted);
console.log('\n');
