import { valueInsufficientError } from "@/errors/insufficient-insert-balance-error";
import { participantsRepository } from "@/repositories/participants-repository";

async function postParticipants(name: string, balance: string) {
    const newStringBalance = balance.replace(",", "");
    const newBalance = Number(newStringBalance);

    if(newBalance < 1000){
        throw valueInsufficientError();
    }

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