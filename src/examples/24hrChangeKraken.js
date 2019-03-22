import TickerFactory from "~/tesClient/factories/TickerFactory"

// KRAKEN
const pair = 'XXBTZUSD';
TickerFactory.get24HrPriceFromKraken({
    pair,
    onResponse: (err, res, body) =>
        console.log( TickerFactory.format24HrPriceFromKraken({ pair, body }) )
});
