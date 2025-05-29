/*
  Warnings:

  - You are about to drop the column `createdAt` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
