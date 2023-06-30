import { useNavigate } from 'react-router-dom';
import {
  Body,
  DirectoryItemContainer,
  BackgroundImage,
} from './directory-item.styles';

interface Props {
  title: string;
  imageUrl: string;
  route: string;
}

function CategoryItem({ title, imageUrl, route }: Props) {
  const navigate = useNavigate();

  return (
    <DirectoryItemContainer onClick={() => navigate(route)}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default CategoryItem;
