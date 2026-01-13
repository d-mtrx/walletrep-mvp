/**
 * Normalize and validate an EVM wallet address.
 * Returns a lowercased address or null if invalid.
 */
export function normalizeAddress(address: string): string | null {
  if (!address) return null;

  const trimmed = address.trim();

  // Basic EVM address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
    return null;
  }

  return trimmed.toLowerCase();
}
