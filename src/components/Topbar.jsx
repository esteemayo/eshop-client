import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { closeSubmenu, openSidebar, openSubmenu } from 'redux/submenu/subMenuSlice';

const Topbar = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.submenu);

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();

    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom;

    const submenu = {
      page,
      coordinates: {
        center,
        bottom,
      },
    };

    dispatch(openSubmenu(submenu));
  };

  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      dispatch(closeSubmenu());
    }
  };

  return (
    <Nav onMouseOver={handleSubmenu}>
      <Container>
        <Logo>Navbar</Logo>
        {!showSidebar && (
          <ToggleButton
            type='button'
            onClick={() => dispatch(openSidebar())}
          >
            X
          </ToggleButton>
        )}
        <ListContainer>
          <ListItem>
            <Button
              type='button'
              className='link-btn'
              onMouseOver={displaySubmenu}
            >
              products
            </Button>
          </ListItem>
          <ListItem>
            <Button
              type='button'
              className='link-btn'
              onMouseOver={displaySubmenu}
            >
              developers
            </Button>
          </ListItem>
          <ListItem>
            <Button
              type='button'
              className='link-btn'
              onMouseOver={displaySubmenu}
            >
              company
            </Button>
          </ListItem>
        </ListContainer>
        <LoginButton>Log in</LoginButton>
      </Container>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100vw;
  height: 5rem;
  background-color: #9c88ff;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  max-width: 102.4rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 50em) {
    margin: 0 5rem;
  }
`

const Logo = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
`
const ToggleButton = styled.button`
  display: inline-block;
  border: none;
  font-size: 2rem;
  background-color: transparent;
  color: #fff;
  
  @media only screen and (min-width: 50em) {
    display: none;
  }
`

const ListContainer = styled.ul`
  display: none;

  @media only screen and (min-width: 50em) {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 5rem;
  }
`

const ListItem = styled.li``

const Button = styled.button`
  display: inline-block;
  border: none;
  font-family: inherit;
  font-size: 1.5rem;
  text-transform: capitalize;
  background-color: transparent;
  color: #fff;
  outline-color: #6d5dff;
  cursor: default;
`

const LoginButton = styled.button`
  display: none;

  @media only screen and (min-width: 50em) {
    display: inline-block;
    border: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #5643fa;
    color: #fff;
    border-radius: 0.5rem;
    outline-color: #6d5dff;
    cursor: pointer;
  }
`

export default Topbar
