"use client";

import { CustomLink } from "@/components/custom-link";
import KataGeneratorButton, {
  KataGenerator,
} from "@/components/kata-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { updateNotFoundDashboard } from "@/store/dashboard-store";
import {
  updateEnabledNavigationGuard,
  updateStateNavigationGuard,
} from "@/store/navigation-guard-store";
import { updateRecent, updateRecentItem } from "@/store/recent-store";
import { updateTopLoader } from "@/store/top-loader-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import MDEditor from "@uiw/react-md-editor";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
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
  const [isFromValuesChange, setIsFormValuesChange] = useState(false);

  const { theme } = useTheme();

  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const topBarLoader = useTopLoader();
  const query = useQuery({
    queryKey: ["note", params.slug],

    queryFn: async ({ signal }) => {
      try {
        const res = await eden.api
          .note({ slug: params.slug })
          .get({ fetch: { signal } });

        if (res.error) {
          throw new Error(res.error);
        }

        defaultValues.title = res.data.data.title;
        defaultValues.content = res.data.data.content;

        updateBreadcrumbs([
          { title: "Notes", link: "/notes" },
          {
            title: res.data?.data.title,
            link: `/notes/${res.data?.data.slug}`,
          },
          {
            title: "Edit",
            link: `/notes/${res.data?.data.slug}/edit`,
          },
        ]);

        updateRecent({ ...res.data.data, viewedAt: new Date() });

        setNextNote(res.data.nextNote);
        setPrevNote(res.data.prevNote);

        return res.data.data;
      } catch (error) {
        const message = (error as Error).message;

        if (message.toLowerCase().includes("not found")) {
          updateNotFoundDashboard(true);
        }
      }
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
      topBarLoader.start();

      toast.success("Note has been successfully updated!");

      updateRecentItem(res!.data!.data);

      router.push(`${env.NEXT_PUBLIC_WEB_URL}/notes`);
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
        setIsFormValuesChange(!isEqual(defaultValues, value));
      }),
    },
    defaultValues: {
      title: query.data?.title || "",
      content: query.data?.content || "",
    },
  });

  const save = () => {
    batch(() => {
      updateTopLoader(true);
      updateStateNavigationGuard({
        active: false,
        enabled: false,
      });
    });

    form.handleSubmit();
  };

  const goToNote = (slug: string) => {
    topBarLoader.start();

    router.push(`${env.NEXT_PUBLIC_WEB_URL}/notes/${slug}/edit`);
  };

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

  const handleGenerated = useCallback((data: KataGenerator) => {
    form.reset();
    form.setFieldValue("title", data.title);
    form.setFieldValue("content", data.content);
  }, []);

  useEffect(() => {
    batch(() => {
      updateTopLoader(!isFromValuesChange);
      updateEnabledNavigationGuard(isFromValuesChange);
    });
  }, [isFromValuesChange]);

  useEffect(() => {
    return () => {
      updateTopLoader(true);
      updateStateNavigationGuard({
        active: false,
        enabled: false,
      });
    };
  }, []);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <CustomLink href="/notes">
              <ArrowLeftIcon />
            </CustomLink>
          </Button>
          <span className="text-xl font-bold">{query.data?.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={save} disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Save
          </Button>
          <KataGeneratorButton onGenerated={handleGenerated} />
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
