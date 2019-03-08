import request from "request";

import { exchanges } from "~/tes_client/constants";

class TickerFactory {
    static getTicker = ({ exchange, pair, sandbox, onResponse }) => {
        switch(exchange) {
            case exchanges.COINBASE_PRIME:
                return TickerFactory.getTickerFromCoinbasePrime({ pair, sandbox, onResponse });
            case exchanges.GEMINI:
                return TickerFactory.getTickerFromGemini({ pair, sandbox, onResponse });
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
            url: url + pair + '/ticker',
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
            url: url + pair,
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request(options, onResponse);
    }

    static formatTickerFromCoinbasePrime = ({  }) => {

    }

    static formatTickerFromGemini = ({  }) => {

    }

    static getLastPrice = ({ exchange, pair, sandbox }) => {
        const ticker =  TickerFactory.getTicker({ exchange, pair, sandbox, onResponse })

    }
}

export default TickerFactory;