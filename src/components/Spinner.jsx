import styled from 'styled-components';

const Spinner = () => {
  return (
    <Container>Spinner</Container>
  );
};

const Container = styled.div`
  width: 6rem;
  height: 6rem;
  border: 5px solid #94a3b8;
  border-radius: 50%;
  border-top-color: #645cff;
  animation: spinner 0.6s linear infinite;
  margin: 0 auto;
`;

export default Spinner;
