CREATE TABLE "hr"."employees" (
	"employee_id" bigserial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"job_title" text NOT NULL,
	"salary" bigint NOT NULL,
	"report_to" bigint,
	"office_id" bigint
);
--> statement-breakpoint
CREATE TABLE "hr"."offices" (
	"office_id" bigserial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invetory"."products" (
	"product_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quanity_in_stock" bigint NOT NULL,
	"unit_price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoicing"."clients" (
	"client_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"phone" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoicing"."invoices" (
	"invoice_id" bigserial PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"client_id" bigint NOT NULL,
	"invoice_total" numeric NOT NULL,
	"payment_total" numeric DEFAULT '0.00' NOT NULL,
	"invoice_date" date NOT NULL,
	"due_date" date NOT NULL,
	"payment_date" date
);
--> statement-breakpoint
CREATE TABLE "invoicing"."payment_methods" (
	"payment_method_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoicing"."payments" (
	"payment_id" bigserial PRIMARY KEY NOT NULL,
	"client_id" bigint NOT NULL,
	"invoice_id" bigint NOT NULL,
	"date" date NOT NULL,
	"amount" numeric NOT NULL,
	"payment_method" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store"."customers" (
	"customer_id" bigserial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"birth_date" date,
	"phone" text,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store"."order_item_notes" (
	"note_id" bigserial PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"product_id  " bigserial NOT NULL,
	"note" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store"."order_items" (
	"order_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"quantity" bigint NOT NULL,
	"unitPrice" numeric NOT NULL,
	CONSTRAINT "order_items_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "store"."order_statuses" (
	"order_status_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store"."orders" (
	"order_id" bigserial PRIMARY KEY NOT NULL,
	"customer_id" bigint NOT NULL,
	"order_date" date NOT NULL,
	"status" smallint DEFAULT 1 NOT NULL,
	"comments" text,
	"shipped_date" date,
	"shipper_id" bigint
);
--> statement-breakpoint
CREATE TABLE "store"."products" (
	"product_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity_in_stock" bigint NOT NULL,
	"unit_price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store"."shippers" (
	"shipper_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hr"."employees" ADD CONSTRAINT "employees_report_to_employees_employee_id_fk" FOREIGN KEY ("report_to") REFERENCES "hr"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employees" ADD CONSTRAINT "employees_office_id_offices_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "hr"."offices"("office_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invoicing"."invoices" ADD CONSTRAINT "invoices_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "invoicing"."clients"("client_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invoicing"."payments" ADD CONSTRAINT "payments_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "invoicing"."clients"("client_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invoicing"."payments" ADD CONSTRAINT "payments_invoice_id_invoices_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "invoicing"."invoices"("invoice_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invoicing"."payments" ADD CONSTRAINT "payments_payment_method_payment_methods_payment_method_id_fk" FOREIGN KEY ("payment_method") REFERENCES "invoicing"."payment_methods"("payment_method_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store"."order_item_notes" ADD CONSTRAINT "order_item_notes_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "store"."orders"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store"."order_item_notes" ADD CONSTRAINT "order_item_notes_product_id  _products_product_id_fk" FOREIGN KEY ("product_id  ") REFERENCES "store"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store"."order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "store"."orders"("order_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "store"."order_items" ADD CONSTRAINT "order_items_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "store"."products"("product_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "store"."orders" ADD CONSTRAINT "orders_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "store"."customers"("customer_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "store"."orders" ADD CONSTRAINT "orders_status_order_statuses_order_status_id_fk" FOREIGN KEY ("status") REFERENCES "store"."order_statuses"("order_status_id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "store"."orders" ADD CONSTRAINT "orders_shipper_id_shippers_shipper_id_fk" FOREIGN KEY ("shipper_id") REFERENCES "store"."shippers"("shipper_id") ON DELETE no action ON UPDATE cascade;