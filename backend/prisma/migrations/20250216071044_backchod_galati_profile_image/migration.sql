/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "profileImage",
ADD COLUMN     "profilePic" TEXT;
