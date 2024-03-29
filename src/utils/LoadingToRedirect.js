import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, [1000]);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Container>
      <Text>Redirecting you in {count} seconds</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h5`
  font-weight: 400;
  font-size: 3rem;
`;

export default LoadingToRedirect;
