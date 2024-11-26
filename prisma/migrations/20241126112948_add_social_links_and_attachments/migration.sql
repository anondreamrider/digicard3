/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SocialLink` table. All the data in the column will be lost.
  - Made the column `shareLink` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `qrCodeUrl` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_profileId_fkey";

-- DropIndex
DROP INDEX "Attachment_profileId_idx";

-- DropIndex
DROP INDEX "Profile_shareLink_key";

-- DropIndex
DROP INDEX "Profile_userId_idx";

-- DropIndex
DROP INDEX "SocialLink_profileId_idx";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "shareLink" SET NOT NULL,
ALTER COLUMN "qrCodeUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
