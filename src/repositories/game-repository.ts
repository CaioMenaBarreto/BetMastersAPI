import prisma from "@/database/database"

async function postGame(homeTeamName: string, awayTeamName: string) {
    const newGame = await prisma.games.create({
        data: {
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName
        }
    })
    return newGame;
} 

async function getGames(){
    const games = await prisma.games.findMany();
    return games;
}

async function getGameById(gameId: number){
    const games = await prisma.games.findFirst({
        where:{
            id: gameId
        }
    });
    return games;
} 

async function updateGameById(gameId: number, homeTeamScore: number, awayTeamScore: number){
    const game = prisma.games.update({
        data:{
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
            isFinished: true,
        },
        where:{
            id: gameId
        }
    })
    return game;
}

export const gameRepository = {
    postGame,
    getGames,
    getGameById,
    updateGameById
}