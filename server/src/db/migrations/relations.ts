import { relations } from "drizzle-orm/relations";
import { users, exams, questions, results } from "./schema";

export const examsRelations = relations(exams, ({one, many}) => ({
	user: one(users, {
		fields: [exams.createdBy],
		references: [users.id]
	}),
	questions: many(questions),
	results: many(results),
}));

export const usersRelations = relations(users, ({many}) => ({
	exams: many(exams),
	results: many(results),
}));

export const questionsRelations = relations(questions, ({one}) => ({
	exam: one(exams, {
		fields: [questions.examId],
		references: [exams.id]
	}),
}));

export const resultsRelations = relations(results, ({one}) => ({
	user: one(users, {
		fields: [results.studentId],
		references: [users.id]
	}),
	exam: one(exams, {
		fields: [results.examId],
		references: [exams.id]
	}),
}));