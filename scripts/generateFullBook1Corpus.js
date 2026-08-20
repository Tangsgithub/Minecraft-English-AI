const fs = require('fs');
const path = require('path');

// Let's create the comprehensive corpus generator for Book 1 (Lessons 1-144)
const outputFile = path.join(__dirname, '../src/data/nceBook1AuthenticCorpus.ts');

console.log('Generating authentic NCE Book 1 corpus for Lessons 1 - 144...');
