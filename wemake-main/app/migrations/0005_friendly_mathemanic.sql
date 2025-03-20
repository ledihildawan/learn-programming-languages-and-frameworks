CREATE TABLE "gpt_ideas_likes" (
	"gpt_idea_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "gpt_ideas_likes_gpt_idea_id_profile_id_pk" PRIMARY KEY("gpt_idea_id","profile_id")
);
--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk" FOREIGN KEY ("gpt_idea_id") REFERENCES "public"."gpt_ideas"("gpt_idea_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;