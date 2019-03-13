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
