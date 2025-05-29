-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_attendeeTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `attendeetype` DROP FOREIGN KEY `AttendeeType_settingsId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `settings` DROP FOREIGN KEY `Settings_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_id_fkey`;

-- DropForeignKey
ALTER TABLE `teammember` DROP FOREIGN KEY `TeamMember_projectId_fkey`;

-- DropIndex
DROP INDEX `Attendee_attendeeTypeId_fkey` ON `attendee`;

-- DropIndex
DROP INDEX `AttendeeType_settingsId_fkey` ON `attendeetype`;

-- DropIndex
DROP INDEX `TeamMember_projectId_fkey` ON `teammember`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendeeType` ADD CONSTRAINT `AttendeeType_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `Settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_attendeeTypeId_fkey` FOREIGN KEY (`attendeeTypeId`) REFERENCES `AttendeeType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
