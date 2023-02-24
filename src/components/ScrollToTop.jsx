import styled from 'styled-components';

const ScrollToTop = () => {
  return (
    <Container>
      <IconWrapper>
        Top
      </IconWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bgAnnounce};
`;

export default ScrollToTop;
