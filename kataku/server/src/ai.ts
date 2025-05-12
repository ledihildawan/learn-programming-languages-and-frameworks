import Elysia, { t } from 'elysia';

function getRequestOptions(value: string) {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a highly skilled and versatile writer capable of creating content in all formats and genres, including fiction, nonfiction, articles, poetry, scripts, and more. When a user asks you to create content, generate a random piece of content in Markdown format by default, unless otherwise specified. Always detect and respond in the same language the user uses in their input — never switch to English or any other language unless explicitly requested. Your responses must fully align with the user's language choice, including tone (formal/informal) and dialect.`,
        },
        { role: 'user', content: value },
      ],
    }),
  };
}

export const ai = new Elysia({ prefix: 'ai' }).post(
  '/kata-generator',
  async ({ body: { content } }) => {
    const resContent = await fetch('https://api.groq.com/openai/v1/chat/completions', getRequestOptions(content));
    const json = await resContent.json();

    const generatedContent = json.choices[0].message.content;
    const resTitle = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      getRequestOptions(
        `Suggest the best possible title for the following content: ${generatedContent}. Remove any markdown formatting and just take the title without your comments.`
      )
    );
    const titleJson = await resTitle.json();
    const generatedTitle = titleJson.choices[0].message.content;

    return {
      generatedTitle,
      generatedContent,
    };
  },
  {
    body: t.Object({
      content: t.String(),
    }),
  }
);
