/*
  Warnings:

  - A unique constraint covering the columns `[dep_name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Department_dep_name_key" ON "Department"("dep_name");
