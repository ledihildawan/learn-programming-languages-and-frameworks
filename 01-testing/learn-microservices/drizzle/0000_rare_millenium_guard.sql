CREATE TABLE "Author" (
	"AuthorID" integer NOT NULL,
	"FirstName" text NOT NULL,
	"MiddleName" text,
	"LastName" text NOT NULL,
	"PaymentMethod" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Customer" (
	"CustomerID" integer NOT NULL,
	"FirstName" text NOT NULL,
	"LastName" text NOT NULL,
	"Address" text,
	"City" text,
	"State" text,
	"Zip" text,
	"Country" text
);
--> statement-breakpoint
CREATE TABLE "MyFirstQuery" (
	"Outcome" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OrderHeader" (
	"OrderID" integer NOT NULL,
	"CustomerID" integer NOT NULL,
	"PromotionID" integer,
	"OrderDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OrderItem" (
	"OrderID" integer NOT NULL,
	"OrderItem" integer NOT NULL,
	"TitleID" integer NOT NULL,
	"Quantity" integer NOT NULL,
	"ItemPrice" numeric(5, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Promotion" (
	"PromotionID" integer NOT NULL,
	"PromotionCode" text NOT NULL,
	"PromotionStartDate" timestamp NOT NULL,
	"PromotionEndDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Title" (
	"TitleID" integer NOT NULL,
	"TitleName" text NOT NULL,
	"Price" numeric(5, 2) NOT NULL,
	"Advance" numeric(8, 2) NOT NULL,
	"Royalty" numeric(5, 2),
	"PublicationDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TitleAuthor" (
	"TitleID" integer NOT NULL,
	"AuthorID" integer NOT NULL,
	"AuthorOrder" integer NOT NULL
);
