/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Person.personId_unique" ON "Person"("personId");
