import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Product from 'components/Product';
import { getProducts } from 'services/productService';

const getUnique = (items, value) => {
  const newItems = items.map((item) => item[value]).flat();
  return [...new Set(newItems)];
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allCategories = getUnique(products, 'categories');
  const size = getUnique(products, 'size');
  const color = getUnique(products, 'color');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Form>
            <FormGroup>
              <Label htmlFor='categories'>Categories</Label>
              <Select id='categories' name='categories'>
                {allCategories.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>;
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='size'>Size</Label>
              <Select id='size' name='size'>
                {size.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='color'>Color</Label>
              <Select id='color' name='color'>
                {color.map((item, index) => {
                  return <Option key={index} value={item}>{item}</Option>
                })}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Price</Label>
              <Input
                type='range'
                id='price'
                name='price'
                min={0}
                max={1000}
              />
            </FormGroup>
          </Form>
        </Left>
        <Right>
          {products.map((item) => {
            return <Product key={item._id} {...item} />
          })}
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
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
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  padding: 3rem;
`;

export default Products;
