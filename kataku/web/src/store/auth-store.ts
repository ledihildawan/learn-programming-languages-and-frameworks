import { Auth } from "@/types";
import { Store } from "@tanstack/store";

export const authStore = new Store<Auth>({
  user: null,
  session: null,
});
