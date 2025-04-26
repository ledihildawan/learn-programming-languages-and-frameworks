import * as schema from "@server/db/schema";
import { authClient } from "./lib/auth-client";

export type Note = typeof schema.notes.$inferInsert;

export type Nullable<T = void> = T | null | undefined;

// Auth

export type AuthUser = typeof authClient.$Infer.Session.user;
export type AuthSession = typeof authClient.$Infer.Session.session;

export interface Auth {
  user: Nullable<AuthUser>;
  session: Nullable<AuthSession>;
}

export interface ListAccountsResponseData {
  id: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
}

export type ListAccount = Partial<
  Pick<ListAccountsResponseData, "accountId">
> & {
  name: string;
  linked: boolean;
  provider: LinkAccountProviderType;
};

export type LinkAccountProviderType =
  | "github"
  | "apple"
  | "discord"
  | "facebook"
  | "github"
  | "google"
  | "microsoft"
  | "spotify"
  | "twitch"
  | "twitter"
  | "dropbox"
  | "linkedin"
  | "gitlab"
  | "tiktok"
  | "reddit"
  | "roblox"
  | "vk"
  | "kick";

export interface BreadcrumbItem {
  link: string;
  title: string;
}

export type BreadcrumbStore = BreadcrumbItem[];

export interface DashboardStore {
  notFound: boolean;
}

export interface NavigationGuardStore {
  active: boolean;
  enabled: boolean;
}

export interface Store<T> {
  setState: (updater: (state: T) => T) => void;
}

// Audit Logs
export type AuditLog = typeof schema.auditLogs.$inferSelect;
