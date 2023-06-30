import categories from '../../data/categories.json';

import { DirectoryContainer } from './directory.styles';

import DirectoryItem from '../directory-item/directory-item.component';

function Categories() {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem {...category} key={`category-${category.id}`} />
      ))}
    </DirectoryContainer>
  );
}

export default Categories;
