const path = require('path');
const { execSync, spawn } = require('child_process');

// ...
const rootCwd = { cwd: path.resolve(__dirname, '../') };
const demoCwd = { cwd: path.resolve(__dirname, '../demo') };

console.log('--- STARTING DEMO BUILD ---');
console.log('--- PACKING react-slice ---');
console.log(execSync('ls').toString());
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
