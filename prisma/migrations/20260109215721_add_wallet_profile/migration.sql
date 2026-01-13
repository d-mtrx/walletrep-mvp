-- CreateTable
CREATE TABLE "WalletProfile" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "firstSeen" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "txCount" INTEGER NOT NULL,
    "approxVolume" DOUBLE PRECISION NOT NULL,
    "tokensSeen" TEXT[],
    "contractsSeen" TEXT[],
    "source" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletProfile_address_key" ON "WalletProfile"("address");

-- CreateIndex
CREATE INDEX "WalletProfile_address_idx" ON "WalletProfile"("address");
