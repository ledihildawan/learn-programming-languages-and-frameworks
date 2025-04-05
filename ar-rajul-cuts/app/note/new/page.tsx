'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppForm } from '@/components/ui/tanstack-form';
import { App } from '@/server';
import { treaty } from '@elysiajs/eden';
import MDEditor from '@uiw/react-md-editor';
import { redirect } from 'next/navigation';
import { FormEvent, useCallback } from 'react';
import { z } from 'zod';

export const server = treaty<App>(`http://localhost:${process.env.SERVER_PORT || 44720}`, {
  fetch: { credentials: 'include' },
});

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  content: z.string().min(2, {
    message: 'Content must be at least 2 characters.',
  }),
});

export default function NewNotePage() {
  const form = useAppForm({
    defaultValues: {
      title: '',
      content: '',
    },
    onSubmit: async ({ value }) => {
      await server.api.note.index.post(value);

      redirect('/note');
    },
  });

  const handleSubmit = useCallback(
    <T,>(e: FormEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();

      form.handleSubmit();
    },
    [form]
  );

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill in the title and content of your note. Click "Add Note" to save it.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <form.AppField
                name="title"
                validators={{
                  onChange: FormSchema.shape.title,
                }}
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Note Title</field.FormLabel>
                    <field.FormControl>
                      <Input
                        id="title"
                        placeholder="Enter your note title here."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="content"
                validators={{
                  onChange: FormSchema.shape.content,
                }}
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Note Content</field.FormLabel>
                    <field.FormControl>
                      <MDEditor
                        value={field.state.value}
                        onChange={(value) => field.handleChange(value as string)}
                        preview="edit"
                        height={300}
                        style={{ overflow: 'hidden' }}
                        textareaProps={{
                          placeholder: 'Type your note content here.',
                        }}
                        previewOptions={{
                          disallowedElements: ['style'],
                        }}
                        defaultValue={field.state.value}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Note</Button>
          </CardFooter>
        </Card>
      </form>
    </form.AppForm>
  );
}
