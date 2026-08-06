const fs = require('fs');

const { NCE_BOOK1_TITLES } = require('./src/data/lessonsData.ts') || {};

// We can't directly require TS without transpiling, let's just grep the file again.
