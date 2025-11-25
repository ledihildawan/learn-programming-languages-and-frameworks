-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('Admin', 'Host', 'Customer', 'System');

-- CreateEnum
CREATE TYPE "SystemLogsActionType" AS ENUM ('CREATE', 'UPDATE', 'EXECUTE', 'DELETE');

-- CreateEnum
CREATE TYPE "SystemLogsStatus" AS ENUM ('SUCCESS', 'FAILURE');

-- CreateEnum
CREATE TYPE "SystemLogsSource" AS ENUM ('HTTP', 'SEEDER', 'MIGRATION', 'CLI', 'CRON', 'TEST');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('BOOKING', 'REVIEW', 'REFUND', 'PAYMENT');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" "RoleName" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "phone_number" VARCHAR(20),
    "country_id" TEXT NOT NULL,
    "profile_image_url" VARCHAR(512),
    "is_active" BOOLEAN DEFAULT false,
    "is_verified" BOOLEAN DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "actor_role" TEXT,
    "action" TEXT NOT NULL,
    "table_name" TEXT NOT NULL,
    "record_id" TEXT,
    "changes" JSONB,
    "old_data" JSONB,
    "new_data" JSONB,
    "duration_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "route" TEXT,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "metadata" JSONB,

    CONSTRAINT "system_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" "StatusType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
