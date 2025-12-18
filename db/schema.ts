import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
  occupation: varchar("occupation", { length: 255 }).notNull(),
  affiliation: varchar("affiliation", { length: 255 }).notNull(),
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


// better-auth
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  roleId: integer("role_id")
    .notNull()
    .references(() => rolesTable.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
