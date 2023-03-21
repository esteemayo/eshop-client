import styled from 'styled-components';

const Spinner = ({ size }) => {
  return <Container size={size}>&nbsp;</Container>;
};

const Container = styled.div`
  width: ${({ size }) => size === 'sm' && '2rem'};
  width: ${({ size }) => size === 'md' && '6rem'};
  width: ${({ size }) => size === 'lg' && '10rem'};
  height: ${({ size }) => size === 'sm' && '2rem'};
  height: ${({ size }) => size === 'md' && '6rem'};
  height: ${({ size }) => size === 'lg' && '10rem'};
  border: 5px solid ${({ theme }) => theme.bgSpinner};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

Spinner.defaultProps = {
  size: 'sm',
};

export default Spinner;
