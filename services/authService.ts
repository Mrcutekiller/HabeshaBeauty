/**
 * Simulates a backend interaction with the Telegram API.
 * In a real app, this would call your backend which interacts with MTProto or Telegram Bot API.
 */

// Strict credentials as requested
const VALID_USER = 'messi-love';
const VALID_PHONE = '+251975594607';

export const sendTelegramCode = async (phoneNumber: string, username: string): Promise<boolean> => {
  console.log(`Sending code to ${username} at ${phoneNumber}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Clean inputs for comparison
  const cleanPhone = phoneNumber.replace(/\s/g, '');
  const cleanUser = username.toLowerCase().replace('@', '');

  // Strict validation: Only allow the specific account given in the prompt
  if (cleanPhone !== VALID_PHONE || cleanUser !== VALID_USER) {
    throw new Error(`Restricted Access: You must log in with the authorized account (${VALID_USER}).`);
  }

  return true;
};

export const verifyTelegramCode = async (code: string): Promise<boolean> => {
  console.log(`Verifying code: ${code}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (code.length !== 5) {
    throw new Error("Invalid code format. Please enter the 5-digit code sent to your Telegram.");
  }

  return true;
};