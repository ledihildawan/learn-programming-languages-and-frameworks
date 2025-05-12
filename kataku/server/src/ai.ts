import Elysia, { t } from 'elysia';

export const ai = new Elysia({ prefix: 'ai' }).post(
  '/summarize',
  async ({ body }) => {
    const { content } = body;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'Kamu adalah asisten ringkasan.' },
          { role: 'user', content: `Ringkas catatan ini:\n\n${content}` },
        ],
      }),
    });
    const data = await res.json();

    return {
      data,
    };
  },
  {
    body: t.Object({
      content: t.String(),
    }),
  }
);
