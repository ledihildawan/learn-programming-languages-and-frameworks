import { Elysia, t } from 'elysia';
import { db } from './db';
import { table } from './db/schema';

class Tag {
  data: string[] = [];

  constructor(data: string[] = ['reactjs', 'angularjs']) {
    this.data = data;
  }

  add(tag: string) {
    this.data.push(tag);

    return this.add;
  }

  remove(index: number) {
    return this.data.splice(index, 1);
  }

  update(index: number, tag: string) {
    return (this.data[index] = tag);
  }
}

export const tag = new Elysia({ prefix: 'tags' })
  .decorate('tag', new Tag())
  .get('/', async () => {
    const tags = await db.select().from(table.tag);

    return {
      tags: tags.map((tag) => tag.name),
    };
  })
  .post(
    '/',
    ({ body }) => {
      return body;
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
          error: 'Name is required',
        }),
      }),
    }
  );
