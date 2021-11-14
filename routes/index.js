const express = require('express');
const router = express.Router();
const geoIP = require('geoip-lite');

/* GET home page. */
router.get('/json', function (request, response, next) {
  let ip = request.headers['x-forwarded-for'] || request.connection?.remoteAddress || request.socket.remoteAddress || request.connection?.socket?.remoteAddress;
  let jsonData = geoIP.lookup(ip);
  if (jsonData === null) return response.send({});
  return response.send(jsonData);
});

router.get('*', function (request, response, next) {
  response.render('error', {
    error: {
      status: 404,
      stack: ''
    },
    message: "NOT FOUND"
  });
})

module.exports = router;
