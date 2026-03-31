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

### Step 1: Generate Environment Variable Format

Run this command to convert your secrets to environment variable format:

```bash
node scripts/generate-env-secrets.js
```

This outputs something like:
```
VITE_INVOICES_JSON='[{"id":"BA20260331",...}]'
VITE_COMPANY_INFO_JSON='{"name":"POD21 LLC",...}'
```

### Step 2: Add to Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add two new environment variables:
   - `VITE_INVOICES_JSON` - Paste the full value from Step 1
   - `VITE_COMPANY_INFO_JSON` - Paste the full value from Step 1

5. Make sure each variable is set for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Click "Save"

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
