import { authClient } from "./lib/auth-client";

export type Nullable<T = void> = T | null | undefined;

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
