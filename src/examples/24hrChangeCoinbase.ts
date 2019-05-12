import TickerFactory from "~/tesClient/factories/TickerFactory"

// COINBASE PRIME

TickerFactory.get24HrPriceFromCoinbasePrime({
    pair: 'BTC-USD',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.format24HrPriceFromCoinbasePrime({ body }))
});
