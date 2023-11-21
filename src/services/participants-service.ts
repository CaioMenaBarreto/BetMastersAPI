import { valueInsufficientError } from "@/errors/insufficient-insert-balance-error";
import { participantsRepository } from "@/repositories/participants-repository";

async function postParticipants(name: string, balance: number) {
    if (balance < 1000) throw valueInsufficientError();

    const newParticipant = await participantsRepository.postParticipants(name, balance);

    return newParticipant;
}

async function getParticipants() {
    const participants = await participantsRepository.getParticipants();

    if (participants.length === 0) return { message: "There are no participants" };

    return participants;
}

export const participantsService = {
    postParticipants,
    getParticipants
}