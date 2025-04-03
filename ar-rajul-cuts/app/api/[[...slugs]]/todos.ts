import Elysia, { t } from 'elysia';

export const todoSchema = t.Object({
  id: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  createdById: t.String(),
  title: t.String(),
  description: t.Optional(t.String()),
  assignedAt: t.Optional(t.Date()),
  completedAt: t.Optional(t.Date()),
  SubtaskIds: t.Array(t.String()),
  ParentTaskIds: t.Array(t.String()),
});

export const todoService = new Elysia({ name: 'todos/service' }).model({
  todo: todoSchema,
});

export const todoRouter = new Elysia({ prefix: '/todos', tags: ['todos'] })
  .use(todoService)
  .get(
    '/',
    () => {
      return [
        {
          id: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdById: '1',
          title: 'Todo 1',
          description: 'Description 1',
          assignedAt: new Date(),
          completedAt: new Date(),
          SubtaskIds: ['1', '2', '3'],
          ParentTaskIds: ['1', '2', '3'],
        },
      ];
    },
    {
      response: t.Array(todoSchema),
      query: t.Object({
        userId: t.String(),
      }),
    }
  )
  .get('/:id', ({ params: { id } }) => id, {
    params: t.Object({
      // id: t.RegExp(/^\d+$/),
      id: t.String({ format: 'regex', pattern: '^\\d+$' }),
    }),
  });
