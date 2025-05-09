import './shop.styles.scss';

import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/categories.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

export default function ShopPage() {
  const categoriesMap = useSelector(selectCategoriesMap);

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
