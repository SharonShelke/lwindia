const fs = require('fs');
const path = require('path');

const targetDirs = ['public', 'src', 'lwindia'];
const singleFiles = ['server.js'];

let modifiedCount = 0;
let fileCount = 0;

function processFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.html', '.js', '.css', '.json', '.jsx', '.ts', '.tsx', '.md'].includes(ext)) {
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('LoveWorld')) {
      const updated = content.replace(/LoveWorld/g, 'Loveworld');
      fs.writeFileSync(filePath, updated, 'utf8');
      const occurrences = (content.match(/LoveWorld/g) || []).length;
      modifiedCount += occurrences;
      fileCount++;
      console.log(`Replaced ${occurrences} occurrences in: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'node_modules' || item === '.git' || item === '.gemini') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

for (const f of singleFiles) {
  if (fs.existsSync(f)) processFile(f);
}

for (const d of targetDirs) {
  walkDir(d);
}

console.log(`Total replaced: ${modifiedCount} occurrences across ${fileCount} files.`);

