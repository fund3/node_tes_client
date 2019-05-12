import TickerFactory from "~/tesClient/factories/TickerFactory"

// COINBASE PRIME

TickerFactory.getLastPrice({
    exchange:'coinbasePrime',
    pair: 'BTC-USD',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromCoinbasePrime({ body }))
});
