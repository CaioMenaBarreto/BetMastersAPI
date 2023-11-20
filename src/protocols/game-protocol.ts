export type NewGame = {
	homeTeamName: string;
	awayTeamName: string;
}

export type Game = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
}