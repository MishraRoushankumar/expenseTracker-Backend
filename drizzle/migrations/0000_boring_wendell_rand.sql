CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'maintainer', 'user');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_user_id_unique" UNIQUE("name","user_id")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer,
	"type" "transaction_type" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"description" text,
	"transaction_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_categories_user_id" ON "categories" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_user_id" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_category_id" ON "transactions" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_date" ON "transactions" USING btree ("transaction_date");--> statement-breakpoint
CREATE INDEX "idx_transactions_type" ON "transactions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_transactions_user_date" ON "transactions" USING btree ("user_id","transaction_date");