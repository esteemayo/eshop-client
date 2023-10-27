import styled from 'styled-components';

const ListItem = ({ color }) => {
  return <Container color={color}>ListItem</Container>;
};

const Container = styled.div`
  width: 225px;
  height: 12rem;
  font-weight: 700;
  font-size: 1.6rem;
  background-color: ${({ color }) => color};
  color: #fff;
  margin-right: 5px;
  overflow: hidden;
  cursor: pointer;
`;

export default ListItem;
