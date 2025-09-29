import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "support_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_supportgroups_supportgroups_order" varchar,
  	"name" varchar NOT NULL,
  	"location_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "support_group_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"support_group_id" integer NOT NULL,
  	"day" numeric NOT NULL,
  	"start_hour" numeric NOT NULL,
  	"start_minute" numeric NOT NULL,
  	"duration" numeric DEFAULT 30 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"city_id" integer NOT NULL,
  	"street" varchar NOT NULL,
  	"house" varchar NOT NULL,
  	"apartment_or_office" varchar,
  	"entrance" varchar,
  	"floor" varchar,
  	"intercom_code" varchar,
  	"comment" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DROP INDEX "cities_name_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "support_groups_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "support_group_events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "support_groups" ADD CONSTRAINT "support_groups_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_group_events" ADD CONSTRAINT "support_group_events_support_group_id_support_groups_id_fk" FOREIGN KEY ("support_group_id") REFERENCES "public"."support_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "support_groups__supportgroups_supportgroups_order_idx" ON "support_groups" USING btree ("_supportgroups_supportgroups_order");
  CREATE INDEX "support_groups_name_idx" ON "support_groups" USING btree ("name");
  CREATE INDEX "support_groups_location_idx" ON "support_groups" USING btree ("location_id");
  CREATE INDEX "support_groups_updated_at_idx" ON "support_groups" USING btree ("updated_at");
  CREATE INDEX "support_groups_created_at_idx" ON "support_groups" USING btree ("created_at");
  CREATE INDEX "support_group_events_support_group_idx" ON "support_group_events" USING btree ("support_group_id");
  CREATE INDEX "support_group_events_updated_at_idx" ON "support_group_events" USING btree ("updated_at");
  CREATE INDEX "support_group_events_created_at_idx" ON "support_group_events" USING btree ("created_at");
  CREATE UNIQUE INDEX "supportGroup_day_start_hour_start_minute_idx" ON "support_group_events" USING btree ("support_group_id","day","start_hour","start_minute");
  CREATE INDEX "locations_city_idx" ON "locations" USING btree ("city_id");
  CREATE INDEX "locations_street_idx" ON "locations" USING btree ("street");
  CREATE INDEX "locations_house_idx" ON "locations" USING btree ("house");
  CREATE INDEX "locations_apartment_or_office_idx" ON "locations" USING btree ("apartment_or_office");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "street_house_idx" ON "locations" USING btree ("street","house");
  CREATE INDEX "city_street_house_idx" ON "locations" USING btree ("city_id","street","house");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_support_groups_fk" FOREIGN KEY ("support_groups_id") REFERENCES "public"."support_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_support_group_events_fk" FOREIGN KEY ("support_group_events_id") REFERENCES "public"."support_group_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_support_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("support_groups_id");
  CREATE INDEX "payload_locked_documents_rels_support_group_events_id_idx" ON "payload_locked_documents_rels" USING btree ("support_group_events_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE UNIQUE INDEX "cities_name_idx" ON "cities" USING btree ("name");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "support_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "support_group_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "support_groups" CASCADE;
  DROP TABLE "support_group_events" CASCADE;
  DROP TABLE "locations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_support_groups_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_support_group_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_locations_fk";
  
  DROP INDEX "payload_locked_documents_rels_support_groups_id_idx";
  DROP INDEX "payload_locked_documents_rels_support_group_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_locations_id_idx";
  DROP INDEX "cities_name_idx";
  CREATE INDEX "cities_name_idx" ON "cities" USING btree ("name");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "support_groups_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "support_group_events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "locations_id";`)
}
