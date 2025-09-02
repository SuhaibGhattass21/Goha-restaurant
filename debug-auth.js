// Simple debug script to test auth functionality
const { execSync } = require('child_process');

console.log('🔍 Debugging auth module...');

try {
  // Try to compile TypeScript first
  console.log('📦 Compiling TypeScript...');
  execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ TypeScript compilation successful');
  
  // Try to run the server
  console.log('🚀 Starting server...');
  execSync('npm run dev', { stdio: 'inherit', cwd: __dirname, timeout: 10000 });
  
} catch (error) {
  console.error('❌ Error occurred:', error.message);
  if (error.stdout) {
    console.log('📄 STDOUT:', error.stdout.toString());
  }
  if (error.stderr) {
    console.log('📄 STDERR:', error.stderr.toString());
  }
}
