// fix-password.js
// Run this with: node fix-password.js

const bcrypt = require('bcryptjs');

async function fixPassword() {
  console.log('🔧 Generating correct password hash...\n');
  
  const password = 'moderator77';
  const hash = await bcrypt.hash(password, 10);
  
  console.log('✅ Generated hash for password:', password);
  console.log('📋 Hash:', hash);
  console.log('\n🔧 Run this SQL in Supabase SQL Editor:\n');
  console.log('--- Copy and paste below this line ---\n');
  console.log(`UPDATE moderators SET password_hash = '${hash}' WHERE username = 'moderator';`);
  console.log('\n--- End of SQL ---\n');
  
  console.log('Then try logging in with:');
  console.log('  Username: admin');
  console.log('  Password:', password);
  
  // Test the hash immediately
  console.log('\n🧪 Testing the generated hash...');
  const isValid = await bcrypt.compare(password, hash);
  console.log('✅ Hash validation test:', isValid ? 'PASSED ✓' : 'FAILED ✗');
}

fixPassword();