'use client';

import { ChevronUp } from 'lucide-react';
import { useCallback, useState } from 'react';
import readable from 'readable-numbers';
import { Card, CardContent } from './ui/card';

interface Product {
  id: number;
  title: string;
  description: string;
  url: string;
  votes: number;
  submitterAvatarUrl: string;
  productImageUrl: string;
  readableVotes?: string;
}

function generateVoteCount() {
  return Math.floor(Math.random() * (417200000 - 0 + 1)) + 0;
}

const seedProducts: Product[] = [
  {
    id: 1,
    title: 'Yellow Pail',
    description: 'On-demand sand castle construction expertise.',
    url: '#',
    votes: generateVoteCount(),
    submitterAvatarUrl: 'https://robohash.org/daniel?bgset=bg1',
    productImageUrl: 'https://picsum.photos/116/116?random=1',
  },
  {
    id: 2,
    title: 'Supermajority: The Fantasy Congress League',
    description: 'Earn points when your favorite politicians pass legislation.',
    url: '#',
    votes: generateVoteCount(),
    submitterAvatarUrl: 'https://robohash.org/kristy?bgset=bg1',
    productImageUrl: 'https://picsum.photos/116/116?random=2',
  },
  {
    id: 3,
    title: 'Tinfoild: Tailored tinfoil hats',
    description: 'We already have your measurements and shipping address.',
    url: '#',
    votes: generateVoteCount(),
    submitterAvatarUrl: 'https://robohash.org/veronika?bgset=bg1',
    productImageUrl: 'https://picsum.photos/116/116?random=3',
  },
  {
    id: 4,
    title: 'Haught or Naught',
    description: 'High-minded or absent-minded? You decide.',
    url: '#',
    votes: generateVoteCount(),
    submitterAvatarUrl: 'https://robohash.org/molly?bgset=bg1',
    productImageUrl: 'https://picsum.photos/116/116?random=4',
  },
];

function Product({
  id,
  title,
  description,
  url,
  submitterAvatarUrl,
  productImageUrl,
  readableVotes,
  onVote,
}: Omit<Product, 'votes'> & { onVote: (productId: number) => void }) {
  return (
    <Card>
      <CardContent className="flex gap-4">
        <div>
          <img className="size-[116px]" src={productImageUrl} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div onClick={() => onVote(id)}>
              <ChevronUp />
            </div>
            <span className="font-bold">{readableVotes}</span>
          </div>
          <div className="description">
            <a href={url} className="text-blue-400 font-bold">
              {title}
            </a>
            <p className="mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Submitted by:</span>
            <img src={submitterAvatarUrl} className="size-4 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState(() => {
    return seedProducts.map((seedProduct) => ({
      ...seedProduct,
      readableVotes: readable(seedProduct.votes),
    }));
  });

  const handleProductUpVote = useCallback((productId: number) => {
    const newProducts = structuredClone(products).map((product) => {
      if (product.id === productId) {
        const updatedProduct = {
          ...product,
          votes: product.votes + 1,
          readableVotes: readable(product.votes + 1),
        };

        return updatedProduct;
      }

      return product;
    });

    setProducts(newProducts);
  }, []);

  const productComponents = products
    .sort((a, b) => b.votes - a.votes)
    .map((product) => (
      <Product
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        readableVotes={product.readableVotes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={handleProductUpVote}
      />
    ));

  return <div className="grid gap-4">{productComponents}</div>;
}
