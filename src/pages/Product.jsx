import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import { Add, Remove } from '@material-ui/icons';
import axios from 'axios';

import { addProduct } from 'redux/cart/cartSlice';
import { mobile, tabLand } from 'responsive';
import { getProductBySlug } from 'services/productService';
import Spinner from 'components/Spinner';

const Product = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const slug = pathname.split('/')[2];

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  useEffect(() => {
    slug && (async () => {
      setLoading(true);
      const { token, cancel } = axios.CancelToken.source();
        const {
          data: { product },
        } = await getProductBySlug(slug, token);

        setProduct(product);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          console.log(err);
        }
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <Container type='loading'>
        <SpinnerWrapper>
          <Spinner size='lg' />
        </SpinnerWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt='' />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.desc}</Description>
          <Price>
            <NumericFormat
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((item) => {
                return (
                  <FilterColor
                    key={item}
                    color={item}
                    onClick={() => setColor(item)}
                  />
                );
              })}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product?.size?.map((item) => {
                  return (
                    <FilterSizeOption key={item} value={item}>
                      {item}
                    </FilterSizeOption>
                  );
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => handleQuantity('dec')}
                style={{ cursor: 'pointer' }}
              />
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => handleQuantity('inc')}
                style={{ cursor: 'pointer' }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>Add to cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: ${({ type }) => type === 'loading' && '100vh'};
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;

  ${tabLand({
  padding: '1rem',
  flexDirection: 'column',
  marginBottom: '4rem',
})}
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  display: block;
  object-fit: cover;

  ${tabLand({ height: '70vh' })}

  ${mobile({ height: '40vh' })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 5rem;

  ${mobile({ padding: '1rem' })}
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 200;
  text-transform: capitalize;

  ${mobile({
  fontSize: '3rem',
  fontWeight: 100,
})}
`;

const Description = styled.p`
  font-size: 2rem;
  margin: 2rem 0;

  ${mobile({
  fontSize: '1.7rem',
  margin: '1rem 0',
})}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 4rem;

  ${mobile({ fontSize: '3rem' })}
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${tabLand({ width: '80%' })}

  @media only screen and (max-width: 41.69em) {
    width: 100%;
  }

  ${mobile({ width: '100%' })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  text-transform: capitalize;
  font-size: 2rem;
  font-weight: 200;

  ${mobile({ fontSize: '1.7rem' })}
`;

const FilterColor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 0.5rem;
  cursor: pointer;

  ${mobile({
  width: '1.7rem',
  height: '1.7rem',
  margin: '0 0.3rem',
})}
`;

const FilterSize = styled.select`
  margin-left: 1rem;
  padding: 0.5rem;
  background-color: transparent;
  color: currentColor;
  border: 1px solid ${({ theme }) => theme.sizeBorder};
  outline-color: ${({ theme }) => theme.text};
`;

const FilterSizeOption = styled.option`
  background-color:  ${({ theme }) => theme.bgOption};
`;

const AddContainer = styled.div`
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 57.19em) {
    width: 80%;
  }

  @media only screen and (max-width: 41.69em) {
    width: 100%;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.6rem;

  ${mobile({ fontSize: '1.4rem' })}
`;

const Amount = styled.span`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  border: 1px solid #008080;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;

  ${mobile({
  width: '2.7rem',
  height: '2.7rem',
})}
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.bgProdBtn};
  color: ${({ theme }) => theme.textProdBtn};
  border: 2px solid #008080;
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  ${mobile({
  fontWeight: 300,
  padding: '1.3rem',
  border: '1px solid currentColor',
})}

  &:hover {
    background-color: ${({ theme }) => theme.bgProdBtnHover};
    -webkit-box-shadow: ${({ theme }) => theme.boxProd};
    -moz-box-shadow: ${({ theme }) => theme.boxProd};
    box-shadow: ${({ theme }) => theme.boxProd};
  }
`;

export default Product;
