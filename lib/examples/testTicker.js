"use strict";

var _TickerFactory = _interopRequireDefault(require("../../lib/tesClient/factories/TickerFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TickerFactory.default.getLastPrice({
  exchange: 'coinbasePrime',
  pair: 'BTC-USD',
  sandbox: true,
  onResponse: function onResponse(err, res, body) {
    return console.log(_TickerFactory.default.formatTickerFromCoinbasePrime({
      body: body
    }));
  }
});

_TickerFactory.default.getLastPrice({
  exchange: 'gemini',
  pair: 'btcusd',
  sandbox: true,
  onResponse: function onResponse(err, res, body) {
    return console.log(_TickerFactory.default.formatTickerFromGemini({
      body: body
    }));
  }
});

_TickerFactory.default.getLastPrice({
  exchange: 'kraken',
  pair: 'XXBTZUSD',
  onResponse: function onResponse(err, res, body) {
    return console.log(_TickerFactory.default.formatTickerFromKraken({
      body: body
    }));
  }
});

var key = 'key';
var secret = 'secret';
var tickerFactory = new _TickerFactory.default(key, secret);
tickerFactory.getFeesFromKraken({
  pair: 'XXBTZUSD',
  onResponse: function onResponse(_ref) {
    var maker_fee = _ref.maker_fee,
        taker_fee = _ref.taker_fee;
    return console.log(maker_fee, taker_fee);
  }
});