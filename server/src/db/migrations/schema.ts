import { pgTable, unique, serial, text, boolean, integer, timestamp, index, foreignKey, check, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['admin', 'teacher', 'student'])


export const users = pgTable("users", {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    passwordHash: text("password_hash").notNull(),
    role: role().notNull(),
    address: text(),
    mobile: text(),
    profilePic: text("profile_pic"),
    approved: boolean().default(false).notNull(),
    salary: integer(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
    unique("users_email_key").on(table.email),
]);

export const exams = pgTable("exams", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_exams_created_by").using("btree", table.createdBy.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "exams_created_by_fkey"
		}).onDelete("set null"),
]);

export const questions = pgTable("questions", {
	id: serial().primaryKey().notNull(),
	examId: integer("exam_id").notNull(),
	text: text().notNull(),
	option1: text().notNull(),
	option2: text().notNull(),
	option3: text().notNull(),
	option4: text().notNull(),
	answer: integer().notNull(),
	marks: integer().notNull(),
}, (table) => [
	index("idx_questions_exam_id").using("btree", table.examId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.examId],
			foreignColumns: [exams.id],
			name: "questions_exam_id_fkey"
		}).onDelete("cascade"),
	check("questions_answer_check", sql`(answer >= 1) AND (answer <= 4)`),
	check("questions_marks_check", sql`marks > 0`),
]);

export const results = pgTable("results", {
	id: serial().primaryKey().notNull(),
	studentId: integer("student_id").notNull(),
	examId: integer("exam_id").notNull(),
	marks: integer().notNull(),
	totalMarks: integer("total_marks").notNull(),
	takenAt: timestamp("taken_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_results_exam_id").using("btree", table.examId.asc().nullsLast().op("int4_ops")),
	index("idx_results_student_id").using("btree", table.studentId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [users.id],
			name: "results_student_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.examId],
			foreignColumns: [exams.id],
			name: "results_exam_id_fkey"
		}).onDelete("cascade"),
]);
