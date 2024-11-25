CREATE TABLE IF NOT EXISTS "Contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"description" text,
	"photos" jsonb DEFAULT '[]'::jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Contact_email_idx" ON "Contact" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Contact_phone_idx" ON "Contact" USING btree ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Contact_name_idx" ON "Contact" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Contact_description_idx" ON "Contact" USING btree ("description");