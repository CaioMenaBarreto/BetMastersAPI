import prisma from "@/database/database";

async function postParticipants(name: string, balance: number) {
    const newParticipant = await prisma.participants.create({
        data: {
            name: name,
            balance: balance
        }
    });
    return newParticipant;
}

async function getParticipants() {
    const participants = await prisma.participants.findMany();
    return participants;
}

async function getParticipantById(participantId: number) {
    const participant = await prisma.participants.findFirst({
        where: {
            id: participantId
        }
    });
    return participant;
}

async function updateParticipantBalance(participantId: number, newBalance: number) {
    const updatedParticipant = await prisma.participants.update({
        where: {
            id: participantId,
        },
        data: {
            balance: newBalance,
        },
    });
    return updatedParticipant;
}

export const participantsRepository = {
    postParticipants,
    getParticipants,
    getParticipantById,
    updateParticipantBalance
}