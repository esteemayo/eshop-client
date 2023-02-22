import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { mobile, small } from '../responsive';
import { toggle } from 'redux/darkMode/darkModeSlice';
import { setLogout } from 'redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ fontSize: '1.6rem' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/' className='nav__link'>
            <Logo>eShop</Logo>
          </Link>
        </Center>
        <Right>
          <MenuItem onClick={() => dispatch(toggle())}>
            {darkMode ? 'Light' : 'Dark'} Mode
          </MenuItem>
          {!user && (
            <MenuItem>
              <NavLink
                to='/register'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Register
              </NavLink>
            </MenuItem>
          )}
          {!user && (
            <MenuItem>
              <NavLink
                to='/login'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Login
              </NavLink>
            </MenuItem>
          )}
          <MenuItem>
            {user && (
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {user?.username}
              </NavLink>
            )}
          </MenuItem>
          {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          <MenuItem>
            <NavLink
              to='/cart'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined style={{ fontSize: ' 1.6rem' }} />
              </Badge>
            </NavLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 8rem;
  background-color: ${({ theme }) => theme.bgLight};

  ${mobile({ height: '5rem' })}
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: '1rem 0' })}
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 1.6rem;
  color: #ffb900;
  cursor: pointer;

  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid ${({ theme }) => theme.searchBorder};
  border-radius: 3px;

  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  padding: 0.5rem;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  caret-color: #008080;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  ${mobile({ width: '5rem' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  font-family: 'Great Vibes', cursive;
  color: ${({ theme }) => theme.logo};

  ${mobile({
  fontSize: '2.8rem',
  display: 'flex',
  justifyContent: 'flex-end',
})}

  ${small({ fontSize: '2.4rem' })}
`;

const Right = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({
  flex: 2,
  justifyContent: 'center',
})}
`;

const MenuItem = styled.div`
  font-size: 1.6rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.menuBtn};
  margin-left: 2.5rem;
  cursor: pointer;

  ${mobile({
  fontSize: '1.2rem',
  marginLeft: '1rem',
})}
`;

export default Navbar;
