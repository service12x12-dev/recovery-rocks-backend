import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "card_set" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "card_set_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"cards_id" integer
  );
  
  ALTER TABLE "card_set_rels" ADD CONSTRAINT "card_set_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."card_set"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "card_set_rels" ADD CONSTRAINT "card_set_rels_cards_fk" FOREIGN KEY ("cards_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "card_set_rels_order_idx" ON "card_set_rels" USING btree ("order");
  CREATE INDEX "card_set_rels_parent_idx" ON "card_set_rels" USING btree ("parent_id");
  CREATE INDEX "card_set_rels_path_idx" ON "card_set_rels" USING btree ("path");
  CREATE INDEX "card_set_rels_cards_id_idx" ON "card_set_rels" USING btree ("cards_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "card_set" CASCADE;
  DROP TABLE "card_set_rels" CASCADE;`)
}
