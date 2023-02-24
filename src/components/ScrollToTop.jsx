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
  z-index: 3000;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bgAnnounce};
  color: ${({ theme }) => theme.textAnnounce};
  box-shadow: rgb(0, 0, 0, 0.25) 0 0.4rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
`;

export default ScrollToTop;
