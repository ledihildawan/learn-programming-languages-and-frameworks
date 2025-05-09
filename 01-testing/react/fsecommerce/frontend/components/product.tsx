import { Product as ProductStyle } from '../styles';

import Link from 'next/link';

export default function Product({ product }: any) {
  const { title, price, image, slug } = product.attributes;

  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>${price}</h3>
    </ProductStyle>
  );
}
