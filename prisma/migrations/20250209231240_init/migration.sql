/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Cocktail` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Cocktail` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Cocktail` table. All the data in the column will be lost.
  - Added the required column `description` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portion` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Cocktail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cocktail" DROP COLUMN "ingredients",
DROP COLUMN "instructions",
DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "portion" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
