ALTER TABLE "classes" ADD COLUMN "academyId" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "academy_class_name_unique" ON "classes" USING btree ("academyId","name");