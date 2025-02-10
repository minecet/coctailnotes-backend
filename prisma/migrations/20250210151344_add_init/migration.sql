/*
  Warnings:

  - Added the required column `Step1` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Step2` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Step3` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Step4` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Step5` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Step6` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients1` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients10` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients11` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients12` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients2` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients3` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients4` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients5` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients6` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients7` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients8` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients9` to the `Cocktail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cocktail" ADD COLUMN     "Step1" TEXT NOT NULL,
ADD COLUMN     "Step2" TEXT NOT NULL,
ADD COLUMN     "Step3" TEXT NOT NULL,
ADD COLUMN     "Step4" TEXT NOT NULL,
ADD COLUMN     "Step5" TEXT NOT NULL,
ADD COLUMN     "Step6" TEXT NOT NULL,
ADD COLUMN     "ingredients1" TEXT NOT NULL,
ADD COLUMN     "ingredients10" TEXT NOT NULL,
ADD COLUMN     "ingredients11" TEXT NOT NULL,
ADD COLUMN     "ingredients12" TEXT NOT NULL,
ADD COLUMN     "ingredients2" TEXT NOT NULL,
ADD COLUMN     "ingredients3" TEXT NOT NULL,
ADD COLUMN     "ingredients4" TEXT NOT NULL,
ADD COLUMN     "ingredients5" TEXT NOT NULL,
ADD COLUMN     "ingredients6" TEXT NOT NULL,
ADD COLUMN     "ingredients7" TEXT NOT NULL,
ADD COLUMN     "ingredients8" TEXT NOT NULL,
ADD COLUMN     "ingredients9" TEXT NOT NULL;
