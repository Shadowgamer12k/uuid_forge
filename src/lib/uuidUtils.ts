
/**
 * Generates a random Version 4 UUID
 * @returns A random UUID string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generates multiple Version 4 UUIDs
 * @param count Number of UUIDs to generate
 * @returns Array of UUID strings
 */
export function generateMultipleUUIDs(count: number): string[] {
  const uuids: string[] = [];
  
  // Cap the maximum to prevent browser freezing
  const safeCount = Math.min(Math.max(1, count), 10000);
  
  for (let i = 0; i < safeCount; i++) {
    uuids.push(generateUUID());
  }
  
  return uuids;
}

/**
 * Copies text to clipboard
 * @param text The text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to copy:', error);
    return Promise.reject(error);
  }
}
