const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ipfs',
    createProxyMiddleware({
      target: 'https://gateway.pinata.cloud',
      changeOrigin: true,
      onProxyRes: function(proxyRes, req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    })
  );
};
