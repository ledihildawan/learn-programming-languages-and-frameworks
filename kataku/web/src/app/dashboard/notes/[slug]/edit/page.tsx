"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { updateBreadcrumbs, updateIsLoading } from "@/store/breadcrumbs-store";
import { updateRecent, updateRecentItem } from "@/store/recent-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import MDEditor from "@uiw/react-md-editor";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import { debounce, isEqual } from "radash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface NotePayload {
  title: string;
  content: string;
}

const formSchema = {
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  content: z.string().min(1, {
    message: "Content is required.",
  }),
};

const defaultValues = {
  title: "",
  content: "",
};

const FormSchema = z.object(formSchema);

export default function Page() {
  const [nextNote, setNextNote] = useState<any>();
  const [prevNote, setPrevNote] = useState<any>();

  const params = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const router = useRouter();

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: async ({ signal }) => {
      try {
        const res = await eden.api
          .note({ slug: params.slug })
          .get({ fetch: { signal } });

        batch(() => {
          updateRecent(res.data.data);
          updateBreadcrumbs(`/dashboard/notes/${res.data.data.title}/edit`);

          updateIsLoading(false);
        });

        setNextNote(res.data.nextNote);
        setPrevNote(res.data.prevNote);

        return res.data.data;
      } catch (error) {}
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: NotePayload) => {
      try {
        const res = await eden.api
          .note({ slug: params.slug })
          .patch(payload, { fetch: { method: "PATCH" } });

        return res;
      } catch (error) {}
    },
    onSuccess: (res) => {
      dismissToasts();

      toast.success("Note has been successfully updated!");

      updateRecentItem(res!.data!.data);

      router.push(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/notes`);
    },
    onError: () => {
      toast.error("Oops, something went wrong on the server's end!");
    },
  });

  const form = useAppForm({
    onSubmit: async ({ value }) => mutation.mutate(value),
    validators: {
      onSubmit: FormSchema,
      onChange: debounce({ delay: 400 }, ({ value }) => {
        if (isEqual(query.data, value)) {
          dismissToasts();
          return;
        }

        if (toast.getToasts().length) {
          return;
        }

        toast.info("Unsaved changes", {
          position: "bottom-center",
          duration: Infinity,
          action: (
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={discard}>
                Discard
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  form.handleSubmit();
                }}
              >
                Save
              </Button>
            </div>
          ),
        });
      }),
    },
    defaultValues: query.data,
    onSubmitInvalid: (data) => {
      console.log(data);
    },
  });

  const dismissToasts = () => {
    toast.getToasts().forEach((t) => toast.dismiss(t.id));
  };

  const discard = useCallback(() => {
    form.reset();

    dismissToasts();
  }, [form]);

  const focusToMDEditor = useCallback(() => {
    const textareaEl = document.querySelector(
      ".w-md-editor-text-input",
    ) as HTMLTextAreaElement;

    textareaEl.focus();
    textareaEl.setSelectionRange(
      textareaEl.value.length,
      textareaEl.value.length,
    );
  }, []);

  useEffect(() => {
    updateIsLoading(true);
  }, []);

  const goToNote = (slug: string) => {
    dismissToasts();

    router.push(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/notes/${slug}/edit`);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-end px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => {
              form.handleSubmit();
            }}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!prevNote}
            onClick={() => goToNote(prevNote.slug)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!nextNote}
            onClick={() => goToNote(nextNote.slug)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardContent>
            <form.AppForm>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <form.AppField
                    name="title"
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
                          height={420}
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
              </div>
            </form.AppForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
