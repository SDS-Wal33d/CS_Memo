/*
  Warnings:

  - You are about to drop the column `teamId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `teammember` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `teammember` table. All the data in the column will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `teammember` DROP FOREIGN KEY `TeamMember_teamId_fkey`;

-- DropIndex
DROP INDEX `Project_teamId_key` ON `project`;

-- DropIndex
DROP INDEX `TeamMember_teamId_fkey` ON `teammember`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `teamId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teammember` DROP COLUMN `memberId`,
    DROP COLUMN `teamId`,
    ADD COLUMN `projectId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `team`;

-- CreateIndex
CREATE UNIQUE INDEX `Project_authorId_key` ON `Project`(`authorId`);

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
