import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import Topbar from 'components/Topbar'
import Submenu from 'components/Submenu'
import Sidebar from 'components/Sidebar'
import ListItems from 'components/ListItems'
import { closeSubmenu } from 'redux/submenu/subMenuSlice'

const Tutorial = () => {
  const dispatch = useDispatch();

  const handleCloseSubmenu = (e) => {
    if (e.target.classList.contains('container')) {
      dispatch(closeSubmenu());
    }
  };

  return (
    <Container className='container' onMouseOver={handleCloseSubmenu}>
      <Topbar />
      <Sidebar />
      <Submenu />
      <ListItems />
      <Spinner size='lg' />
    </Container >
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const Spinner = styled.div`
  width: ${({ size }) => size === 'sm' && '2rem'};
  width: ${({ size }) => size === 'md' && '5rem'};
  width: ${({ size }) => size === 'lg' && '10rem'};
  height: ${({ size }) => size === 'sm' && '2rem'};
  height: ${({ size }) => size === 'md' && '5rem'};
  height: ${({ size }) => size === 'lg' && '10rem'};
  margin: 3rem auto;
  border: 3px solid #f5f5f5;
  border-top-color: #979797;
  border-radius: 50%;
  animation: rotate 0.6s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Tutorial
