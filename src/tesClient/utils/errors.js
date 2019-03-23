/**
 * We should validate presence of some argumennts
 */
const errors = {
    InvalidArgument: (f) => `Argument error: ${f} is required but it is undefined/null`
};

/**
 * Validates array of arguments
 * @param  {...any} args - list of arguments
 * Array.prototype.some - executes fn unless fn returns true
 */
const validateArguments = (...args) => {
    const hasInvalidArgument = args.some((argument) => !argument);
    if (hasInvalidArgument) {
        throw new Error(errors.InvalidArgument(argument))
    }
}

/**
 * Validates single argument
 * @param {*} argument 
 */
const validatePresenceOf = (argument) => {
    if (!argument) {
        throw new Error(errors.InvalidArgument(argument));
    }
}

export { validateArguments, validatePresenceOf };