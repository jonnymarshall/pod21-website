# Secrets Setup Guide

This project uses a `secrets/` directory to keep sensitive data private and organized.

## Files Structure

```
secrets/
├── invoices.json (private - never commit)
├── invoices.json.example (template)
├── company-info.json (private - never commit)
├── company-info.json.example (template)
├── clients.json (private - never commit)
├── clients.json.example (template)
└── README.md (this directory's documentation)
```

## Initial Setup

1. **Copy example files to create actual files:**
   ```bash
   cd secrets/
   cp invoices.json.example invoices.json
   cp company-info.json.example company-info.json
   cp clients.json.example clients.json
   ```

2. **Edit each file with your actual data:**
   - `invoices.json` - Add your invoice details and Bitcoin addresses
   - `company-info.json` - Add your company details
   - `clients.json` - Add client information (optional, for future use)

3. **Never commit the non-example files:**
   - These are in `.gitignore` for a reason
   - They contain sensitive information

## For Deployment

When deploying to production (e.g., Vercel), you need to ensure the `secrets/` folder exists with the proper files:

**Option 1: Environment Variables (Recommended)**
- Convert secrets to environment variables
- Deploy via Vercel's environment settings
- Update components to read from process.env

**Option 2: Secrets Management Service**
- Use a service like AWS Secrets Manager
- Fetch secrets at build time or runtime

**Option 3: Manual Deployment**
- Create the `secrets/` folder and files directly on the server
- Not recommended for public platforms like Vercel

## Development vs Production

- **Development**: Files are served from `secrets/` folder locally
- **Production**: You'll need to set up one of the options above to serve the sensitive data

## Security Notes

- Never expose Bitcoin addresses in public repositories
- Keep company information private
- These files should only exist in private environments
- Always use the `.gitignore` rules provided

## Questions?

See `/secrets/README.md` for detailed file descriptions.
