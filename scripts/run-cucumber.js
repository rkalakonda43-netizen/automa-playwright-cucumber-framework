const { spawn } = require('child_process');

const mode = process.argv[2] || 'headless';
const extraArgs = process.argv.slice(3);

const env = {
    ...process.env,
    HEADLESS: mode === 'headed' || mode === 'debug' ? 'false' : 'true',
    SLOW_MO: mode === 'debug' ? '1000' : mode === 'headed' ? '750' : '0',
    BROWSER_CLOSE_DELAY: mode === 'headed' ? '3000' : '0',
    DEVTOOLS: mode === 'debug' ? 'true' : 'false',
    PWDEBUG: mode === 'debug' ? '1' : process.env.PWDEBUG,
};

const cucumberArgs = [
    'cucumber-js',
    '--require',
    'src/steps/*.js',
    '--require',
    'src/support/*.js',
    'src/features/*.feature',
    ...extraArgs,
];

console.log(`Running Cucumber in ${mode} mode${extraArgs.length ? ` with args: ${extraArgs.join(' ')}` : ''}`);

const child = spawn('npx', cucumberArgs, {
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
});

child.on('exit', code => {
    process.exit(code);
});
