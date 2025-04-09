'use client';

import { authClient } from '@/lib/auth';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {}, [authClient.getSession().then(console.log)]);

  return (
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aspernatur consectetur odio beatae corrupti, sint
      nesciunt iste eum eveniet laborum fuga nihil assumenda officia id laboriosam deserunt, vero quas voluptate!
    </h1>
  );
}
