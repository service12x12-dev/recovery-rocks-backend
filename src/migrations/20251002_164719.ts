import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cities" ADD COLUMN "timezone" varchar DEFAULT 'Europe/Moscow' NOT NULL;
  CREATE INDEX "cities_timezone_idx" ON "cities" USING btree ("timezone");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "cities_timezone_idx";
  ALTER TABLE "cities" DROP COLUMN "timezone";`)
}
