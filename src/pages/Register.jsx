import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  EmailOutlined,
  FaceOutlined,
  PersonOutline,
  PublishOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@material-ui/icons';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { mobile, smallest, tabLand } from 'responsive';
import app from '../firebase';
import { registerUserAsync, reset } from 'redux/user/userSlice';
import { registerInputs } from 'formData';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message, isSuccess, isFetching } = useSelector((state) => state.user);

  const [perc, setPerc] = useState(0);
  const [file, setFile] = useState(null);
  const [values, setValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFile = (file) => {
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues((prev) => ({ ...prev, img: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, passwordConfirm } = values;
    if (username && email && password && passwordConfirm) {
      const credentials = {
        ...values,
      };

      dispatch(registerUserAsync({ credentials, toast }));
    }
  };

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  useEffect(() => {
    user && isSuccess && navigate('/', { replace: true });
    return () => dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form onSubmit={handleSubmit}>
          {registerInputs.map((input) => {
            const { id, name, type, label, placeholder } = input;
            return (
              <FormContainer>
                <FormInput
                  id={id}
                  type={showPassword ? 'text' : type}
                  name={name}
                  placeholder={placeholder}
                  required
                  autoFocus={name === 'name' ? true : false}
                  value={values[name]}
                  onChange={handleChange}
                />
                <FormLabel htmlFor={id}>{label}</FormLabel>
                {name === 'name' && <PersonOutline className='register__icon' />}
                {name === 'username' && <FaceOutlined className='register__icon' />}
                {name === 'email' && <EmailOutlined className='register__icon' />}
                {(name === 'password' || name === 'passwordConfirm') && (
                  showPassword ? (
                    <VisibilityOffOutlined
                      onClick={handleShowPassword}
                      className='password__icon'
                    />
                  ) : (
                    <VisibilityOutlined
                      onClick={handleShowPassword}
                      className='password__icon'
                    />
                  )
                )}
              </FormContainer>
            );
          })}
          <FormContainer>
            {perc > 0 ? (
              `Uploading: ${perc}%`
            ) : (
              <FormInput
                type='file'
                id='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
              />
            )}
            <FormLabel htmlFor='file'>Image</FormLabel>
            <PublishOutlined className='register__icon' />
          </FormContainer>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching || (perc > 0 && perc < 100)}>
            Create
          </Button>
          {message && <Error>{message}</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;
  padding-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 64em) {
    height: 100%;
  }

  ${tabLand({ height: '110vh' })}

  @media only screen and (max-width: 57.19em) {
    height: 100%;
    padding: 3rem;
  }

  ${mobile({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: 5px;
  -webkit-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);

  ${tabLand({
  width: '65%',
  padding: '3rem',
})}

  ${mobile({
  width: '85%',
  padding: '2rem',
})}

  ${smallest({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;

  @media only screen and (max-width: 57.19em) {
    font-size: 1.7rem;
  }

  ${mobile({
  fontSize: '2rem',
  fontWeight: 400,
  marginBottom: '0.5rem',
  backgroundImage: 'linear-gradient(to right, #06dddd, #008080)',
  WebkitBackgroundClip: 'text !important',
  backgroundClip: 'text !important',
})}

  ${smallest({ fontSize: '1.3rem' })}

  &::after {
    display: block;
    content: '';
    width: 13%;
    height: 3px;
    background-color: #008080;
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

    @media only screen and (max-width: 57.19em) {
      margin-bottom: 0.7rem;
    }

    ${mobile({ marginBottom: '0.5rem' })}
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #999;
  margin-left: 2rem;
  margin-top: 0.7rem;
  transition: all 0.5s ease;

  @media only screen and (max-width: 57.19em) {
    font-size: 1rem;
  }

  ${mobile({ fontWeight: 500 })}

  ${smallest({ fontSize: '1rem' })}
`;

const FormInput = styled.input`
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  color: #999;
  padding: 1.5rem 2rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  border-bottom: 3px solid transparent;
  background-color: #f9f9f9;
  caret-color: #008080;
  transition: all 0.5s ease;

  @media only screen and (max-width: 57.19em) {
    padding: 1rem 2rem;
  }

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
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
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

const Agreement = styled.span`
  font-size: 1.4rem;

  ${mobile({
  fontSize: '1.25rem',
  letterSpacing: '1px',
  textAlign: 'left',
})}

  ${smallest({
  fontSize: '1rem',
  letterSpacing: 0,
})}
`;

const Button = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  width: 40%;
  font-size: 1.6rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  background-color: #008080;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.5s ease;

  @media only screen and (max-width: 57.19em) {
    padding: 1rem 2rem;
  }

  ${mobile({
  width: '100%',
  fontSize: '1.3rem',
  padding: '1rem 2rem',
  marginTop: '1.5rem',
})}

  ${smallest({
  width: '100%',
  fontSize: '1rem',
})}

  &:hover {
    -webkit-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    -moz-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    letter-spacing: 2px;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: #f00;
  font-size: 1.4rem;
  text-align: center;
  padding: 0.5rem;
`;

export default Register;
