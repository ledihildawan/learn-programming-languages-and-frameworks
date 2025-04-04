'use client';

import { useAuth } from '@/contexts/auth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
