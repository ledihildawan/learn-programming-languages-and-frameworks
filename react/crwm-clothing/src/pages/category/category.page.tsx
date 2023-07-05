import './category.styles.scss';

import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

export default function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  const categoriesMap = useSelector(selectCategoriesMap);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products.map((product, idx) => (
            <ProductCard
              key={`category-${category}-${product.id}`}
              product={product}
            />
          ))}
      </div>
    </>
  );
}
