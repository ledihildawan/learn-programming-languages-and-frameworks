import { useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../category-preview/category-preview.component';

export default function CategoriesPreviewPage() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="categories-preview-container">
      {Object.keys(categoriesMap).map((title, idx) => {
        const products = categoriesMap[title];

        return (
          <CategoryPreview
            key={`categories-preview-${idx}`}
            title={title}
            products={products}
          />
        );
      })}
    </div>
  );
}
