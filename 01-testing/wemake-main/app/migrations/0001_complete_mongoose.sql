ALTER TABLE "jobs" ADD COLUMN "location" "location" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_range" "salary_range" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;