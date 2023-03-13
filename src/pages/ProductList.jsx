import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { mobile, tabLand } from 'responsive';
import Products from 'components/Products';
import Newsletter from 'components/Newsletter';
import { getUnique } from 'utils';
import { fetchProducts } from 'redux/products/productSlice';

const ProductList = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = ({ target: input }) => {
    const { name, value } = input;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let colors = getUnique(products, 'color');
  colors = colors.map((color, index) => {
    return (
      <Option key={index} value={color}>{color}</Option>
    );
  });

  return (
    <Container>
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled defaultValue>
              Color
            </Option>
            {colors}
          </Select>
          <Select name='size' onChange={handleFilters}>
            <Option disabled defaultValue>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value='newest' defaultValue>
              Newest
            </Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products
        category={category}
        filters={filters}
        sort={sort}
      />
      <Newsletter />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
  padding-top: 1px;
`;

const Title = styled.h1`
  text-transform: capitalize;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.textCat};
  margin: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 2rem;

  ${tabLand({ margin: '0 1rem' })}

  ${mobile({
  margin: '0 2rem',
  display: 'flex',
  flexDirection: 'column',
})}
`;

const FilterText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => theme.textCat};
  margin-right: 2rem;

  ${tabLand({ marginRight: '1rem' })}

  ${mobile({ marginRight: 0 })}
`;

const Select = styled.select`
  padding: 1rem;
  margin-right: 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textCat};
  border: 1px solid ${({ theme }) => theme.borderFilter};
  outline-color: ${({ theme }) => theme.text};

  ${mobile({ margin: '1rem 0' })}
`;

const Option = styled.option`
  background-color: ${({ theme }) => theme.bgOption};
`;

export default ProductList;
