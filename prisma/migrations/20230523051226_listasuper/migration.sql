-- CreateTable
CREATE TABLE `lista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `unidad` INTEGER NOT NULL,
    `precio` INTEGER NOT NULL,

    UNIQUE INDEX `lista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
