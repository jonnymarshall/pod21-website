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
  const allInvoices = JSON.parse(invoicesContent);

  // Filter out paid invoices
  const unpaidInvoices = allInvoices.filter(inv => !inv.paid);

  const invoicesJson = JSON.stringify(unpaidInvoices);

  // ANSI color codes
  const cyan = '\x1b[36m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';

  // Output
  console.log(`\n${cyan}${bold}📦 Invoice Generation Complete${reset}\n`);
  console.log(`${green}📋 Total invoices: ${allInvoices.length}${reset}`);
  console.log(`${green}✓ Unpaid invoices: ${unpaidInvoices.length}${reset}\n`);
  console.log(`${bold}${yellow}📝 Environment Variable Value:${reset}`);
  console.log(`${bold}${invoicesJson}${reset}\n`);
  console.log(`${bold}${yellow}Next Steps:${reset}\n`);
  console.log(`${cyan}1. Run this command:${reset}`);
  console.log(`   ${bold}vercel env update VITE_INVOICES_JSON${reset}\n`);
  console.log(`${cyan}   When prompted, copy and paste this value:${reset}`);
  console.log(`   ${bold}${invoicesJson}${reset}\n`);
  console.log(`${cyan}2. Pull variables to .env.local:${reset}`);
  console.log(`   ${bold}vercel env pull${reset}\n`);
  console.log(`${cyan}3. Push to main:${reset}`);
  console.log(`   ${bold}git push origin main${reset}\n`);
  console.log(`${green}✅ VITE_COMPANY_INFO_JSON is static - no need to regenerate${reset}\n`);

} catch (error) {
  console.error('Error reading invoices.json:', error.message);
  process.exit(1);
}
