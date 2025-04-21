"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/env/client";
import { authClient } from "@/lib/auth-client";
import { deleteRecent } from "@/store/recent-store";
import { LinkAccountProviderType, ListAccount, Nullable } from "@/types";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { setTheme, theme } = useTheme();

  const [listAccounts, setListAccounts] = useState<Nullable<ListAccount[]>>();

  const router = useRouter();
  const topLoader = useTopLoader();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  useEffect(() => {
    const message = searchParams.get("message");

    if (message) {
      toast.success(message);

      router.replace(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/settings`);
    }

    getListAccounts();
  }, []);

  function link({
    provider,
    providerId,
  }: {
    provider: string;
    providerId: LinkAccountProviderType;
  }) {
    authClient.linkSocial({
      provider: providerId,
      callbackURL: `${window.location.href}?tab=account&message=Your account has been successfully linked with ${provider}!`,
    });
  }

  function unlink({
    provider,
    accountId,
    providerId,
  }: {
    provider?: string;
    accountId?: string;
    providerId: LinkAccountProviderType;
  }) {
    authClient
      .unlinkAccount({ accountId, providerId })
      .then(() => {
        toast.success(
          `Your ${provider} account has been successfully unlinked.`,
        );

        getListAccounts();

        router.replace(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/settings`);
      })
      .catch(() => {
        toast.error(
          `We couldn't unlink your ${provider} account at the moment. Please try again later.!`,
        );
      })
      .finally(() => {
        topLoader.done();
        topLoader.remove();
      });
  }

  function getListAccounts() {
    authClient.listAccounts({
      fetchOptions: {
        onSuccess: (res) => {
          const providers = ["Google", "GitHub"];

          const data = providers.map((_provider) => {
            const provider = res.data?.find(
              (p) => p.provider === _provider.toLowerCase(),
            );

            return {
              name: _provider,
              linked: provider?.provider === _provider.toLowerCase(),
              provider: _provider.toLowerCase() as LinkAccountProviderType,
              accountId: provider?.accountId,
            };
          });

          setListAccounts(data);
        },
      },
    });
  }

  function handleLinkAccount({
    name,
    state,
    accountId,
    providerId,
  }: {
    name: string;
    state: boolean;
    accountId?: string;
    providerId: LinkAccountProviderType;
  }) {
    topLoader.start();

    if (state) {
      unlink({ accountId, providerId, provider: name });
    } else {
      link({ providerId, provider: name });
    }
  }

  function handleChangeTheme(value: "system" | "light" | "dark") {
    if (!document.startViewTransition) {
      setTheme(value);

      return;
    }

    document.startViewTransition(() => {
      setTheme(value);
    });
  }

  async function deleteAccount() {
    await authClient.deleteUser({
      callbackURL: "/sing-in",
      fetchOptions: {
        onSuccess: () => {
          deleteRecent();

          setTimeout(() => {
            setTheme("system");
          }, 400);
        },
      },
    });
  }

  return (
    <div className="px-4 lg:px-6">
      <Tabs defaultValue={tab || "display"}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="display">Diplay</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Display</CardTitle>
              <CardDescription className="leading-6">
                Customize how the app looks to match your vibe! You can tweak
                the layout and make sure everything looks just the way you like
                it. Feel
                <br />
                free to adjust it so it feels more personal and comfortable for
                you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card>
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-1 font-medium">Dark Mode</div>
                    <div className="text-muted-foreground text-sm leading-6">
                      Switch to Dark Mode when you’re feeling like a more
                      relaxed vibe or if you're browsing late at night.
                      <br /> It’s easier on the eyes, plus it looks pretty cool!
                      Just toggle it on, and you’re good to go.
                    </div>
                  </div>

                  <div>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="system"
                          value="system"
                          checked={theme === "system"}
                          onClick={() => handleChangeTheme("system")}
                        />
                        <Label htmlFor="system">Device Settings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="dark"
                          value="dark"
                          checked={theme === "dark"}
                          onClick={() => handleChangeTheme("dark")}
                        />
                        <Label htmlFor="dark">Always On</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="light"
                          value="light"
                          checked={theme === "light"}
                          onClick={() => handleChangeTheme("light")}
                        />
                        <Label htmlFor="light">Always Off</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-muted-foreground text-sm">
                    If you choose Device settings, this app will use the mode
                    that’s already selected in this device’s settings.
                  </div>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account</CardTitle>
              <CardDescription className="leading-6">
                Manage your account details here—update your email, change your
                password, or check your personal info anytime. Keep everything
                up to
                <br />
                date to make sure your experience stays smooth and secure. It’s
                your account, so you’re in control!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="mb-6">
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-1 font-medium">Linked Accounts</div>
                    <div className="text-muted-foreground text-sm leading-6">
                      This section allows you to connect your account with
                      third-party services or social media platforms. By linking
                      accounts, you can enable easier login, sync data across
                      platforms, or enhance your user experience with
                      personalized integrations. You’re in control—link or
                      unlink accounts anytime for added flexibility and
                      security.
                    </div>
                  </div>

                  {listAccounts?.map((listAccount) => (
                    <div key={listAccount.accountId}>
                      <Card className="mb-4" key={listAccount.provider}>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 font-semibold">
                              <span>{listAccount.name}</span>
                            </div>
                            <div>
                              <Button
                                onClick={() =>
                                  handleLinkAccount({
                                    name: listAccount.name,
                                    state: listAccount.linked,
                                    accountId: listAccount.accountId,
                                    providerId: listAccount.provider,
                                  })
                                }
                              >
                                {listAccount.linked ? "Unlink" : "Link"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-destructive mb-1 font-medium">
                      Delete Account
                    </div>
                    <div className="text-muted-foreground text-sm leading-6">
                      Thinking of leaving? You can delete your account here, but
                      just a heads up—this action is permanent. Once it&apos;s
                      gone, all your data
                      <br />
                      will be erased, and there’s no turning back. If
                      you&apos;re sure, go ahead and hit the delete button.
                      We&apos;ll miss you, though!
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-destructive hover:bg-destructive font-medium">
                        Delete your account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive"
                          onClick={deleteAccount}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
