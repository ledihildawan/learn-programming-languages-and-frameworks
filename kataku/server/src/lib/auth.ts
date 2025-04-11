import { WEB_URL } from '@/constants';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, oAuthProxy, openAPI, username } from 'better-auth/plugins';

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

export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [openAPI({ disableDefaultReference: true }), username(), nextCookies(), oAuthProxy(), admin()],
  account: {
    accountLinking: {
      eenabled: true,
      trustedProviders: ['google', 'github'],
    },
  },
  database: drizzleAdapter(db, {
    schema,
    provider: 'pg',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      disableImplicitSignUp: true,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      disableImplicitSignUp: true,
    },
  },
  trustedOrigins: [WEB_URL],
});
