#!/usr/bin/env node

/**
 * Generate .env.local from secrets/ folder
 *
 * Usage: node scripts/generate-env-secrets.js
 *
 * This script reads the JSON files from secrets/ and outputs
 * environment variable format that can be added to .env.local
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const secretsDir = path.join(__dirname, '../secrets');

try {
  // Read invoices.json
  const invoicesPath = path.join(secretsDir, 'invoices.json');
  const invoicesContent = fs.readFileSync(invoicesPath, 'utf8');
  const invoicesJson = invoicesContent.replace(/\n/g, '').replace(/'/g, "\\'");

  // Read company-info.json
  const companyPath = path.join(secretsDir, 'company-info.json');
  const companyContent = fs.readFileSync(companyPath, 'utf8');
  const companyJson = companyContent.replace(/\n/g, '').replace(/'/g, "\\'");

  // Read clients.json
  const clientsPath = path.join(secretsDir, 'clients.json');
  const clientsContent = fs.readFileSync(clientsPath, 'utf8');
  const clientsJson = clientsContent.replace(/\n/g, '').replace(/'/g, "\\'");

  // Output
  console.log('# Add these to your .env.local file:\n');
  console.log(`VITE_INVOICES_JSON='${invoicesJson}'`);
  console.log(`VITE_COMPANY_INFO_JSON='${companyJson}'`);
  console.log(`VITE_CLIENTS_JSON='${clientsJson}'`);
  console.log('\n✅ Copy the above lines to your .env.local file');

} catch (error) {
  console.error('Error reading secrets files:', error.message);
  process.exit(1);
}
