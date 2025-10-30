CREATE TABLE "containers" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"problem_name" text NOT NULL,
	"problem_id" integer NOT NULL,
	"container_id" text NOT NULL,
	"ssh_user" text NOT NULL,
	"ssh_pass" text NOT NULL,
	"port" integer NOT NULL,
	"flag_hash" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_name" text NOT NULL,
	"course_description" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "docker_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_name" text NOT NULL,
	"problem_id" integer NOT NULL,
	"tag" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_name" text NOT NULL,
	"problem_description" text NOT NULL,
	"course_id" integer NOT NULL,
	"docker_image_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "uploads" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_name" text NOT NULL,
	"problem_id" integer NOT NULL,
	"s3_key" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "problems" ADD CONSTRAINT "problems_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problems" ADD CONSTRAINT "problems_docker_image_id_docker_images_id_fk" FOREIGN KEY ("docker_image_id") REFERENCES "public"."docker_images"("id") ON DELETE no action ON UPDATE no action;