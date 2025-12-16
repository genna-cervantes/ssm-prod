import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

const baseColumns = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  isActive: boolean("is_active").notNull().default(true),
};

export const petitionsTable = pgTable("petitions", {
  petitionId: serial("petition_id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  emailAddress: varchar("email_address", { length: 320 }).notNull(),
  occupation: varchar("occupation", { length: 255 }),
  affiliation: varchar("affiliation", { length: 255 }),
  ...baseColumns,
});

// notes
export const notesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  sender: varchar("sender", { length: 255 }).notNull(),
  note: text("note"),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(),
  petitionId: integer("petition_id")
    .notNull()
    .references(() => petitionsTable.petitionId, {
      onDelete: "cascade",
    }),
  ...baseColumns,
});

// articles (outside ?)
export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  sender: varchar("sender", { length: 255 }).notNull(),
  articleLink: text("article_link").notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  summary: text("abstract_summary").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  dateSubmitted: timestamp("date_submitted", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  datePublished: timestamp("date_published", {
    withTimezone: true,
  }),
  ...baseColumns,
});

// publications (in house)
export const publicationsTable = pgTable("publications", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 255 }).notNull(),
  content: text("wysiwyg_content").notNull(),
  datePublished: timestamp("date_published", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  ...baseColumns,
});

// roles
export const rolesTable = pgTable("roles", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 100 }).notNull(),
  permissions: text("permissions").array().notNull(),
  ...baseColumns,
});

// users
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id")
    .notNull()
    .references(() => rolesTable.id, { onDelete: "restrict" }),
  email: varchar("email", { length: 320 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  ...baseColumns,
});
