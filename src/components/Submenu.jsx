import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const Submenu = () => {
  const { location, showSubmenu, page: { page, links } } =
    useSelector((state) => state.submenu);

  const containerRef = useRef();
  const [columns, setColumns] = useState('col-2');

  useEffect(() => {
    setColumns('col-2');
    const submenu = containerRef.current;
    const { center, bottom } = location;

    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setColumns('col-3');
    }

    if (links.length > 3) {
      setColumns('col-4');
    }
  }, [links, location]);

  return (
    <Container type={showSubmenu ? 'show' : ''} ref={containerRef}>
      <Title>{page}</Title>
      <ListContainer columns={columns}>
        {links.map((link, index) => {
          const { url, icon, label } = link;
          return (
            <ListItem key={index}>
              <Link to={url}>
                {/* {icon} */}
                {label}
              </Link>
            </ListItem>
          );
        })}
      </ListContainer>
    </Container>
  )
}

const Container = styled.aside`
  padding: 2rem;
  background-color: powderblue;
  border-radius: 1rem;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 5rem;
  transform: translateX(-50%);
  display: ${({ type }) => type === 'show' ? 'block' : 'none'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 3000;

  @media only screen and (max-width: 37.5em) {
    display: none;
  }

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid powderblue;
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Title = styled.h4`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
`

const ListContainer = styled.ul`
  padding: 2rem 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem 2rem;
  width: ${({ columns }) => columns === 'col-2' && '20rem'};
  width: ${({ columns }) => columns === 'col-3' && '30rem'};
  width: ${({ columns }) => columns === 'col-4' && '40rem'};
  flex-wrap: wrap;
`

const ListItem = styled.li`
  font-size: 1.5rem;
  text-transform: capitalize;

  a {
    &:link,
    &:visited {
      text-decoration: none;
      font-weight: 500;
      transition: all 0.5s ease;
    }

    &:hover {
      text-decoration: underline;
    }

    svg {
      font-size: 2rem;
      color: hsl(209, 61%, 16%);
    }
  }
  
  & > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    outline-color: #555;
  }
`

export default Submenu
