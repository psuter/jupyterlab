var childProcess = require('child_process');
var fs = require('fs-extra');
var path = require('path');

// Get the current version of JupyterLab
var cwd = path.resolve('..');
var version = childProcess.execSync('python setup.py --version', { cwd: cwd });
version = version.toString().trim();

// Update our package.json files.
var data = require('./package.json');
data['jupyterlab']['version'] = version;

var text = JSON.stringify(data, null, 2) + '\n';
fs.writeFileSync('./package.json', text);
fs.writeFileSync('./package.template.json', text);

// Run a standard build.
childProcess.execSync('npm run build');

// Add  the release metadata.
var release_data = { version: version };
text = JSON.stringify(release_data, null, 2) + '\n';
fs.writeFileSync('./build/release_data.json', text);
