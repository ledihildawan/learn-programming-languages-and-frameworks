'use server';

import { createClient } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const addTodo = async (formData: FormData) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const todoItem = formData.get('todo');

  if (!todoItem) {
    return;
  }
  // Save todo item to database
  const { data, error } = await supabase.from('todos').insert({
    todo: todoItem,
  });

  revalidatePath('/');
};

export default async function deleteTodo(id) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('todos').delete().eq('id', id);

  revalidatePath('/');
}
