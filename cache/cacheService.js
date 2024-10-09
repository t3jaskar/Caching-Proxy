const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

// Get cached response for a given key
exports.getCachedResponse = (key) => {
    return cache.get(key);
};

// Set cache for a given key
exports.setCache = (key, value) => {
    cache.set(key, value);
};

// Clear all cache
exports.clearCache = () => {
    cache.flushAll();
};
