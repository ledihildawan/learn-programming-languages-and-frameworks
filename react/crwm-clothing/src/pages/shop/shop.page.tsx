import './shop.styles.scss';

import { useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';

export default function ShopPage() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title, idx) => {
        const products = categoriesMap[title];

        return (
          <CategoryPreview
            key={`category-preview-${idx}`}
            title={title}
            products={products}
          />
        );
      })}
    </div>
  );
}
