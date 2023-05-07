/*
  Warnings:

  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserServers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserServers" DROP CONSTRAINT "UserServers_serverId_fkey";

-- DropForeignKey
ALTER TABLE "_ServerToUser" DROP CONSTRAINT "_ServerToUser_A_fkey";

-- AlterTable
ALTER TABLE "Server" DROP CONSTRAINT "Server_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Server_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "UserServers" DROP CONSTRAINT "UserServers_pkey",
ALTER COLUMN "serverId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "UserServers_pkey" PRIMARY KEY ("userId", "serverId");

-- AlterTable
ALTER TABLE "_ServerToUser" ALTER COLUMN "A" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "UserServers" ADD CONSTRAINT "UserServers_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerToUser" ADD CONSTRAINT "_ServerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
