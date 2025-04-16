"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { z } from "zod";

const formSchema = {
  title: z.string().min(3, {
    message: "Title is required.",
  }),
  content: z.string().min(1, {
    message: "Content is required.",
  }),
};

const FormSchema = z.object(formSchema);

export default function Page() {
  const { theme } = useTheme();

  const mutation = useMutation({
    mutationFn: eden.api.note.index.post,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const form = useAppForm({
    onSubmit: async ({ value }) => mutation.mutate(value),
    validators: {
      onSubmit: FormSchema,
    },
    defaultValues: {
      title: "asjdklasj",
      content: "",
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );

  function focusToMDEditor() {
    const textareaEl = document.querySelector(
      ".w-md-editor-text-input",
    ) as HTMLTextAreaElement;

    textareaEl.focus();
    textareaEl.setSelectionRange(
      textareaEl.value.length,
      textareaEl.value.length,
    );
  }

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardContent>
          <form.AppForm>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <form.AppField
                    name="title"
                    validators={{
                      onChangeAsync: formSchema.title,
                      onChangeAsyncDebounceMs: 400,
                    }}
                    children={(field) => (
                      <field.FormItem>
                        <field.FormLabel htmlFor="title">Title</field.FormLabel>
                        <field.FormControl>
                          <Input
                            id="title"
                            name="email"
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </field.FormControl>
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2" data-color-mode={theme}>
                  <form.AppField
                    name="content"
                    children={(field) => (
                      <field.FormItem>
                        <field.FormLabel
                          htmlFor="content"
                          onClick={focusToMDEditor}
                        >
                          Content
                        </field.FormLabel>
                        <MDEditor
                          id="content"
                          style={{
                            borderColor: field.state.meta.errors.length
                              ? "var(--destructive)"
                              : "var(--input)",
                          }}
                          value={field.state.value}
                          height={300}
                          preview="edit"
                          onChange={(e) => field.handleChange(e!)}
                          previewOptions={{
                            disallowedElements: ["style"],
                          }}
                        />
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </form.AppForm>
        </CardContent>
      </Card>
    </div>
  );
}
