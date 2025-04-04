'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function NewNotePage() {
  const [data, setData] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Note</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Textarea
            className="h-[144px]"
            placeholder="Type your note here."
            onChange={(e) => setData(e.target.value.trim())}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!data}>
          {/* <Loader2 className="animate-spin" /> */}
          Add Note
        </Button>
      </CardFooter>
    </Card>
  );
}
