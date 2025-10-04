import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ADD COLUMN "title" varchar;
 
  UPDATE locations AS l
  SET title = CONCAT_WS(', ', CONCAT_WS(' ', l.street, l.house), l.apartment_or_office, c.name)
  FROM cities AS c
  WHERE c.id = l.city_id;

  ALTER TABLE "locations" ALTER COLUMN "title" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" DROP COLUMN "title";`)
}
