import request from "request";

import { exchanges } from "~/tesClient/constants";
const KrakenClient = require('kraken-api');

class TickerFactory {

    constructor(key, secret){
        this.krakenApi = new KrakenClient(key, secret, {});
    }

    static getLastPrice = ({ exchange, pair, sandbox = false, onResponse }) => {
        switch(exchange) {
            case exchanges.COINBASE_PRIME:
                return TickerFactory.getTickerFromCoinbasePrime({
                    pair, sandbox, onResponse });
            case exchanges.GEMINI:
                return TickerFactory.getTickerFromGemini({
                    pair, sandbox, onResponse });
            case exchanges.KRAKEN:
                return TickerFactory.getTickerFromKraken({
                    pair, onResponse });
        }
    }

    static getTickerFromCoinbasePrime = ({ pair, sandbox, onResponse }) => {
        let url;
        if (sandbox) {
            url = 'https://api-public.sandbox.prime.coinbase.com/products/';
        } else {
            url = 'https://api.prime.coinbase.com/products/';
        }
        const options = {
            url: url + pair + '/ticker', // Format: 'BTC-USD'
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    }

    static getTickerFromGemini = ({ pair, sandbox, onResponse }) => {
        let url;
        if (sandbox) {
            url = 'https://api.sandbox.gemini.com/v1/pubticker/';
        } else {
            url = 'https://api.gemini.com/v1/pubticker/';
        }
        const options = {
            url: url + pair,  // Format: 'btcusd'
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    }

    static getTickerFromKraken = ({pair, onResponse}) => {
        const url = 'https://api.kraken.com/0/public/Ticker?pair=';
        const options = {
            url: url + pair,  // Format: 'XXBTZUSD'
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    };

    static formatTickerFromCoinbasePrime = ({ body }) => {
        if (body === undefined || body === null){
            return 0.0
        }
        return parseFloat(body.price);
    };

    static formatTickerFromGemini = ({ body }) => {
        if (body === undefined || body === null){
            return 0.0
        }
        return parseFloat(body.last);
    };

    static formatTickerFromKraken = ({ body, pair }) => {
        if (body === undefined || body === null){
            return 0.0
        }
        if (body.result === undefined || body.result === null){
            return 0.0
        }
        if (body.result[pair] === undefined || body.result[pair] === null){
            return 0.0
        }
        if (!Array.isArray(body.result[pair].c) ||
            !body.result[pair].c.length
        ){
            return 0.0
        }
        return parseFloat(body.result[pair].c[0])
    };

    getFeesFromKraken = ({ pair, onResponse }) => {
        this.krakenApi.api(
            'TradeVolume',
            {"pair": pair},
            function(error, data) {
                if (error) {
                    console.log(error);
                }
                else {
                    const taker_fee = parseFloat(data.result.fees[pair].fee);
                    const maker_fee = parseFloat(
                        data.result.fees_maker[pair].fee);
                    onResponse(
                        {'maker_fee': maker_fee, 'taker_fee': taker_fee});
                }
            }
        );

    };

    static get24HrPriceFromCoinbasePrime = ({ sandbox, pair, onResponse }) => {
        let url;
        if (sandbox) {
            url = 'https://api-public.sandbox.prime.coinbase.com/products/';
        } else {
            url = 'https://api.prime.coinbase.com/products/';
        }
        const options = {
            url: url + pair + '/stats', // Format: 'BTC-USD'
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    };

    static format24HrPriceFromCoinbasePrime = ({ body }) => {
        if (body === undefined || body === null){
            return 0.0
        }
        return parseFloat(body.open);
    }

    static get24HrPriceFromGemini = ({ sandbox, pair, onResponse }) => {
        let url;
        if (sandbox) {
            url = 'https://api.sandbox.gemini.com/v1/trades/';
        } else {
            url = 'https://api.gemini.com/v1/trades/';
        }
        const currentTimestamp = Math.floor(Date.now());
        url = url + pair + '?limit_trades=1&since=' +
            String(currentTimestamp - 86400000) + '&pair=';
        const options = {
            url: url + pair,  // Format: 'btcusd'
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    };

    static format24HrPriceFromGemini = ({ body }) => {
        if (!Array.isArray(body) || !body.length){
            return 0.0
        }
        if (body[0] === undefined || body[0] === null){
            return 0.0
        }
        return parseFloat(body[0]['price']);
    };

    static get24HrPriceFromKraken = ({ pair, onResponse }) => {
        const currentTimestamp = Math.floor(Date.now()/1000);
        const url = 'https://api.kraken.com/0/public/OHLC?interval=5&since=' +
            String(currentTimestamp - 86400) + '&pair=';
        const options = {
            url: url + pair,  // Format: 'XXBTZUSD'
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    };

    static format24HrPriceFromKraken = ({ pair, body }) => {
        if (body === undefined || body === null){
            return 0.0
        }
        if (body.result === undefined || body.result === null){
            return 0.0
        }
        if (body.result[pair] === undefined || body.result[pair] === null){
            return 0.0
        }
        if (!Array.isArray(body.result[pair]) ||
            !body.result[pair].length
        ){
            return 0.0
        }
        if (!Array.isArray(body.result[pair][0]) ||
            !body.result[pair][0].length
        ){
            return 0.0
        }
        return parseFloat(body.result[pair][0][1]);
    }
}

export default TickerFactory;
