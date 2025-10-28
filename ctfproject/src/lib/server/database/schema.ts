import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password_hash").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseName: text("course_name").notNull(),
  courseDescription: text("course_description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  problemName: text("problem_name").notNull(),
  problemDescription: text("problem_description").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  dockerImageId: text("docker_images").notNull().references(() => dockerImages.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dockerImages = pgTable("docker_images", {
  id: serial("id").primaryKey(),
  problemName: text("problem_name").notNull(),
  problemID: integer("problem_id").notNull(),
  tag: text("tag").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const containers = pgTable("containers", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  problemName: text("problem_name").notNull(),
  problemID: integer("problem_id").notNull(),
  containerId: text("container_id").notNull(),
  sshUser: text("ssh_user").notNull(),
  sshPass: text("ssh_pass").notNull(),
  port: integer("port").notNull(),
  flagHash: varchar("flag_hash", { length: 64 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  problemName: text("problem_name").notNull(),
  problemID: integer("problem_id").notNull(),
  s3Key: text("s3_key").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
