const fs = require('fs');
const path = './src/lib/puzzles.ts';
let content = fs.readFileSync(path, 'utf8');
// We want to turn \\' into \'
content = content.replace(/\\\\'/g, "\\'");
fs.writeFileSync(path, content);
console.log('Fixed quotes in puzzles.ts');
