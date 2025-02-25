-- CreateTable
CREATE TABLE `Coin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `market_cap` VARCHAR(191) NOT NULL,
    `var_24_horas` VARCHAR(191) NOT NULL,
    `var_7_dias` VARCHAR(191) NOT NULL,
    `valor_hist_mais_alto` VARCHAR(191) NOT NULL,
    `valor_hist_mais_baixo` VARCHAR(191) NOT NULL,
    `valor_atual` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
