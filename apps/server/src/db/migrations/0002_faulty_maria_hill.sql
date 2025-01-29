CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fcmDeviceToken" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "Contact_description_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_name_idx" ON "User" USING btree ("name");