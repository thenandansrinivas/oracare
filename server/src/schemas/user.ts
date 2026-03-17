import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	fname: varchar('fname', { length: 50 }).notNull(),
	lname: varchar('lname', { length: 50 })
})
