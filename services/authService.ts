
/**
 * Simulates a backend interaction for direct login.
 * This checks against pre-provisioned accounts as requested.
 */

// Strict credentials as requested
const VALID_USER = 'messi-love1';
const VALID_PHONE = '+251975594607';

export const loginUser = async (phoneNumber: string, username: string): Promise<boolean> => {
  console.log(`Attempting login for ${username}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Clean inputs for comparison
  const cleanPhone = phoneNumber.replace(/\s/g, '');
  const cleanUser = username.toLowerCase().replace('@', '');

  // Strict validation: Only allow the specific account given in the prompt
  if (cleanPhone !== VALID_PHONE || cleanUser !== VALID_USER) {
    throw new Error(`Invalid credentials. Please use the account provided to you.`);
  }

  return true;
};
