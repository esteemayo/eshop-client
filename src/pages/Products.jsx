import styled from 'styled-components';

const Products = () => {
  return (
    <Container>
      <Wrapper>
        <Left>left</Left>
        <Right>right</Right>
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

const Right = styled.div`
  flex: 2;
  background-color: tomato;
`;

export default Products;
