"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigationGuard } from "next-navigation-guard";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isEqual } from "radash";
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

  const [isFromValuesChange, setIsFormValuesChange] = useState(false);

  const form = useAppForm({
    onSubmit: async ({ value }) => mutation.mutate(value),
    validators: {
      onSubmit: FormSchema,
      onChange: ({ value }) => {
        setIsFormValuesChange(!isEqual(defaultValues, value));
      },
    },
    defaultValues,
    onSubmitInvalid: (data) => {
      console.log(data);
    },
  });
  const router = useRouter();
  const navGuard = useNavigationGuard({ enabled: isFromValuesChange });

  const mutation = useMutation({
    mutationFn: async (payload: NotePayload) => {
      try {
        await eden.api.note.index.post(payload);
      } catch (error) {}
    },
    onSuccess: async () => {
      dismissToasts();

      toast.success("Note has been successfully created!");

      if (navGuard.active) {
        await navGuard.accept();
      } else {
        router.push(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/notes`);
      }
    },
    onError: () => {
      toast.error("Oops, something went wrong on the server's end!");
    },
  });

  const dismissToasts = () => {
    toast.dismiss();
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

  return (
    <>
      <div className="grid gap-6">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/notes">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <span className="text-xl font-bold">Add product</span>
          </div>
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
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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

      <AlertDialog open={navGuard.active}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave site?</AlertDialogTitle>
            <AlertDialogDescription>
              Changes you made may not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={navGuard.reject}>
              Cancel
            </Button>
            <Button onClick={navGuard.accept}>Leave</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
