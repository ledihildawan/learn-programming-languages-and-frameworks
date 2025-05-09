import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { article } from './article';
import { tag } from './tag';
import { user } from './user';

const app = new Elysia().use(swagger()).use(tag).use(user).use(article).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
