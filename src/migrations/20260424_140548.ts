import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_works\` ADD \`variant\` text DEFAULT 'grid';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_works\` ADD \`variant\` text DEFAULT 'grid';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_works\` DROP COLUMN \`variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_works\` DROP COLUMN \`variant\`;`)
}
