import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Product from 'components/Product';
import { getProducts } from 'services/productService';

const Products = () => {
  const [price, setPrice] = useState(0);
  const [filters, setFilters] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const allCategories = getUnique(products, 'categories');
  const sizes = getUnique(products, 'size');
  const colors = getUnique(products, 'color');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        const price = Math.max(...data.products.map((item) => item.price));

        setPrice(price);
        setMaxPrice(price);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    tempProducts = tempProducts.filter((item) => item.price <= parseInt(price));

    tempProducts = tempProducts.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)
      )
    );

    setFilteredProducts(tempProducts);
  }, [price, products, filters]);

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
                {allCategories.map((item, index) => {
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
