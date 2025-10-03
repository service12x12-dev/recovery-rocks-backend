import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cities" ADD COLUMN "id_string" varchar;
  CREATE INDEX "cities_id_string_idx" ON "cities" USING btree ("id_string");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "cities_id_string_idx";
  ALTER TABLE "cities" DROP COLUMN "id_string";`)
}
