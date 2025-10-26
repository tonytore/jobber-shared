const { createLogger, createConsoleLogger } = require('./build/cjs/logger');

console.log('Testing Logger...\n');

// Test 1: Console-only logger
console.log('=== Testing Console Logger ===');
const consoleLogger = createConsoleLogger('test-service');
consoleLogger.info('This is an info message');
consoleLogger.warn('This is a warning message');
consoleLogger.error('This is an error message', { userId: 123, action: 'login' });

// Test 2: Loki logger (if Loki is running)
console.log('\n=== Testing Loki Logger ===');
const lokiLogger = createLogger('test-service', 'http://localhost:3100');
lokiLogger.info('This message goes to Loki');
lokiLogger.warn('Warning message to Loki');
lokiLogger.error('Error message to Loki', { error: 'Test error', code: 500 });

console.log('\n✅ Logger test completed!');
console.log('Check your console output above and Loki at http://localhost:3100');
