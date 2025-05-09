'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <div>ThemeSwitcher</div>;
}

export default ThemeSwitcher;
