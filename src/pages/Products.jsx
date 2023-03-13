import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Product from 'components/Product';
import { getUnique } from 'utils';
import { fetchProducts, filterProducts, reset } from 'redux/products/productSlice';
import Spinner from 'components/Spinner';
import { mobile, small } from 'responsive';

const Products = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, isFetching, minPrice, maxPrice, price: newPrice } =
    useSelector((state) => state.products);

  const [filters, setFilters] = useState({});
  const [price, setPrice] = useState(newPrice);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const categories = getUnique(products, 'categories');
  const sizes = getUnique(products, 'size');
  const colors = getUnique(products, 'color');

  useEffect(() => {
    dispatch(fetchProducts());
    return () => dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts({ filters, price }));
  }, [price, filters, dispatch]);

  if (isFetching) {
    return (
      <Container type='loading'>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Form>
            <FormGroup>
              <Label htmlFor='categories'>Categories</Label>
              <Select
                id='categories'
                name='categories'
                onChange={handleChange}
                option='cat'
              >
                {categories.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>;
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='size'>Size</Label>
              <Select id='size' name='size' onChange={handleChange}>
                {sizes.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='color'>Color</Label>
              <Select
                id='color'
                name='color'
                onChange={handleChange}
                option='color'
              >
                {colors.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Product Price ({price})</Label>
              <Input
                type='range'
                id='price'
                name='price'
                value={price}
                min={minPrice}
                max={maxPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Left>
        <Right>
          {filteredProducts.map((item) => {
            return <Product key={item._id} {...item} />;
          })}
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding-top: ${({ type }) => type && '10rem'};
`;

const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 3.2rem;
  text-align: center;
  text-transform: uppercase;

  ${mobile({ fontSize: '2.7rem' })}

  ${small({ fontSize: '2.5rem' })}
`;

const Left = styled.div`
  flex: 1;
  padding: 3rem;
  background-color: ${({ theme }) => theme.bgFilter};
`;

const Form = styled.form``;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.4rem;
  color: #999;
`;

const Select = styled.select`
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  text-transform: ${({ option }) => option && 'capitalize'};
  width: 20rem;
  padding: 1rem 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textCat};
  border: 1px solid ${({ theme }) => theme.borderFilter};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.text};
`;

const Option = styled.option`
  background-color: ${({ theme }) => theme.bgOption};
`;

const Input = styled.input`
  display: inline-block;
  width: 20rem;
  outline-color: ${({ theme }) => theme.text};
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  padding: 3rem;
`;

export default Products;
