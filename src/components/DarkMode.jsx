import styled from 'styled-components';

const DarkMode = () => {
  return (
    <Container>
      DarkMode
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 1%;
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.bgMode};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxMode};
  z-index: 3000;
`;

export default DarkMode;
