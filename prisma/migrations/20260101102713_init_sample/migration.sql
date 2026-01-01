-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);
