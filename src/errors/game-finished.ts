export function gameFinished() {
    return {
        name: 'GameFinished',
        message: 'This game has already ended. You cannot place bets on it'
    };
}