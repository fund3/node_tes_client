import TickerFactory from "~/tesClient/factories/TickerFactory"

// GEMINI

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'gemini',
    pair: 'ethusd',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromGemini({ body }))
}), 1000);

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'gemini',
    pair: 'ltcusd',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromGemini({ body }))
}), 2000);

setTimeout(() => TickerFactory.getLastPrice({
    exchange:'gemini',
    pair: 'btcusd',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.formatTickerFromGemini({ body }))
}), 3000);
