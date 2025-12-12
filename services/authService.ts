/**
 * Simulates a backend interaction with the Telegram API.
 * In a real app, this would call your backend which interacts with MTProto or Telegram Bot API.
 */

export const sendTelegramCode = async (phoneNumber: string, username: string): Promise<boolean> => {
  console.log(`Sending code to ${username} at ${phoneNumber}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Basic validation simulation
  if (phoneNumber.length < 5 || username.length < 3) {
    throw new Error("Invalid phone number or username.");
  }

  return true;
};

export const verifyTelegramCode = async (code: string): Promise<boolean> => {
  console.log(`Verifying code: ${code}`);
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Simulate a correct code check (e.g., any 5 digit code ending in 5 works for demo, or just allow all)
  if (code.length !== 5) {
    throw new Error("Invalid code format. Please enter the 5-digit code sent to your Telegram.");
  }

  // Simulate a random failure for realism (optional, but keeping it simple for happy path)
  return true;
};