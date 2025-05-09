import './category-preview.styles.scss';

import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

export default function CategoryPreviewComponent({ title, products }) {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={`/shop/${title}`}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((product, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={`preview-${product.id}`} product={product} />
          ))}
      </div>
    </div>
  );
}
