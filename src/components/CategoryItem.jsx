import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mobile } from 'responsive';

const CategoryItem = ({ img, title, category }) => {
  return (
    <Container>
      <Link to={`products/${category}`}>
        <Image src={img} alt='' />
        <Info>
          <Title>{title}</Title>
          <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: all 0.2s ease;

  ${mobile({ height: '30vh' })}

  &:hover {
    transform: scale(1.03);
  }
`;

const Title = styled.h1`
  display: inline-block;
  text-transform: uppercase;
  color: ${({ theme }) => theme.catText};
  margin-bottom: 2rem;

  ${mobile({
  fontSize: '1.8rem',
  fontWeight: 400,
  letterSpacing: '1px',
})}
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-transform: uppercase;
  padding: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.bgCatBtn};
  color: ${({ theme }) => theme.textCatBtn};
  border-radius: 3px;
  cursor: pointer;

  ${mobile({
  fontSize: '1.4rem',
  fontWeight: 300,
})}

  &:focus {
    outline: none;
  }
`;

export default CategoryItem;
