import prisma from "@/database/database"

async function postGame(homeTeamName: string, awayTeamName: string) {
    const newGame = await prisma.game.create({
        data: {
            hometeamname: homeTeamName,
            awayteamname: awayTeamName,
            hometeamscore: 0,
            awayteamscore: 0,
            isfinished: false
        }
    })
    return newGame;
}

async function getGames(){
    const games = await prisma.game.findMany();
    return games;
}

export const gameRepository = {
    postGame,
    getGames
}