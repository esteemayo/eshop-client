import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { mobile, small } from '../responsive';
import { setLogout } from 'redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search
              className={
                darkMode ? 'search__icon--dark' : 'search__icon--light'
              }
              style={{ fontSize: '1.6rem' }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link
            to='/'
            className={`nav__link ${
              darkMode ? 'nav__link--dark' : 'nav__link--light'
            }`}
          >
            <Logo>eShop</Logo>
          </Link>
        </Center>
        <Right>
          {!user && (
            <MenuItem>
              <NavLink
                to='/register'
                className={({ isActive }) =>
                  isActive ? (darkMode ? 'active--dark' : 'active--light') : ''
                }
              >
                Register
              </NavLink>
            </MenuItem>
          )}
          {!user && (
            <MenuItem>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive ? (darkMode ? 'active--dark' : 'active--light') : ''
                }
              >
                Login
              </NavLink>
            </MenuItem>
          )}
          <MenuItem>
            {user && (
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? (darkMode ? 'active--dark' : 'active--light') : ''
                }
              >
                {user?.username}
              </NavLink>
            )}
          </MenuItem>
          {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          <MenuItem>
            <NavLink
              to='/cart'
              className={({ isActive }) =>
                isActive ? (darkMode ? 'active--dark' : 'active--light') : ''
              }
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
  width: 100vw;
  height: 8rem;
  background-color: ${({ theme }) => theme.bgLight};

  ${mobile({ height: '5rem' })}
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({
    padding: '1rem 0',
  })}
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  align-items: center;

  ${mobile({ display: 'none' })}
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
  caret-color: ${({ theme }) => theme.crInput};

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.searchPlaceholder};
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
  height: 0;

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
