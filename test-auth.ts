import 'reflect-metadata';
import { LoginDto } from './src/application/dtos/auth.dto';

console.log('🧪 Testing auth DTOs and classes...');

try {
  console.log('1️⃣ Testing LoginDto instantiation...');
  const loginDto = new LoginDto();
  loginDto.username = 'test';
  loginDto.password = 'test123';
  console.log('✅ LoginDto created successfully:', loginDto);

  console.log('2️⃣ Testing constructor property...');
  console.log('LoginDto constructor:', LoginDto.constructor);
  console.log('loginDto constructor:', loginDto.constructor);
  console.log('loginDto constructor name:', loginDto.constructor.name);

  console.log('✅ All tests passed');
  
} catch (error) {
  console.error('❌ Error in test:', error);
  console.error('Stack:', error.stack);
}
