/*
  Warnings:

  - A unique constraint covering the columns `[personId,postedById]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Person.personId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "ThePerson_personId_postedById_unique_constraint" ON "Person"("personId", "postedById");
