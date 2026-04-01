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
- `id` — Unique invoice identifier
- `invoiceDate` — Invoice date in YYYY-MM-DD format
- `dueWithin` — Number of days until payment is due
- `companyName` — Your company name (public, not encrypted)
- `encryptedData` — Encrypted customer details (optional - see below)
- `paid` — Only invoices with `false` are deployed to production

**Encrypted vs Unencrypted:**
- **Unencrypted:** Include `customerName`, `address`, `services`, `btcAddress` directly in JSON (less secure)
- **Encrypted:** Include `encryptedData` instead (more secure - requires passphrase to view)

**Due Date Calculation:** Due date = `invoiceDate` + `dueWithin` days. Displays automatically on invoice page. If overdue, a red warning appears.

### company-info.json
See [`secrets/company-info.json.example`](../../secrets/company-info.json.example) for structure and fields.

⚠️ **Avoid special characters** in all text fields: `#`, `$`, `\`, `` ` ``, `&`, `|`, `;` — they break shell parsing when pushed to Vercel

## Encryption (Optional Security)

For additional security, you can encrypt customer data in invoices. This prevents invoice details from being visible in the browser, even if someone discovers the invoice URL.

### How It Works

**Security Model:**
- Customer data (name, address, services, Bitcoin address) is encrypted using AES encryption
- Encrypted data is stored in `encryptedData` field as an unreadable string (e.g., `U2FsdGVkX1...`)
- The encrypted string is baked into the JavaScript bundle when you deploy
- **Important**: The encrypted string alone is useless without the passphrase
- User enters the passphrase on the invoice page to decrypt at runtime (client-side only)
- Passphrase is never stored, sent to server, or logged - decryption happens entirely in the browser
- Someone with the URL cannot see invoice data without knowing the passphrase

**Example: Encrypted vs Unencrypted**

Unencrypted invoice (data is visible in browser):
```json
{
  "id": "INV-001",
  "invoiceDate": "2026-03-31",
  "dueWithin": 30,
  "companyName": "Acme Corp",
  "customerName": "John Doe",
  "address": "123 Main St, City, State 12345",
  "services": [
    { "description": "Consulting", "quantity": 10, "unitValue": 100 }
  ],
  "btcAddress": "bc1qxxx...",
  "paid": false
}
```

Encrypted invoice (data is hidden, requires passphrase):
```json
{
  "id": "INV-002",
  "invoiceDate": "2026-04-01",
  "dueWithin": 30,
  "companyName": "Acme Corp",
  "encryptedData": "U2FsdGVkX195YN53LQajyQiiofu1Y+4ZHMXxV6nJRT2Y/C4LjG+YucBS/in3CQIaeqdNt/CLQxqCGttEcAZ7qzp7o8Md5oezaA+nXnK3Nje9Peu7VxU03ERj/XV34mKt8sbwHF6FnyYBOJ3LNBIqupG3mQpxmfvGzQxyqEgFXhvkLsAMU8q96QW4pi5fQVZY8XwxuxBfkxjh2j2Op3Fde2p+FS8QipeE+JbYRNH8k1YmIWQFaBc2po25TJX7koRAuoatlEnPkgd0BGNv51YjsPPb+AQcftv1kOdd+jfnH2I=",
  "paid": false
}
```

### Encrypting Invoice Data

**Standard workflow:**

1. Copy the template and fill in customer details:
   ```bash
   cp scripts/invoice-data.template.json my-invoice.json
   # Edit my-invoice.json with actual customer data
   ```

2. Run the encryption script with the file and passphrase:
   ```bash
   node scripts/encrypt-invoice.js my-invoice.json "my-secret-passphrase"
   ```

3. The script outputs the encrypted data and next steps. Copy the encrypted string.

**For quick testing:**
```bash
node scripts/generate-encrypted-invoice.js "testpassphrase123"
```

This generates encrypted test data instantly.

### Adding Encrypted Invoice to invoices.json

1. Run one of the encryption scripts above
2. Copy the encrypted output string
3. Add the encrypted invoice to `secrets/invoices.json`:
   ```json
   {
     "id": "INV-002",
     "invoiceDate": "2026-04-01",
     "dueWithin": 30,
     "companyName": "Acme Corp",
     "encryptedData": "U2FsdGVkX1...",
     "paid": false
   }
   ```
4. Run `node scripts/generate-env-secrets.js` to regenerate env vars
5. Run `vercel env update VITE_INVOICES_JSON` and paste the output
6. Run `vercel env pull` to sync changes locally
7. Share the invoice URL with the customer via one channel, and the passphrase via a **separate secure channel** (not email, use Signal/Wire/etc)

### Testing Encrypted Invoices Locally

**With environment variables (simulates production):**
- Encrypted invoices appear in your app if `VITE_INVOICES_JSON` is set in `.env.local`
- The encrypted-test invoice should prompt for a passphrase
- Enter `testpassphrase123` to decrypt

**Without environment variables (fallback to secrets/ folder):**
1. Comment out `VITE_INVOICES_JSON` in `.env.local`
2. Restart dev server: `npm run dev`
3. Now it falls back to `secrets/invoices.json`
4. Visit `/pay/encrypted-test` and enter passphrase `testpassphrase123`

### Backwards Compatibility

The system supports both encrypted and unencrypted invoices in the same file. You can mix and match:
- Some invoices with `customerName`, `address`, `services` (unencrypted)
- Some invoices with `encryptedData` only (encrypted)
- Same app code handles both automatically

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

### Encrypted Invoice Not Prompting for Passphrase
- Ensure the invoice has `encryptedData` field (not unencrypted fields like `customerName`)
- Make sure you ran `vercel env pull` and restarted dev server after adding encrypted invoices
- If using fallback mode (env var commented out), the invoice must exist in `secrets/invoices.json`

### "Invalid Passphrase" Error
- Verify you're entering the exact passphrase used when generating the encrypted data
- Passphrases are case-sensitive
- If you forget the passphrase, regenerate the invoice with `encrypt-invoice.js` or `generate-encrypted-invoice.js`

### Encrypted Data Not Generating
- Ensure `scripts/encrypt-invoice.js` or `scripts/generate-encrypted-invoice.js` exist in the project
- Try the quick test script first: `node scripts/generate-encrypted-invoice.js "testpassphrase123"`
- Check Node.js version (should be 18+)
- Verify `crypto-js` is installed: `npm list crypto-js`

### Encryption Working Locally but Not in Production
- After adding encrypted invoices, you must run `node scripts/generate-env-secrets.js`
- Then run `vercel env update VITE_INVOICES_JSON` with the new value
- Finally run `vercel env pull` to sync to local dev
- Restart dev server with `npm run dev`
- Production deploys automatically after pushing to main
