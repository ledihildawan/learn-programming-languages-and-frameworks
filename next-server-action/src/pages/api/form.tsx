import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const { todoItem } = req.body;

    if (!todoItem) {
      // fail fast
    }

    try {
      // save todo item to database
    } catch (error) {
      // handle error
    }
  } else {
    // handle req.methong != POST
  }
}
