-- CreateTable
CREATE TABLE "bet" (
    "id" SERIAL NOT NULL,
    "createdat" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hometeamscore" INTEGER NOT NULL,
    "awayteamscore" INTEGER NOT NULL,
    "amountbet" INTEGER NOT NULL,
    "gameid" INTEGER NOT NULL,
    "participantid" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "amountwon" INTEGER,

    CONSTRAINT "bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "createdat" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hometeamname" VARCHAR(255) NOT NULL,
    "awayteamname" VARCHAR(255) NOT NULL,
    "hometeamscore" INTEGER NOT NULL,
    "awayteamscore" INTEGER NOT NULL,
    "isfinished" BOOLEAN NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantes" (
    "id" SERIAL NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "participantes_pkey" PRIMARY KEY ("id")
);
