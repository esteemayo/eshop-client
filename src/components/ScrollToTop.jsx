import styled from 'styled-components';
import { KeyboardArrowUpOutlined } from '@material-ui/icons';
import { useCallback, useEffect, useState } from 'react';

import { mobile } from 'responsive';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibilityHandler = useCallback(() => {
    setIsVisible(window.scrollY > 300 ? true : false);
  }, []);

  const handleScroll = useCallback((e) => {
    e.stopPropagation();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibilityHandler);
    return () =>
      document.removeEventListener('scroll', toggleVisibilityHandler);
  }, [toggleVisibilityHandler]);

  return (
    <Container>
      {isVisible && (
        <IconWrapper onClick={handleScroll}>
          <KeyboardArrowUpOutlined style={{ fontSize: '2rem' }} />
        </IconWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
  z-index: 3000;
  animation: fadeIn 700ms ease-in-out 1s both;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bgScrollBtn};
  color: ${({ theme }) => theme.textScrollBtn};
  box-shadow: ${({ theme }) => theme.boxScroll};
  border-radius: 2rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  ${mobile({
    width: '3.5rem',
    height: '3.5rem',
  })}

  &:hover {
    background-color: ${({ theme }) => theme.bgScrollBtnHover};
  }
`;

export default ScrollToTop;
