import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DarkMode = () => {
  return (
    <Container>
      <Wrapper>
        dark
      </Wrapper>
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  -webkit-box-shadow: ${({ theme }) => theme.boxMode};
  -moz-box-shadow: ${({ theme }) => theme.boxMode};
  box-shadow: ${({ theme }) => theme.boxMode};
  z-index: 3000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color:  ${({ theme }) => theme.bgIconMode};
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: 0.2rem;
  border: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: all 200ms ease-in;
`;

export default DarkMode;
