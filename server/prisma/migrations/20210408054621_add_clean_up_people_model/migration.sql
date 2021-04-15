/*
  Warnings:

  - You are about to drop the column `height` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `homeworld` on the `Person` table. All the data in the column will be lost.
  - Added the required column `personId` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "height",
DROP COLUMN "gender",
DROP COLUMN "homeworld",
ADD COLUMN     "personId" INTEGER NOT NULL;
