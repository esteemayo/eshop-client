import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  console.log(state);

  return <Container>Success</Container>;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

export default Success;
