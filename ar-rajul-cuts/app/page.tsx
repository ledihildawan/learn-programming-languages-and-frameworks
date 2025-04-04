import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const token = (await cookies()).get('token');

  if (!token) redirect('/sign-in');

  return <h1>Dashboard</h1>;
}
