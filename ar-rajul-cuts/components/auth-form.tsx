'use client';

import { API } from '@/app/api/[[...slugs]]/route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { URL_API } from '@/constants';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { treaty } from '@elysiajs/eden';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useToast } from '../hooks/use-toast';

export function AuthForm({ className, type, ...props }: React.ComponentPropsWithoutRef<'div'> & { type: string }) {
  const nav = useRouter();

  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const signInMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      treaty<API>(URL_API).api.user['sign-in'].post({ username, password }, { fetch: { credentials: 'include' } }),
    onSuccess: () => {
      if (!session) {
        nav.push('/admin');
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      treaty<API>(URL_API).api.user['sign-up'].put({ username, password }),
  });

  const isSignInType = useMemo(() => type === 'sign-in', [type]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    // const req = isSignInType ? signInMutation : signUpMutation;
    // const res = await req.mutateAsync({ password, username });

    // if (res.error?.value) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Something went wrong.',
    //     description: res.error.value.message,
    //   });
    // } else {
    //   toast({
    //     title: res.data?.message,
    //     description: res.data?.message,
    //   });
    // }

    // if (!isSignInType && !res.error?.value) {
    //   nav.push('/sign-in');
    // }

    if (type === 'sign-in') {
      const { data, error } = await authClient.signIn.email(
        {
          /**
           * The user email
           */
          email: 'lhildawan@gmail.com',
          /**
           * The user password
           */
          password: 'ledihildawan',
          /**
           * remember the user session after the browser is closed.
           * @default true
           */
          rememberMe: false,
        },
        {
          onSuccess: (ctx) => {
            nav.push('/admin');
          },
        }
      );
    } else {
      const { data, error } = await authClient.signUp.email(
        {
          email: 'lhildawan@gmail.com', // user email address
          password: 'ledihildawan', // user password -> min 8 characters by default
          name: 'Ledi Hildawan', // user display name
          callbackURL: '/', // a url to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{isSignInType ? 'Sign In' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {type === 'sign-in'
              ? 'Enter your email below to login to your account'
              : 'Enter your email below to create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  name="username"
                  onChange={(e) => setUsername(e.target.value.trim())}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSignInType ? signInMutation.isPending : signUpMutation.isPending}
              >
                {isSignInType ? 'Sign In' : 'Sing Up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isSignInType ? "Don't have an account? " : 'Have an account? '}
              <Link href={isSignInType ? '/sign-up' : '/sign-in'} className="underline underline-offset-4">
                {isSignInType ? 'Sign Up' : 'Sign in'}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
