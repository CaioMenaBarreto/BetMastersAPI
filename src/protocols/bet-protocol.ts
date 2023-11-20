export type NewBet = { 
	homeTeamScore: number;
	awayTeamScore: number; 
	amountBet: number;
	gameId: number; 
	participantId: number;
}

export type PostBet = {
	 homeTeamScore: number; 
	 awayTeamScore: number;
	 amountBet: number;
	 gameId: number;
	 participantId: number;
}

export type Bets = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number;
    gameId: number;
    participantId: number;
    status: string;
    amountWon: number;
}[]

export type UpdateBet = {
    amountWon: number;
    status: string;
}