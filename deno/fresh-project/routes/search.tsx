import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES: string[] = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(_req, _ctx) {
    const url: URL = new URL(_req.url);
    const query: string = url.searchParams.get('q') || '';
    const results: string[] = NAMES.filter((name: string) => name.includes(query));

    return _ctx.render({ results, query });
  }
}

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;

  return (
    <div>
      <form>
        <input type="text" name="q" value={query} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  )
}