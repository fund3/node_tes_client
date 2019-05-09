const errors = {
    TooManyArguments: 'Argument error: only one of batch, oco, opo ' +
        'can exist but more than one are present.',
    MissingArgument: 'Argument error: missing argument.'
};

class PlaceContingentOrderParams {
    constructor({
        batch = undefined,
        oco = undefined,
        opo = undefined
    }) {
        /**
         * @param type: (String) clientSecret token assigned by Fund3.
         * @param credentials: (Array[AccountCredentials]) Array of
         *     AccountCredentials for exchange accounts.
        */
        if (batch && oco === undefined && opo === undefined) {
            this.type = {batch: batch};
        } else if (batch === undefined && oco && opo === undefined) {
            this.type = {oco: oco};
        } else if (batch === undefined && oco === undefined && opo) {
            this.type = {opo: opo};
        } else {
            throw new Error(errors.TooManyArguments);
        }
    }
}

export default PlaceContingentOrderParams;
