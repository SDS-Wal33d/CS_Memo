/*
  Warnings:

  - You are about to drop the `reservee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `reservee`;

-- CreateTable
CREATE TABLE `Attendee` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `ticket` VARCHAR(191) NULL,
    `isNotified` BOOLEAN NOT NULL DEFAULT false,
    `attendeeType` ENUM('STUDENT', 'FACULTY', 'INDUSTRY') NOT NULL,
    `attendStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Attendee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
