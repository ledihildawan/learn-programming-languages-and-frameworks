import { auth } from '@/lib/auth';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { Context, Elysia } from 'elysia';
import { note } from './note';
import { user } from './user';

async function getBetterAuthDocumentation() {
  const betterAuthOpenAPISchema = await auth.api.generateOpenAPISchema();

  delete betterAuthOpenAPISchema.info;

  betterAuthOpenAPISchema.tags.forEach((tag) => {
    if (tag.name === 'Default') {
      tag.name = 'auth';
    }
  });

  for (let path in betterAuthOpenAPISchema.paths) {
    const updatedPath = 'api' + path;

    betterAuthOpenAPISchema.paths[updatedPath] = betterAuthOpenAPISchema.paths[path];

    delete betterAuthOpenAPISchema.paths[path];

    if (betterAuthOpenAPISchema.paths[updatedPath].post) {
      betterAuthOpenAPISchema.paths[updatedPath].post.tags = ['auth'];
    }
    if (betterAuthOpenAPISchema.paths[updatedPath].get) {
      betterAuthOpenAPISchema.paths[updatedPath].get.tags = ['auth'];
    }
  }

  return betterAuthOpenAPISchema;
}

const test = await getBetterAuthDocumentation();

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];

  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.error(405);
  }
};

export const api = new Elysia({ prefix: '/api' })
  .use(opentelemetry())
  .use(
    swagger({
      documentation: test,
    })
  )
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :(';

    console.error(error);
  })
  .all('/auth/*', betterAuthView)
  .use(user)
  .use(note);

export type API = typeof api;

export const GET = api.handle;
export const PUT = api.handle;
export const POST = api.handle;
export const PATCH = api.handle;
export const DELETE = api.handle;
