import TickerFactory from "~/tesClient/factories/TickerFactory"

// GEMINI

TickerFactory.get24HrPriceFromGemini({
    pair: 'btcusd',
    sandbox: true,
    onResponse: (err, res, body) =>
        console.log(TickerFactory.format24HrPriceFromGemini({ body }))
});
