import styled from 'styled-components';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { mobile } from 'responsive';
import { toggle } from 'redux/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <Container>
      <Wrapper onClick={() => dispatch(toggle())}>
        {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
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

  ${mobile({
    width: '4rem',
    height: '4rem',
  })}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgIconMode};
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: 0.2rem;
  border: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: all 200ms ease-in;

  ${mobile({
    width: '3.5rem',
    height: '3.5rem',
  })}

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.textMode};

    ${mobile({ fontSize: '2rem' })}
  }
`;

export default DarkMode;
