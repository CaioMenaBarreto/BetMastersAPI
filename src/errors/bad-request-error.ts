export function badRequestError(message) {
    return {
        name: 'badRequestError',
        message: message[0]
    };
}