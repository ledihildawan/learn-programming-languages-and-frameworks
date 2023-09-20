'use client';

import { PRODUCT_QUERY } from '@/lib/query';
import { Gallery } from '@/styles';
import { Suspense } from 'react';
import { useQuery } from '@urql/next';

import Product from '../components/product';
import Skeleton from 'react-loading-skeleton';

export default function Home() {
  const [{ data, fetching, error }] = useQuery({ query: PRODUCT_QUERY });

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  if (fetching) {
    return <p>Loading...</p>;
  }

  const products = data.products.data;

  return (
    <Suspense>
      <Gallery>
        {fetching && <Skeleton />}
        {products.map((product: any) => (
          <Product key={product.attributes.slug} product={product} />
        ))}
      </Gallery>
    </Suspense>
  );
}
