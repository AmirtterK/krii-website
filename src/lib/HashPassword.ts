// utils/hashPassword.ts
// Use this script to generate password hashes for new moderators

import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Cost factor - higher is more secure but slower
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Example usage:
// Run this with: npx ts-node utils/hashPassword.ts
async function main() {
  const password = 'your_password_here'; // Change this!
  const hash = await hashPassword(password);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUse this hash in your SQL INSERT statement:');
  console.log(`INSERT INTO moderators (username, password_hash, role) VALUES ('username', '${hash}', 'moderator');`);
}

main();

export { hashPassword };