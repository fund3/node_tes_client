/**
 * We should validate presence of some argumennts
 */
const errors = {
    InvalidArgument: (f) => `Argument error: ${f} is required but it is undefined/null`
};

/**
 * Validates array of arguments
 * @param  {...any} args - list of arguments
 */
const validateArguments = (...args) => {
    Array.from(args).forEach(argument => {
        if (!argument) {
            throw new Error(errors.ArgumentMissing(argument))
        }
    });
}

/**
 * Validates single argument
 * @param {*} argument 
 */
const validatePresenceOf = (argument) => {
    if (!argument) {
        throw new Error(errors.ArgumentMissing(argument));
    }
}

export { validateArguments, validatePresenceOf }