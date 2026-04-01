import CryptoJS from 'crypto-js';

export interface EncryptedInvoiceData {
  customerName: string;
  address: string;
  services: Array<{
    description: string;
    quantity: number;
    unitValue: number;
  }>;
  btcAddress: string;
}

/**
 * Encrypt sensitive invoice data
 */
export function encryptInvoiceData(data: EncryptedInvoiceData, seed: string): string {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, seed).toString();
  return encrypted;
}

/**
 * Decrypt sensitive invoice data
 * Returns null if decryption fails (wrong seed)
 */
export function decryptInvoiceData(encrypted: string, seed: string): EncryptedInvoiceData | null {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, seed).toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      return null;
    }
    return JSON.parse(decrypted);
  } catch (error) {
    return null;
  }
}
