"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("request"));

var _constants = require("../../../lib/tesClient/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KrakenClient = require('kraken-api');

var TickerFactory = function TickerFactory(key, secret) {
  var _this = this;

  _classCallCheck(this, TickerFactory);

  _defineProperty(this, "getFeesFromKraken", function (_ref) {
    var pair = _ref.pair,
        onResponse = _ref.onResponse;

    _this.krakenApi.api('TradeVolume', {
      "pair": pair
    }, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        var taker_fee = parseFloat(data.result.fees[pair].fee);
        var maker_fee = parseFloat(data.result.fees_maker[pair].fee);
        onResponse({
          'maker_fee': maker_fee,
          'taker_fee': taker_fee
        });
      }
    });
  });

  this.krakenApi = new KrakenClient(key, secret, {});
};

_defineProperty(TickerFactory, "getLastPrice", function (_ref2) {
  var exchange = _ref2.exchange,
      pair = _ref2.pair,
      _ref2$sandbox = _ref2.sandbox,
      sandbox = _ref2$sandbox === void 0 ? false : _ref2$sandbox,
      onResponse = _ref2.onResponse;

  switch (exchange) {
    case _constants.exchanges.COINBASE_PRIME:
      return TickerFactory.getTickerFromCoinbasePrime({
        pair: pair,
        sandbox: sandbox,
        onResponse: onResponse
      });

    case _constants.exchanges.GEMINI:
      return TickerFactory.getTickerFromGemini({
        pair: pair,
        sandbox: sandbox,
        onResponse: onResponse
      });

    case _constants.exchanges.KRAKEN:
      return TickerFactory.getTickerFromKraken({
        pair: pair,
        onResponse: onResponse
      });
  }
});

_defineProperty(TickerFactory, "getTickerFromCoinbasePrime", function (_ref3) {
  var pair = _ref3.pair,
      sandbox = _ref3.sandbox,
      onResponse = _ref3.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api-public.sandbox.prime.coinbase.com/products/';
  } else {
    url = 'https://api.prime.coinbase.com/products/';
  }

  var options = {
    url: url + pair + '/ticker',
    // Format: 'BTC-USD'
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  (0, _request.default)(options, onResponse);
});

_defineProperty(TickerFactory, "getTickerFromGemini", function (_ref4) {
  var pair = _ref4.pair,
      sandbox = _ref4.sandbox,
      onResponse = _ref4.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api.sandbox.gemini.com/v1/pubticker/';
  } else {
    url = 'https://api.gemini.com/v1/pubticker/';
  }

  var options = {
    url: url + pair,
    // Format: 'btcusd'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  (0, _request.default)(options, onResponse);
});

_defineProperty(TickerFactory, "getTickerFromKraken", function (_ref5) {
  var pair = _ref5.pair,
      onResponse = _ref5.onResponse;
  var url = 'https://api.kraken.com/0/public/Ticker?pair=';
  var options = {
    url: url + pair,
    // Format: 'XXBTZUSD'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  (0, _request.default)(options, onResponse);
});

_defineProperty(TickerFactory, "formatTickerFromCoinbasePrime", function (_ref6) {
  var body = _ref6.body;
  return parseFloat(body.price);
});

_defineProperty(TickerFactory, "formatTickerFromGemini", function (_ref7) {
  var body = _ref7.body;
  return parseFloat(body.last);
});

_defineProperty(TickerFactory, "formatTickerFromKraken", function (_ref8) {
  var body = _ref8.body;
  return parseFloat(body.result.XXBTZUSD.c[0]);
});

var _default = TickerFactory;
exports.default = _default;