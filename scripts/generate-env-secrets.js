#!/usr/bin/env node

/**
 * Generate VITE_INVOICES_JSON and/or VITE_COMPANY_INFO_JSON environment variables
 *
 * Usage: node scripts/generate-env-secrets.js
 *
 * This script reads invoices.json and/or company-info.json from secrets/ and outputs
 * the minified JSON ready for environment variables.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const secretsDir = path.join(__dirname, '../secrets');

// ANSI color codes
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';
const bold = '\x1b[1m';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    console.log(`\n${cyan}${bold}🔐 Environment Secrets Generator${reset}\n`);
    console.log(`${yellow}What would you like to generate?${reset}`);
    console.log(`${cyan}1. Invoices (VITE_INVOICES_JSON)${reset}`);
    console.log(`${cyan}2. Company Info (VITE_COMPANY_INFO_JSON)${reset}`);
    console.log(`${cyan}3. Both${reset}\n`);

    const choice = await askQuestion(`${bold}Enter your choice (1-3):${reset} `);

    let generateInvoices = false;
    let generateCompany = false;

    if (choice === '1') {
      generateInvoices = true;
    } else if (choice === '2') {
      generateCompany = true;
    } else if (choice === '3') {
      generateInvoices = true;
      generateCompany = true;
    } else {
      console.error(`${yellow}Invalid choice. Please enter 1, 2, or 3.${reset}`);
      rl.close();
      process.exit(1);
    }

    let invoicesJson = null;
    let companyJson = null;
    let unpaidCount = 0;
    let totalCount = 0;

    if (generateInvoices) {
      const invoicesPath = path.join(secretsDir, 'encrypted-invoices.json');
      const invoicesContent = fs.readFileSync(invoicesPath, 'utf8');
      const allInvoices = JSON.parse(invoicesContent);
      const unpaidInvoices = allInvoices.filter(inv => !inv.paid);
      invoicesJson = JSON.stringify(unpaidInvoices);
      totalCount = allInvoices.length;
      unpaidCount = unpaidInvoices.length;
    }

    if (generateCompany) {
      const companyPath = path.join(secretsDir, 'company-info.json');
      const companyContent = fs.readFileSync(companyPath, 'utf8');
      const companyData = JSON.parse(companyContent);
      companyJson = JSON.stringify(companyData);
    }

    // Output results
    console.log(`\n${cyan}${bold}✅ Generation Complete${reset}\n`);

    if (generateInvoices) {
      console.log(`${green}📋 Total invoices: ${totalCount}${reset}`);
      console.log(`${green}✓ Unpaid invoices: ${unpaidCount}${reset}\n`);
      console.log(`${bold}${yellow}VITE_INVOICES_JSON Value:${reset}`);
      console.log(`${bold}${invoicesJson}${reset}\n`);
    }

    if (generateCompany) {
      console.log(`${bold}${yellow}VITE_COMPANY_INFO_JSON Value:${reset}`);
      console.log(`${bold}${companyJson}${reset}\n`);
    }

    console.log(`${bold}${yellow}Next Steps:${reset}\n`);

    if (generateInvoices && generateCompany) {
      console.log(`${cyan}1. Run these commands:${reset}`);
      console.log(`   ${bold}vercel env update VITE_INVOICES_JSON${reset}`);
      console.log(`   ${bold}vercel env update VITE_COMPANY_INFO_JSON${reset}\n`);
      console.log(`${cyan}2. When prompted for each, copy and paste the corresponding values above.${reset}\n`);
    } else if (generateInvoices) {
      console.log(`${cyan}1. Run this command:${reset}`);
      console.log(`   ${bold}vercel env update VITE_INVOICES_JSON${reset}\n`);
      console.log(`${cyan}2. When prompted, copy and paste this value:${reset}`);
      console.log(`   ${bold}${invoicesJson}${reset}\n`);
    } else if (generateCompany) {
      console.log(`${cyan}1. Run this command:${reset}`);
      console.log(`   ${bold}vercel env update VITE_COMPANY_INFO_JSON${reset}\n`);
      console.log(`${cyan}2. When prompted, copy and paste this value:${reset}`);
      console.log(`   ${bold}${companyJson}${reset}\n`);
    }

    console.log(`${cyan}3. Pull variables to .env.local:${reset}`);
    console.log(`   ${bold}vercel env pull${reset}\n`);
    console.log(`${cyan}4. Commit and push:${reset}`);
    console.log(`   ${bold}git add -A && git commit -m "Update environment secrets" && git push origin main${reset}\n`);
    console.log(`${green}✅ Done!${reset}\n`);

    rl.close();
  } catch (error) {
    console.error(`${yellow}Error:${reset}`, error.message);
    rl.close();
    process.exit(1);
  }
}

main();
