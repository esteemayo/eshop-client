import styled from 'styled-components';
import { mobile } from 'responsive';

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

const Container = styled.div`
  width: 100vw;
  height: 3rem;
  background-color: ${({ theme }) => theme.bgAnnounce};
  color: ${({ theme }) => theme.textAnnounce};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;

  ${mobile({ fontSize: '1.2rem' })}
`;

export default Announcement;
