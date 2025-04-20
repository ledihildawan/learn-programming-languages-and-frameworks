"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { Link } from "@/lib/next-route-guard/link";
import { useRouteGuard } from "@/lib/next-route-guard/use-route-guard";
import { useMutation } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { debounce, isEqual } from "radash";
import { useCallback, useState } from "react";
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
  const { theme } = useTheme();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (payload: NotePayload) => {
      try {
        await eden.api.note.index.post(payload);
      } catch (error) {}
    },
    onSuccess: () => {
      dismissToasts();

      toast.success("Note has been successfully created!");

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
        if (isEqual(defaultValues, value)) {
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
    defaultValues,
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

  const [note, setNote] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>();

  useRouteGuard(() => note.length > 0);

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

  return (
    <>
      <div className="grid gap-4">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <Link
            href="/dashboard/notes"
            onBeforeNavigate={() =>
              new Promise((resolve) => {
                setShowConfirm(true);
                setPendingAction(() => () => resolve(true));
              })
            }
          >
            Notes
          </Link>
          <div className="flex items-center gap-2">
            <Button
              className="sm"
              onClick={() => {
                form.handleSubmit();
              }}
            >
              Save
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
                          <field.FormLabel htmlFor="title">
                            Title
                          </field.FormLabel>
                          <field.FormControl>
                            <Input
                              id="title"
                              name="email"
                              type="text"
                              value={field.state.value}
                              onChange={(e) => {
                                setNote(e.target.value);
                                field.handleChange(e.target.value);
                              }}
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

      {showConfirm && (
        <div className="modal">
          <p>Yakin mau keluar? Perubahan belum disimpan.</p>
          <button onClick={() => pendingAction?.()}>Ya, lanjut</button>
          <button onClick={() => setShowConfirm(false)}>Batal</button>
        </div>
      )}
    </>
  );
}
