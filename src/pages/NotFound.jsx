import styled from 'styled-components';
import { smallest } from 'responsive';

const NotFound = () => {
  return (
    <Container>
      <Image src={'assets/404.png'} alt='' />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  ${smallest({ height: '50vh' })}
`;

const Image = styled.img`
  height: 80%;
  display: inline-block;
  object-fit: cover;
`;

export default NotFound;
