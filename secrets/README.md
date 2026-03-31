# Secrets Directory

This directory contains sensitive, private data that should **never be committed to version control**.

## Files

### invoices.json
Contains invoice data with sensitive information like Bitcoin addresses and customer details.
- Use `invoices.json.example` as a template
- Copy `invoices.json.example` to `invoices.json` and fill in your data

### company-info.json
Contains your company's billing information (address, tax ID, support contact).
- Use `company-info.json.example` as a template
- Copy `company-info.json.example` to `company-info.json` and fill in your data

### clients.json
Reserved for future client information management.
- Use `clients.json.example` as a template

## Setup Instructions

1. Copy each `.example` file to remove the `.example` extension:
   ```bash
   cp secrets/invoices.json.example secrets/invoices.json
   cp secrets/company-info.json.example secrets/company-info.json
   cp secrets/clients.json.example secrets/clients.json
   ```

2. Edit each file with your actual data

3. These files are in `.gitignore` so they won't be committed

## Important

- **Never commit files without the `.example` extension** to this directory
- **Always update the `.example` files** if you change the data structure
- The app fetches from `secrets/` during development
- For production, ensure these files exist in your deployment environment
