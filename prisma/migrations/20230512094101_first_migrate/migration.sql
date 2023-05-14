-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `finished` DATETIME(3) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Todo_email_key`(`email`),
    INDEX `index_todo_id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
