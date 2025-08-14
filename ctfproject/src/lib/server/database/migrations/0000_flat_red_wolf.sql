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
CREATE TABLE "docker_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_name" text NOT NULL,
	"problem_id" integer NOT NULL,
	"tag" text NOT NULL,
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
