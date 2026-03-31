#!/usr/bin/env node

/**
 * Generate VITE_INVOICES_JSON environment variable
 *
 * Usage: node scripts/generate-env-secrets.js
 *
 * This script reads invoices.json from secrets/ and outputs
 * the minified JSON ready for environment variables.
 *
 * NOTE: VITE_COMPANY_INFO_JSON is static and only needs to be set once.
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
  const invoicesJson = JSON.stringify(JSON.parse(invoicesContent));

  // Output
  console.log('# Copy this to your .env.local or Vercel dashboard:\n');
  console.log(`VITE_INVOICES_JSON='${invoicesJson}'`);
  console.log('\n✅ VITE_COMPANY_INFO_JSON is static - no need to regenerate');

} catch (error) {
  console.error('Error reading invoices.json:', error.message);
  process.exit(1);
}
