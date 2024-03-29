import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';

const Product = ({ img, slug }) => {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <Container>
      <Circle />
      <Image src={img} alt='' />
      <Info>
        <Icon>
          <ShoppingCartOutlined
            className={
              darkMode ? 'product__icon--dark' : 'product__icon--light'
            }
          />
        </Icon>
        <Icon>
          <Link to={`/product/${slug}`} className='product__link'>
            <SearchOutlined
              className={
                darkMode ? 'product__icon--dark' : 'product__icon--light'
              }
            />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined
            className={
              darkMode ? 'product__icon--dark' : 'product__icon--light'
            }
          />
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
  background-color: ${({ theme }) => theme.bgProdIcon};

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bgProdIconHover};
    transform: scale(1.1);
  }
`;

export default Product;
