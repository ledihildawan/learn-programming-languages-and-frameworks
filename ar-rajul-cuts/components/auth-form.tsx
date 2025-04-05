'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useToast } from '../hooks/use-toast';

export function AuthForm({ className, type, ...props }: React.ComponentPropsWithoutRef<'div'> & { type: string }) {
  const nav = useRouter();

  const { toast } = useToast();
  const { data: session } = authClient.useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const isSignInType = useMemo(() => type === 'sign-in', [type]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      nav.push('/sign-in');
    }

    if (type === 'sign-in') {
      await authClient.signIn.username(
        {
          username,
          password,
          rememberMe: false,
        },
        {
          onRequest: () => {
            setIsPending(true);
          },
          onSuccess: ({ data }) => {
            toast({
              title: 'Success',
              description: data.message,
            });

            nav.push('/note');

            setIsPending(false);
          },
          onError: ({ error }) => {
            toast({
              variant: 'destructive',
              title: 'Something went wrong.',
              description: error.message,
            });

            setIsPending(false);
          },
        }
      );
    } else {
      await authClient.signUp.email(
        {
          name: '',
          email: 'lhildawan@gmail.com',
          username,
          password,
        },
        {
          onRequest: () => {
            setIsPending(true);
          },
          onSuccess: ({ data }) => {
            toast({
              title: 'Success',
              description: data.message,
            });

            nav.push('/sign-in');

            setIsPending(false);
          },
          onError: ({ error }) => {
            toast({
              variant: 'destructive',
              title: error.code,
              description: error.message,
            });

            setIsPending(false);
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

              <Button type="submit" className="w-full" disabled={isPending}>
                {isSignInType ? 'Sign In' : 'Sign Up'}
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
