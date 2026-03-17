CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fname" varchar(50) NOT NULL,
	"lname" varchar(50)
);
