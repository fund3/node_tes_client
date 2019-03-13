import TickerFactory from "~/tesClient/factories/TickerFactory"

TickerFactory.getLastPrice({
    exchange:'coinbasePrime',
    pair: 'BTC-USD',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromCoinbasePrime({ body }))
});

TickerFactory.getLastPrice({
    exchange:'gemini',
    pair: 'btcusd',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromGemini({ body }))
});

TickerFactory.getLastPrice({
    exchange:'kraken',
    pair: 'XXBTZUSD',
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromKraken({ body }))
});

const key = 'key';
const secret = 'secret';
let tickerFactory = new TickerFactory(key, secret);

tickerFactory.getFeesFromKraken({
    pair: 'XXBTZUSD',
    onResponse: ({ maker_fee, taker_fee }) =>
        console.log(maker_fee, taker_fee)
});
