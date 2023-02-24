import styled from 'styled-components';

const ScrollToTop = () => {
  return (
    <Container>
      <Wrapper>
        Top
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
`;

const Wrapper = styled.div`
  
`;

export default ScrollToTop;
