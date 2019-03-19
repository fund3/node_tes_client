import TickerFactory from "~/tesClient/factories/TickerFactory"

// KRAKEN

TickerFactory.get24HrPriceFromKraken({
    pair: 'XXBTZUSD',
    onResponse: (err, res, body) =>
        console.log( TickerFactory.format24HrPriceFromKraken({ body }) )
});
