/*
  Warnings:

  - A unique constraint covering the columns `[requestingUserId,requestedUserId]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ConversationTypeEnum" ADD VALUE 'REQUESTED';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "googleId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friends_requestingUserId_requestedUserId_key" ON "Friends"("requestingUserId", "requestedUserId");
