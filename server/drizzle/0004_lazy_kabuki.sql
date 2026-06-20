ALTER TABLE "tasks" ADD COLUMN "createdBy" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "doneByIds" text;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "expireAt" timestamp;