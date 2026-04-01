# Invoice & Bitcoin Payment System

Complete guide for managing invoices, payments, and Bitcoin integration.

## Overview

The payment system uses two JSON files to manage invoices and company information:

- `invoices.json` — Array of invoices with customer and service details
- `company-info.json` — Company billing information

In development, these load from `secrets/`. In production, they're stored as Vercel environment variables.

## File Structure

### invoices.json
See [`secrets/invoices.json.example`](../../secrets/invoices.json.example) for structure and fields.

**Key fields:**
- `invoiceDate` — Invoice date in YYYY-MM-DD format
- `dueWithin` — Number of days until payment is due
- `services` — Array of line items (auto-calculates total from quantity × unitValue)
- `paid` — Only invoices with `false` are deployed to production

**Due Date Calculation:** Due date = `invoiceDate` + `dueWithin` days. Displays automatically on invoice page. If overdue, a red warning appears.

### company-info.json
See [`secrets/company-info.json.example`](../../secrets/company-info.json.example) for structure and fields.

⚠️ **Avoid special characters** in all text fields: `#`, `$`, `\`, `` ` ``, `&`, `|`, `;` — they break shell parsing when pushed to Vercel

## Local Development

Start the dev server:

```bash
npm run dev
```

The app automatically loads invoice and company data from:
1. Environment variables in `.env.local` (if you ran `vercel env pull`)
2. `secrets/` folder as fallback (if env vars aren't set)

**Important:** Never commit `secrets/` files — they're in `.gitignore`.

## Updating Data in Production

### Updating Invoices

When you add new invoices or mark some as paid:

1. Edit `secrets/invoices.json` locally
2. Run `node scripts/generate-env-secrets.js`
3. Run `vercel env update VITE_INVOICES_JSON` and paste the new value
4. Run `vercel env pull`
5. Commit and push:
   ```bash
   git push origin main
   ```

**Tips:**
- Mark invoices as `"paid": true` to exclude them from production
- When updating `invoiceDate` or `dueWithin`, re-run `generate-env-secrets.js` to push changes to Vercel

### Updating Company Info

1. Edit `secrets/company-info.json` locally
2. Run `node scripts/generate-env-secrets.js`
3. Run `vercel env update VITE_COMPANY_INFO_JSON` and paste the new value
4. Run `vercel env pull`
5. Commit and push

## How It Works

### Loading Data

The app loads data in this order:

1. Try to load from environment variables (production)
2. Fall back to local files in `secrets/` folder (development)

**Result:** Same app code works locally and in production with no configuration changes.

### Invoice Workflow

1. **Invoice Page** (`/pay/:invoiceId`)
   - Displays invoice date and calculated due date
   - Shows red overdue warning if invoice is past the due date
   - Lists itemized services with automatic total calculation
   - Bitcoin payment option available
   - User clicks "Generate Payment" to lock in BTC price

2. **Security Warning**
   - Dialog appears: "Check the address matches after scanning"
   - User must click OK before seeing the QR code

3. **Payment Details**
   - QR code generated from invoice data and locked BTC amount
   - Shows masked Bitcoin address and payment details
   - User scans and sends payment

4. **Confirmation Page** (`/pay/:invoiceId/payment-registered`)
   - Displays payment registration confirmation
   - Shows all invoice and payment details
   - EmailJS automatically sends confirmation email to support
   - User can print or save as PDF

### Email Confirmations

- Sent automatically when user reaches confirmation page
- Uses EmailJS with template variables
- Prevents duplicate emails within a browser session
- Email includes: Invoice ID, USD amount, BTC amount, BTC price, address, timestamp

## Security Notes

- ✅ Bitcoin addresses are masked in the UI
- ✅ Full addresses only in email confirmations (admin only)
- ✅ Only unpaid invoices deployed to production
- ✅ Environment variables encrypted in Vercel
- ✅ Never commit `.env.local` or `secrets/` files

## Troubleshooting

### Missing Environment Variables Warning
- Ensure you ran `vercel env pull` after updating Vercel
- Verify variable names are exactly: `VITE_INVOICES_JSON`, `VITE_COMPANY_INFO_JSON`
- Restart dev server after pulling

### JSON Parsing Errors
- Run `node scripts/generate-env-secrets.js` to regenerate
- Verify the value matches what you copied to Vercel
- Check for proper JSON formatting (use the script output, don't manual create)

### Invoice Not Found
- Invoice IDs are case-insensitive (e.g., `test`, `TEST`, `Test` all work)
- Verify the invoice exists in `secrets/invoices.json`
- Confirm `"paid": false` in the file (paid invoices are excluded)

### Email Not Sending
- Verify EmailJS credentials in `src/pages/InvoiceConfirmation.tsx`
- Check browser console for errors
- Ensure first payment attempt triggers the email (same session prevents duplicates)

### Invoice Date or Due Date Not Showing
- Invoice date must be in `YYYY-MM-DD` format (e.g., `2026-04-01`)
- Both `invoiceDate` and `dueWithin` must be present in the JSON
- After editing `secrets/invoices.json`, run `node scripts/generate-env-secrets.js` and update Vercel
- Run `vercel env pull` to sync changes locally

### Overdue Warning Not Appearing
- Ensure `invoiceDate` and `dueWithin` are set correctly
- Check browser date/time settings (overdue flag compares against current date)
- Verify the calculated due date is actually in the past
