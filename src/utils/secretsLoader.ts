/**
 * Secrets Loader Utility
 *
 * Loads sensitive data from environment variables (production)
 * or from secrets/ folder (development)
 */

interface FetchSecretsOptions {
  development?: boolean;
}

/**
 * Load JSON data from environment variables or secrets folder
 * @param envVarName - Environment variable name (e.g., 'VITE_INVOICES_JSON')
 * @param fallbackPath - Fallback path for development (e.g., '/secrets/invoices.json')
 * @returns Parsed JSON data
 */
export async function loadSecret<T>(
  envVarName: string,
  fallbackPath: string
): Promise<T | null> {
  try {
    // Try environment variable first (production)
    const envValue = import.meta.env[envVarName];
    if (envValue) {
      try {
        return JSON.parse(envValue);
      } catch (error) {
        console.error(`Failed to parse environment variable ${envVarName}:`, error);
        return null;
      }
    }

    // Fall back to file (development)
    const response = await fetch(fallbackPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${fallbackPath}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to load secret from ${envVarName} or ${fallbackPath}:`, error);
    return null;
  }
}

/**
 * Load invoices from environment or secrets folder
 */
export async function loadInvoices() {
  return loadSecret(
    'VITE_INVOICES_JSON',
    '/secrets/invoices.json'
  );
}

/**
 * Load company info from environment or secrets folder
 */
export async function loadCompanyInfo() {
  return loadSecret(
    'VITE_COMPANY_INFO_JSON',
    '/secrets/company-info.json'
  );
}

/**
 * Load clients from environment or secrets folder
 */
export async function loadClients() {
  return loadSecret(
    'VITE_CLIENTS_JSON',
    '/secrets/clients.json'
  );
}
