import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Product from './Product';
import { getProducts } from 'services/productService';
import axios from 'axios';

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts(category);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((products) =>
        [...products].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((products) =>
        [...products].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((products) =>
        [...products].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => {
          const { _id: id } = item;
          return <Product key={id} {...item} />;
        })
        : products.slice(0, 8).map((item) => {
          const { _id: id } = item;
          return <Product key={id} {...item} />;
        })}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bg};
`;

export default Products;
