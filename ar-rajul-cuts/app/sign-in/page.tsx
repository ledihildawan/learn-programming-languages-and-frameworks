import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function SignInPage() {
  async function signIn(formData: FormData) {
    'use server';

    const username = String(formData.get('username'));
    const password = String(formData.get('password'));

    await auth.api.signInUsername({
      body: { username, password },
      asResponse: true,
    });

    redirect('/note');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={signIn} method="POST">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" name="username" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password" />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don't have an account? &nbsp;
                  <a href="/sign-up" className="underline underline-offset-4">
                    Sign Up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
