import { db } from '@/db';
import * as schema from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI, username } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    openAPI({ disableDefaultReference: true }),
    username(),
    //   magicLink({
    //     sendMagicLink: async ({ email, token, url }, request) => {
    //       // send email to user
    //     },
    //   }),
  ],
  trustedOrigins: ['http://localhost:32462'],
});

export async function getBetterAuthOpenAPIDocumentation() {
  const betterAuthOpenAPISchema = (await auth.api.generateOpenAPISchema()) as any;

  delete betterAuthOpenAPISchema.info;
  delete betterAuthOpenAPISchema.servers;
  delete betterAuthOpenAPISchema.tags.at(0).description;

  betterAuthOpenAPISchema.tags.forEach((tag) => {
    tag.name = 'auth';
  });

  for (let path in betterAuthOpenAPISchema.paths) {
    const updatedPath = 'api/auth' + path;

    betterAuthOpenAPISchema.paths[updatedPath] = betterAuthOpenAPISchema.paths[path];

    delete betterAuthOpenAPISchema.paths[path];

    if (betterAuthOpenAPISchema.paths[updatedPath].post) {
      betterAuthOpenAPISchema.paths[updatedPath].post.tags = ['auth'];
    }

    if (betterAuthOpenAPISchema.paths[updatedPath].get) {
      betterAuthOpenAPISchema.paths[updatedPath].get.tags = ['auth'];
    }
  }

  const schemaComponents = betterAuthOpenAPISchema.components.schemas;

  const updatedSchemas = {};

  for (let schemaName in schemaComponents) {
    const camelCaseSchemaName = schemaName.charAt(0).toLowerCase() + schemaName.slice(1);

    updatedSchemas[camelCaseSchemaName] = schemaComponents[schemaName];
  }

  betterAuthOpenAPISchema.components.schemas = updatedSchemas;

  return betterAuthOpenAPISchema;
}
