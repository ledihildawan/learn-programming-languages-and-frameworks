import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { tag } from './tag';
import { user } from './user';

const app = new Elysia().use(swagger()).use(tag).use(user).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
