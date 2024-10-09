const httpProxy = require('http-proxy');
const cacheService = require('../cache/cacheService');

const proxy = httpProxy.createProxyServer();

exports.handleProxyRequest = (req, res) => {
    const cacheKey = req.url;

    // Check if the response is already cached
    const cachedResponse = cacheService.getCachedResponse(cacheKey);

    if (cachedResponse) {
        // If cached, return cached response with "HIT" header
        res.set('X-Cache', 'HIT');
        return res.status(200).send(cachedResponse);
    }

    // If not cached, proxy the request
    proxy.web(req, res, { target: process.env.ORIGIN_URL }, (err) => {
        res.status(500).send('Proxy server error');
    });

    proxy.on('proxyRes', (proxyRes) => {
        let body = '';
        proxyRes.on('data', (chunk) => {
            body += chunk;
        });

        proxyRes.on('end', () => {
            // Cache the response and return it with "MISS" header
            cacheService.setCache(cacheKey, body);
            res.set('X-Cache', 'MISS');
            res.status(200).send(body);
        });
    });
};
