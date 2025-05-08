type Languages = {
  de: URL;
  en: URL;
  pt: URL;
  es: URL;
  fr: URL;
  ja: URL;
};

type URLList = {
  [x: string]: URL;
};

const languages: Languages = {
  de: new URL('/de', 'https://example.com'),
  en: new URL('/en', 'https://example.com'),
  pt: new URL('/pt', 'https://example.com'),
  es: new URL('/es', 'https://example.com'),
  fr: new URL('/fr', 'https://example.com'),
  ja: new URL('/ja', 'https://example.com'),
};

function isAvailable<Obj extends Languages>(obj: Obj, key: string | number | symbol): key is keyof Obj {
  return key in obj;
}

function fetchFile<List extends URLList, Keys extends keyof List>(urls: List, keys: Keys[]) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => {
        const entry: [keyof List, any] = [el, data];

        return entry;
      })
  );

  return els;
}

const de_and_fr = fetchFile(languages, ['de', 'fr']);

(async () => {
  for await (const entry of de_and_fr) {
    const result = entry;
    if (result[0] === 'en') {
    }
  }
})();

function identity<T>(t: T): T {
  return t;
}

function pairs<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
