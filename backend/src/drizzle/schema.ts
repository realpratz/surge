import { pgTable, varchar, timestamp, text, integer, uniqueIndex } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2";



export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const user = pgTable("User", {
	id: text().primaryKey().notNull().$defaultFn(() => createId()),
	email: text().notNull().unique(),
	name: text(),
	pfpUrl: text(),
	cfHandle: text().unique(),
	cfRating: integer(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("User_cfHandle_key").using("btree", table.cfHandle.asc().nullsLast().op("text_ops")),
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);
