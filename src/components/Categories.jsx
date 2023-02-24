import styled from 'styled-components';

import { mobile } from 'responsive';
import { categories } from 'data';
import CategoryItem from './CategoryItem';

const Categories = () => {
  return (
    <Container>
      {categories?.map((item) => {
        const { id } = item;
        return <CategoryItem key={id} {...item} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bg};
  padding: 2rem;

  ${mobile({
  flexDirection: 'column',
  padding: 0,
})}
`;

export default Categories;
