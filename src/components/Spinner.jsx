import styled from 'styled-components';

const Spinner = () => {
  return (
    <Container></Container>
  );
};

const Container = styled.div`
  width: 6rem;
  height: 6rem;
  border: 5px solid #03adad;
  border-radius: 50%;
  border-top-color: #025353;
  animation: spinner 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
