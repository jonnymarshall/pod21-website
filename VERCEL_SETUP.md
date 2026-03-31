# Vercel Production Setup Guide

This guide walks you through setting up the privacy secrets for production deployment on Vercel.

## How It Works

The app automatically loads secrets from:
1. **Environment variables** (production in Vercel)
2. **Fallback to secrets/ folder** (local development)

This means:
- Development works with `secrets/` folder locally
- Production uses environment variables from Vercel

## Setup Steps

### Step 1: Set Company Info (One-Time Setup)

Go to your Vercel project: https://vercel.com/dashboard → Settings → Environment Variables

Add one variable:
- **Variable Name**: `VITE_COMPANY_INFO_JSON`
- **Value**: Copy the minified JSON from `secrets/company-info.json` (all on one line, no spaces)
- **Environment**: Production

Example:
```
{"name":"POD21 LLC","address":{"street":"4834 NW 2ND AVE UNIT #590","city":"BOCA RATON","state":"Florida","zip":"33431"},"taxId":"38-4369206","supportEmail":"jonny@pod21.xyz"}
```

### Step 2: Generate and Add Invoices

Run this command:

```bash
node scripts/generate-env-secrets.js
```

The script outputs the value and next steps:

1. **Update Vercel:**
   ```bash
   vercel env update VITE_INVOICES_JSON
   ```
   When prompted, copy and paste the value from the script output

2. **Pull to .env.local:**
   ```bash
   vercel env pull
   ```

3. **Push to main:**
   ```bash
   git push origin main
   ```

### Step 3: Test and Deploy

After updating Vercel, test locally with your new invoices, then push to deploy:

```bash
git push origin main
```

### Step 4: Verify

After deployment, verify:
1. Invoice page loads at `/pay/YOUR-INVOICE-ID`
2. Company information displays correctly
3. No warning banner about missing environment variables

---

## Updating Invoices in Production

When you add new invoices or mark invoices as paid:

1. Edit `secrets/invoices.json` locally
2. Run `node scripts/generate-env-secrets.js`
3. Run `vercel env update VITE_INVOICES_JSON` and paste the value from the script
4. Run `vercel env pull` to update `.env.local`
5. Push to main to deploy

**Note:** Mark invoices as `"paid": true` in `secrets/invoices.json` to exclude them from the environment variable.

## For Development Locally

### Option A: Using .env.local (Recommended)

1. Copy the `.env.local.example` template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and paste the values:
   ```
   VITE_INVOICES_JSON='[...]'
   VITE_COMPANY_INFO_JSON='{...}'
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Option B: Using secrets/ folder (Default)

The app automatically falls back to `secrets/` folder if environment variables aren't set:
- `secrets/invoices.json`
- `secrets/company-info.json`

## Security Checklist

- ✅ Never commit `.env.local` (it's in `.gitignore`)
- ✅ Never expose environment variables in logs
- ✅ Use Vercel's encrypted environment variable storage
- ✅ Bitcoin addresses are masked in the UI (only first 8 + last 6 chars)
- ✅ Full addresses only visible in email confirmations (to admin only)


## Troubleshooting

### Warning banner appears (missing env variables)
- Check that you ran `vercel env pull` after adding environment variables
- Verify the variable names are exactly `VITE_INVOICES_JSON` and `VITE_COMPANY_INFO_JSON` (case-sensitive)
- Restart your dev server after pulling

### JSON parsing errors
- Ensure the JSON is valid (no extra spaces, proper quotes)
- Run `node scripts/generate-env-secrets.js` to regenerate
- Check the script output matches what you copied to Vercel

## Questions?

- See `SECRETS_SETUP.md` for local secrets setup
- See `secrets/README.md` for detailed file documentation
- Check `src/utils/secretsLoader.ts` to understand how loading works
