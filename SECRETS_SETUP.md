# Secrets Setup Guide

This project uses a `secrets/` directory to keep sensitive data private and organized.

## Files Structure

```
secrets/
├── invoices.json (private - never commit)
├── invoices.json.example (template)
├── company-info.json (private - never commit)
├── company-info.json.example (template)
└── README.md (this directory's documentation)
```

## Initial Setup

1. **Copy example files to create actual files:**
   ```bash
   cd secrets/
   cp invoices.json.example invoices.json
   cp company-info.json.example company-info.json
   ```

2. **Edit each file with your actual data:**
   - `invoices.json` - Add your invoice details and Bitcoin addresses
   - `company-info.json` - Add your company details

3. **Never commit the non-example files:**
   - These are in `.gitignore` for a reason
   - They contain sensitive information

## For Deployment

When deploying to production (e.g., Vercel):

1. **Company Info** (set once):
   - Go to Vercel dashboard → Environment Variables
   - Add `VITE_COMPANY_INFO_JSON` with minified JSON from `secrets/company-info.json`
   - Done! No need to update this unless company details change

2. **Invoices** (update as needed):
   - Edit `secrets/invoices.json` locally
   - Run `node scripts/generate-env-secrets.js`
   - Copy output to Vercel's `VITE_INVOICES_JSON` variable
   - Redeploy

See `VERCEL_SETUP.md` for detailed instructions.

## Development vs Production

- **Development**: Files are served from `secrets/` folder locally OR from `.env.local`
- **Production**: Environment variables from Vercel dashboard are used

## Security Notes

- Never expose Bitcoin addresses in public repositories
- Keep company information private
- These files should only exist in private environments
- Always use the `.gitignore` rules provided

## Questions?

See `/secrets/README.md` for detailed file descriptions.
