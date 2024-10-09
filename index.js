require('dotenv').config();
const express = require('express');
const commander = require('commander');
const proxyRoutes = require('./routes/proxyRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Use routes
app.use('/proxy', proxyRoutes);

// CLI Command
const program = new commander.Command();
program
    .requiredOption('--port <number>', 'Port to run the server on')
    .requiredOption('--origin <url>', 'The URL of the origin server to forward requests to')
    .action((options) => {
        const { port, origin } = options;
        process.env.ORIGIN_URL = origin; // Save origin URL in the environment
        app.listen(port, () => {
            console.log(`Proxy server running on port ${port}, forwarding to ${origin}`);
        });
    });

program
    .command('clear-cache')
    .description('Clear the cache')
    .action(() => {
        require('./cache/cacheService').clearCache();
        console.log('Cache cleared successfully.');
    });

program.parse(process.argv);
