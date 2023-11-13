import prisma from "@/database/database";

async function postParticipants(name: string, balance: number){
    const newParticipant = await prisma.participantes.create({
        data: {
            name: name,
            balance: balance
        }
    });
    return newParticipant;
}

async function getParticipants(){
    const participants = await prisma.participantes.findMany();
    return participants;
}

export const participantsRepository = {
    postParticipants,
    getParticipants
}