import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';

const Product = ({ img, slug }) => {
  return (
    <Container>
      <Circle />
      <Image src={img} alt='' />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${slug}`} className='product__link'>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 30;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 28rem;
  height: 35rem;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgProduct};
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bgCircle};
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 20;
`;

const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-white);

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default Product;
