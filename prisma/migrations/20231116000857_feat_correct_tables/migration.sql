/*
  Warnings:

  - You are about to drop the `bet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participantes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "bet";

-- DropTable
DROP TABLE "game";

-- DropTable
DROP TABLE "participantes";

-- CreateTable
CREATE TABLE "Bets" (
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

    CONSTRAINT "Bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamName" VARCHAR(255) NOT NULL,
    "awayTeamName" VARCHAR(255) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);
