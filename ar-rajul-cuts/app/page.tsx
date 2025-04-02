import { api } from '@/lib/api';

export default async function HomePage() {
  const hello = await api['ip-1'].get();

  return <h1>{JSON.stringify(hello)}</h1>;
}
