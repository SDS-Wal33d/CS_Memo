/*
  Warnings:

  - You are about to drop the column `attendeeType` on the `attendee` table. All the data in the column will be lost.
  - Added the required column `attendeeTypeId` to the `Attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacityStatus` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conferenceDateTime` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDescription` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventEndTime` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSubmissionEnd` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectSubmissionStart` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatReservationEnd` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatReservationStart` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueAddress` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueName` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendee` DROP COLUMN `attendeeType`,
    ADD COLUMN `attendeeTypeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `settings` ADD COLUMN `capacityStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `conferenceDateTime` DATETIME(3) NOT NULL,
    ADD COLUMN `eventDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventEndTime` TIME NOT NULL,
    ADD COLUMN `projectSubmissionEnd` DATE NOT NULL,
    ADD COLUMN `projectSubmissionStart` DATE NOT NULL,
    ADD COLUMN `seatReservationEnd` DATE NOT NULL,
    ADD COLUMN `seatReservationStart` DATE NOT NULL,
    ADD COLUMN `venueAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `venueName` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AttendeeType` (
    `id` VARCHAR(191) NOT NULL,
    `settingsId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AttendeeType` ADD CONSTRAINT `AttendeeType_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `Settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_attendeeTypeId_fkey` FOREIGN KEY (`attendeeTypeId`) REFERENCES `AttendeeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
