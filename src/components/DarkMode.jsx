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
  width: 4.5rem;
  height: 4.5rem;
  background-color: ${({ theme }) => theme.bgMode};
`;

export default DarkMode;
