-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."role" AS ENUM('admin', 'teacher', 'student');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role" NOT NULL,
	"address" text,
	"mobile" text,
	"profile_pic" text,
	"approved" boolean DEFAULT false NOT NULL,
	"salary" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "exams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"exam_id" integer NOT NULL,
	"text" text NOT NULL,
	"option1" text NOT NULL,
	"option2" text NOT NULL,
	"option3" text NOT NULL,
	"option4" text NOT NULL,
	"answer" integer NOT NULL,
	"marks" integer NOT NULL,
	CONSTRAINT "questions_answer_check" CHECK ((answer >= 1) AND (answer <= 4)),
	CONSTRAINT "questions_marks_check" CHECK (marks > 0)
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"exam_id" integer NOT NULL,
	"marks" integer NOT NULL,
	"total_marks" integer NOT NULL,
	"taken_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_exams_created_by" ON "exams" USING btree ("created_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_questions_exam_id" ON "questions" USING btree ("exam_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_results_exam_id" ON "results" USING btree ("exam_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_results_student_id" ON "results" USING btree ("student_id" int4_ops);
*/