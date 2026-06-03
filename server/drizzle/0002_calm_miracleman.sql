CREATE TABLE "academy_requests" (
	"academyId" text NOT NULL,
	"userId" text NOT NULL,
	"requestedRole" text DEFAULT 'student' NOT NULL,
	"status" text NOT NULL,
	"message" text NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "ownerId" text NOT NULL;