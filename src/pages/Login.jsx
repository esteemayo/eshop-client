import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaceOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@material-ui/icons';

import Spinner from 'components/Spinner';
import { loginUserAsync, reset } from 'redux/user/userSlice';
import { mobile, smallest, tabLand } from 'responsive';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, message, isSuccess, isFetching } = useSelector(
    (state) => state.user
  );

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const credentials = {
      username,
      password,
    };

    if (username && password) {
      dispatch(loginUserAsync({ credentials, toast }));

      const origin = location.state?.from?.pathname || '/';
      user && isSuccess && navigate(origin);
      // navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <FormInput
              type='text'
              id='username'
              placeholder='Username'
              ref={usernameRef}
              required
            />
            <FormLabel htmlFor='username'>Username</FormLabel>
            <FaceOutlined className='username__icon' />
          </FormContainer>
          <FormContainer>
            <FormInput
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='********'
              ref={passwordRef}
              required
            />
            <FormLabel htmlFor='password'>Password</FormLabel>
            {showPassword ? (
              <VisibilityOffOutlined
                className='password__icon'
                onClick={handleShowPassword}
              />
            ) : (
              <VisibilityOutlined
                className='password__icon'
                onClick={handleShowPassword}
              />
            )}
          </FormContainer>
          <Button disabled={isFetching}>
            {isFetching ? <Spinner /> : 'Login'}
          </Button>
          {message && <Error>{message}</Error>}
          <Link>Do not you remember the password?</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  background-image: ${({ theme }) => theme.bgImage},
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  ${tabLand({ height: '110vh' })}

  @media only screen and (max-width: 57.19em) {
    height: 100%;
    padding: 3rem;
  }

  ${mobile({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 5px;
  -webkit-box-shadow: ${({ theme }) => theme.boxWrapper};
  -moz-box-shadow: ${({ theme }) => theme.boxWrapper};
  box-shadow: ${({ theme }) => theme.boxWrapper};

  @media only screen and (max-width: 57.19em) {
    width: 80%;
  }

  ${tabLand({
    width: '65%',
    padding: '3rem',
  })}

  ${mobile({ width: '75%' })}

  ${smallest({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;

  ${mobile({
    fontSize: '2rem',
    fontWeight: 400,
    marginBottom: '0.5rem',
    backgroundImage: 'linear-gradient(to right, #06dddd, #008080)',
    WebkitBackgroundClip: 'text !important',
    backgroundClip: 'text !important',
  })}

  &::after {
    display: block;
    content: '';
    width: 10%;
    height: 3px;
    background-color: ${({ theme }) => theme.bgUnderline};
    margin: 0 auto;

    ${mobile({ display: 'none' })}
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
`;

const FormContainer = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;

    ${mobile({ marginBottom: '0.5rem' })}
  }

  svg {
    color: ${({ theme }) => theme.colorIcon};
  }
`;

const FormLabel = styled.label`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #999;
  margin-left: 2rem;
  margin-top: 0.7rem;
  transition: all 0.5s ease;

  ${mobile({ fontWeight: 500 })}

  ${smallest({ fontSize: '1rem' })}
`;

const FormInput = styled.input`
  display: inline-block;
  font-size: 1.5rem;
  font-family: inherit;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  padding: 1.5rem 2rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  border-bottom: 3px solid transparent;
  caret-color: ${({ theme }) => theme.crInput};
  transition: all 0.5s ease;

  ${mobile({
    fontSize: '1.3rem',
    padding: '1.2rem 2rem',
  })}

  ${smallest({
    fontSize: '1rem',
    padding: '1rem',
  })}

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
  }

  &:focus:invalid {
    border-bottom: 3px solid #ff7730;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  border-radius: 5px;
  width: 100%;
  font-size: 1.6rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.bgFormBtn};
  color: ${({ theme }) => theme.textFormBtn};
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  ${mobile({
    fontSize: '1.3rem',
    padding: '1rem 2rem',
  })}

  ${smallest({ fontSize: '1rem' })}

  &:hover {
    -webkit-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    -moz-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    letter-spacing: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};

  ${mobile({ fontSize: '1.25rem' })}
`;

const Error = styled.span`
  color: #f00;
  font-size: 1.3rem;
`;

export default Login;
