const errors = {
    TooManyArguments: 'Argument error: only one of batch, oco, opo ' +
        'can exist but more than one are present.',
    MissingArgument: 'Argument error: missing argument.'
};

class OpoParams {
    constructor({
        primary,
        secondaryBatch = undefined,
        secondaryOco = undefined
    }) {
        /**
         * @param primary: (PlaceSingleOrderParams)
         * @param secondary: (Batch or Oco)
        */
        this.primary = primary;
        if (secondaryBatch && secondaryOco === undefined) {
            this.secondary = {batch: secondaryBatch};
        } else if (secondaryBatch === undefined && secondaryOco) {
            this.secondary = {oco: secondaryOco};
        } else if (secondaryBatch === undefined &&
            secondaryOco === undefined
        ) {
            throw new Error(errors.MissingArgument);
        } else {
            throw new Error(errors.TooManyArguments);
        }
    }
}

export default OpoParams;
