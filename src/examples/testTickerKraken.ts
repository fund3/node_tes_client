require("dotenv").config();
import TickerFactory from "~/tesClient/factories/TickerFactory"

// KRAKEN
setTimeout(() => TickerFactory.getLastPrice({
    exchange:'kraken',
    pair: 'XXBTZUSD',
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromKraken({ body, pair: 'XXBTZUSD' }))
}), 1000);

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'kraken',
    pair: 'XETHZUSD',
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromKraken({ body, pair: 'XETHZUSD' }))
}), 2000);

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'kraken',
    pair: 'XXMRZUSD',
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromKraken({ body, pair: 'XXMRZUSD' }))
}), 3000);

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'kraken',
    pair: 'XLTCZUSD',
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromKraken({ body, pair: 'XLTCZUSD' }))
}), 4000);

const key = process.env.KRAKEN_API_KEY;
const secret = process.env.KRAKEN_SECRET_KEY;
let tickerFactory = new TickerFactory(key, secret);

tickerFactory.getFeesFromKraken({
    pair: 'XXBTZUSD',
    onResponse: ({ maker_fee, taker_fee }) =>
        console.log(maker_fee, taker_fee)
});

tickerFactory.getFeesFromKraken({
    pair: 'XETHZUSD',
    onResponse: ({ maker_fee, taker_fee }) =>
        console.log(maker_fee, taker_fee)
});
