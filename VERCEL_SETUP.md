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

Example:
```
{"name":"POD21 LLC","address":{"street":"4834 NW 2ND AVE UNIT #590","city":"BOCA RATON","state":"Florida","zip":"33431"},"taxId":"38-4369206","supportEmail":"jonny@pod21.xyz"}
```

Make sure it's set for: ✅ Production, ✅ Preview, ✅ Development

### Step 2: Generate and Add Invoices

Run this command to convert invoices to environment variable format:

```bash
node scripts/generate-env-secrets.js
```

This outputs:
```
VITE_INVOICES_JSON='[{"id":"BA20260331",...}]'
```

Add to Vercel dashboard:
- **Variable Name**: `VITE_INVOICES_JSON`
- **Value**: Paste the full value from the script output

Make sure it's set for: ✅ Production, ✅ Preview, ✅ Development

Click "Save"

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"

Or simply push a new commit to trigger automatic deployment.

### Step 4: Verify

After deployment, check that:
1. The invoice page loads at `/pay/YOUR-INVOICE-ID`
2. Company information displays correctly
3. No console errors about missing secrets

---

## Updating Invoices in Production

When you add new invoices:

1. **Edit** `secrets/invoices.json` locally
2. **Run** `node scripts/generate-env-secrets.js`
3. **Copy** the output to Vercel dashboard (`VITE_INVOICES_JSON`)
4. **Redeploy** in Vercel

No need to touch company info - it's static once set!

## For Development Locally

### Option A: Using .env.local (Recommended)

1. Copy the `.env.local.example` template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and paste the values from Step 1:
   ```
   VITE_INVOICES_JSON='[...]'
   VITE_COMPANY_INFO_JSON='{...}'
   VITE_CLIENTS_JSON='[]'
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Option B: Using secrets/ folder (Default)

The app automatically falls back to `secrets/` folder if environment variables aren't set, so you can also just keep using:
- `secrets/invoices.json`
- `secrets/company-info.json`
- `secrets/clients.json`

## Security Checklist

- ✅ Never commit `.env.local` (it's in `.gitignore`)
- ✅ Never expose environment variables in logs
- ✅ Use Vercel's encrypted environment variable storage
- ✅ Bitcoin addresses are masked in the UI (only first 8 + last 6 chars)
- ✅ Full addresses only visible in email confirmations (to admin only)

## Updating Secrets in Production

To update invoices, company info, or clients:

1. Edit the JSON files in `secrets/` folder locally
2. Run `node scripts/generate-env-secrets.js`
3. Copy the output to Vercel dashboard (Settings → Environment Variables)
4. Redeploy the project

## Troubleshooting

### Variables not loading
- Check that environment variable names match exactly (they're case-sensitive)
- Verify they're set for Production environment
- Redeploy after adding variables

### JSON parsing errors
- Make sure the JSON is valid
- Run `node scripts/generate-env-secrets.js` again to ensure correct format
- Check browser console for error messages

### Secrets folder still being used in production
- This is fine as a fallback, but environment variables take priority
- In production, Vercel doesn't serve the secrets/ folder anyway

## Questions?

- See `SECRETS_SETUP.md` for local secrets setup
- See `secrets/README.md` for detailed file documentation
- Check `src/utils/secretsLoader.ts` to understand how loading works
