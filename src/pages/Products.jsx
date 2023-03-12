import styled from 'styled-components';

import { products } from 'data';
import Product from 'components/Product';

const Products = () => {
  return (
    <Container>
      <Wrapper>
        <Left>left</Left>
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
  background-color: yellowgreen;
`;

const Form = styled.form`

`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
`;

export default Products;
