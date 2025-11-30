const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;

    if (!currentVersion) {
        console.error('Error: No version found in package.json');
        process.exit(1);
    }

    let [major, minor, patch] = currentVersion.split('.').map(Number);

    const type = process.argv[2];

    if (type === 'bug') {
        // Increase patch version
        patch += 1;
    } else if (type === 'feat') {
        // Increase minor version, reset patch
        minor += 1;
        patch = 0;
    } else if (type === 'ver') {
        // Increase major version, reset minor and patch
        major += 1;
        minor = 0;
        patch = 0;
    } else {
        console.error('Invalid argument. Usage: node update_version.js <bug|feat|ver>');
        console.log('  bug  -> 0.0.x + 1 (Patch)');
        console.log('  feat -> 0.x.0 + 1 (Minor)');
        console.log('  ver  -> x.0.0 + 1 (Major)');
        process.exit(1);
    }

    const newVersion = `${major}.${minor}.${patch}`;
    packageJson.version = newVersion;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    console.log(`Version updated: ${currentVersion} -> ${newVersion}`);

} catch (error) {
    console.error('Error updating version:', error.message);
    process.exit(1);
}
