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
`;

const Text = styled.h5`
  
`;

export default LoadingToRedirect;
