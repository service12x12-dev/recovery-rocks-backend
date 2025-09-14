import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "topics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"annual_date_day" numeric,
  	"annual_date_month" numeric,
  	"days_reached" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quotes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"annual_date_day" numeric,
  	"annual_date_month" numeric,
  	"days_reached" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"background_color" varchar NOT NULL,
  	"text_color" varchar NOT NULL,
  	"border_color" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fallback_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"topic_id" integer,
  	"quote_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "topics_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quotes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cards_id" integer;
  ALTER TABLE "fallback_publications" ADD CONSTRAINT "fallback_publications_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fallback_publications" ADD CONSTRAINT "fallback_publications_quote_id_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "topics_annual_date_annual_date_day_idx" ON "topics" USING btree ("annual_date_day");
  CREATE INDEX "topics_annual_date_annual_date_month_idx" ON "topics" USING btree ("annual_date_month");
  CREATE UNIQUE INDEX "topics_days_reached_idx" ON "topics" USING btree ("days_reached");
  CREATE INDEX "topics_updated_at_idx" ON "topics" USING btree ("updated_at");
  CREATE INDEX "topics_created_at_idx" ON "topics" USING btree ("created_at");
  CREATE UNIQUE INDEX "annualDate_day_annualDate_month_idx" ON "topics" USING btree ("annual_date_day","annual_date_month");
  CREATE INDEX "quotes_annual_date_annual_date_day_idx" ON "quotes" USING btree ("annual_date_day");
  CREATE INDEX "quotes_annual_date_annual_date_month_idx" ON "quotes" USING btree ("annual_date_month");
  CREATE UNIQUE INDEX "quotes_days_reached_idx" ON "quotes" USING btree ("days_reached");
  CREATE INDEX "quotes_updated_at_idx" ON "quotes" USING btree ("updated_at");
  CREATE INDEX "quotes_created_at_idx" ON "quotes" USING btree ("created_at");
  CREATE UNIQUE INDEX "annualDate_day_annualDate_month_1_idx" ON "quotes" USING btree ("annual_date_day","annual_date_month");
  CREATE INDEX "cards_updated_at_idx" ON "cards" USING btree ("updated_at");
  CREATE INDEX "cards_created_at_idx" ON "cards" USING btree ("created_at");
  CREATE INDEX "fallback_publications_topic_idx" ON "fallback_publications" USING btree ("topic_id");
  CREATE INDEX "fallback_publications_quote_idx" ON "fallback_publications" USING btree ("quote_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quotes_fk" FOREIGN KEY ("quotes_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cards_fk" FOREIGN KEY ("cards_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_topics_id_idx" ON "payload_locked_documents_rels" USING btree ("topics_id");
  CREATE INDEX "payload_locked_documents_rels_quotes_id_idx" ON "payload_locked_documents_rels" USING btree ("quotes_id");
  CREATE INDEX "payload_locked_documents_rels_cards_id_idx" ON "payload_locked_documents_rels" USING btree ("cards_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fallback_publications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "topics" CASCADE;
  DROP TABLE "quotes" CASCADE;
  DROP TABLE "cards" CASCADE;
  DROP TABLE "fallback_publications" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_topics_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quotes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cards_fk";
  
  DROP INDEX "payload_locked_documents_rels_topics_id_idx";
  DROP INDEX "payload_locked_documents_rels_quotes_id_idx";
  DROP INDEX "payload_locked_documents_rels_cards_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "topics_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quotes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cards_id";`)
}
