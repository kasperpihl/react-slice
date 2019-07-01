const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

// ...
const rootCwd = { cwd: path.resolve(__dirname, '../') };
const demoCwd = { cwd: path.resolve(__dirname, '../demo') };
const demoPackageJson = fs.readFileSync(
  path.resolve(__dirname, '../demo/package.json')
);

console.log('--- STARTING DEMO BUILD ---');
console.log('--- PACKING react-slice ---');

const fileName = execSync(
  'OUTPUT="$(command npm pack | tail -1)"; echo "${OUTPUT}";',
  rootCwd
)
  .toString()
  .trim();
console.log('--- INSTALL DEMO DEPENDENCIES ---');
execSync('npm i', demoCwd);
console.log('--- INSTALL PACKAGE ---');
execSync(`npm i ${rootCwd.cwd}/${fileName}`, demoCwd);
console.log('--- REVERTING package.json ---');
fs.writeFileSync(
  path.resolve(__dirname, '../demo/package.json'),
  demoPackageJson
);
console.log('--- DELETING package-lock.json ---');
fs.unlinkSync(path.resolve(__dirname, '../demo/package-lock.json'));
console.log('--- DELETING tarball ---');
fs.unlinkSync(path.resolve(__dirname, '../', fileName));
console.log('--- STARTING SERVER ---');

// Notice how your arguments are in an array of strings
const child = spawn('npm', ['run', 'start'], demoCwd);

child.stdout.on('data', function(data) {
  process.stdout.write(data);
});

child.stderr.on('data', function(data) {
  process.stdout.write(data);
});

child.on('exit', function(data) {
  process.stdout.write("I'm done!");
});
