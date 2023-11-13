import { participantsRepository } from "@/repositories/participants-repository";

async function postParticipants(name: string, balance: string) {
    const newStringBalance = balance.replace(",", "");
    const newBalance = Number(newStringBalance);
    const newParticipant = await participantsRepository.postParticipants(name, newBalance);

    return newParticipant;
}

async function getParticipants(){
    const participants = await participantsRepository.getParticipants();
    return participants;
}

export const participantsService = {
    postParticipants,
    getParticipants
}