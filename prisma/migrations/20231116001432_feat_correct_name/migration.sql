/*
  Warnings:

  - You are about to drop the `Bets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bets";

-- DropTable
DROP TABLE "Games";

-- DropTable
DROP TABLE "Participants";

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "amountBet" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "amountWon" INTEGER,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamName" VARCHAR(255) NOT NULL,
    "awayTeamName" VARCHAR(255) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);
