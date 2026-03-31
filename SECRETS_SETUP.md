# Secrets Setup Guide

This project uses a `secrets/` directory to store sensitive data locally and environment variables for production.

## Local Development Setup

1. Copy the example files:
   ```bash
   cp secrets/invoices.json.example secrets/invoices.json
   cp secrets/company-info.json.example secrets/company-info.json
   ```

2. Edit them with your actual data

3. **Never commit these files** — they're in `.gitignore` and contain sensitive information

## For Production

See `VERCEL_SETUP.md` for detailed instructions on deploying to Vercel.

## How It Works

- **Local**: App loads from `secrets/` folder (or `.env.local`)
- **Production**: App loads from Vercel environment variables

See `/secrets/README.md` for detailed file descriptions.
