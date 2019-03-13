import request from "request";

import { exchanges } from "~/tesClient/constants";

class TickerFactory {
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
    }

    static formatTickerFromCoinbasePrime = ({ body }) => {
        return parseFloat(body.price);
    }

    static formatTickerFromGemini = ({ body }) => {
        return parseFloat(body.last);
    }

    static formatTickerFromKraken = ({ body }) => {
        return parseFloat(body.result.XXBTZUSD.c[0])
    }
}

export default TickerFactory;