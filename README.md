# Caching Proxy Server CLI

This is a CLI tool that starts a caching proxy server. The server forwards requests to an origin server and caches the responses. If the same request is made again, the server returns the cached response instead of forwarding the request to the origin server.

## Features

- Forward requests to the origin server.
- Cache responses and return them for repeated requests.
- Add headers to indicate whether the response is from the cache or the origin server.
- Clear the cache with a simple command.

## How It Works

- When a request is made to the proxy server, it forwards the request to the specified origin server.
- The response from the origin server is cached.
- If the same request is made again, the cached response is returned with the header `X-Cache: HIT`.
- If the response is fetched from the origin server, the header `X-Cache: MISS` is returned.
  
## Project Structure

```bash
caching-proxy-server/
│
├── controllers/
│   └── proxyController.js       # Handles request forwarding and caching logic
│
├── routes/
│   └── proxyRoutes.js           # Defines routes for proxying requests
│
├── cache/
│   └── cacheService.js          # Manages caching logic
│
├── app.js                       # Main application file, handles CLI commands
├── package.json                 # Project configuration and dependencies
└── .env                         # Environment configuration file
```

