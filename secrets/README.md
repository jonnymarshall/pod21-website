# Secrets Directory

This directory contains sensitive, private data that should **never be committed to version control**.

## Files

### invoices.json
Contains invoice data with Bitcoin addresses and customer details.
- Use `invoices.json.example` as a template
- Mark invoices as `"paid": true` to exclude them from production (only unpaid invoices are deployed)

### company-info.json
Contains your company's billing information (address, tax ID, support contact).
- Use `company-info.json.example` as a template
- Copy `company-info.json.example` to `company-info.json` and fill in your data

## Setup Instructions

1. Copy each `.example` file to remove the `.example` extension:
   ```bash
   cp secrets/invoices.json.example secrets/invoices.json
   cp secrets/company-info.json.example secrets/company-info.json
   ```

2. Edit each file with your actual data

3. These files are in `.gitignore` so they won't be committed

## Important

- **Never commit files without the `.example` extension** to this directory
- **Always update the `.example` files** if you change the data structure
- The app automatically uses `secrets/` during development, or environment variables in production
