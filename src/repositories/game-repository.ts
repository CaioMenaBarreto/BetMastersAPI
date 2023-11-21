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
    const game = await prisma.games.findFirst({
        where:{
            id: gameId
        }
    });
    return game;
} 

async function updateGameById(gameId: number, homeTeamScore: number, awayTeamScore: number){
    const game = prisma.games.update({
        where:{
            id: gameId
        },
        data:{
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
            isFinished: true,
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