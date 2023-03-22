import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ArrowBackIosOutlined, ArrowForwardIos } from '@material-ui/icons'

import ListItem from './ListItem'
import { closeSubmenu } from 'redux/submenu/subMenuSlice'

const ListItems = () => {
  const dispatch = useDispatch();

  const listRef = useRef()
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const handleClick = (direction) => {
    setIsMoved(true)
    const distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }

    if (direction === 'right' && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <Container onMouseOver={() => dispatch(closeSubmenu())}>
      <Wrapper>
        <ArrowBackIosOutlined
          className='arrow left'
          onClick={() => handleClick('left')}
          style={{ display: (!isMoved || slideNumber === 0) && 'none' }}
        />
        <ListContainer ref={listRef}>
          <ListItem color='#f5f5f5' />
          <ListItem color='crimson' />
          <ListItem color='orange' />
          <ListItem color='#ff0000' />
          <ListItem color='#0000ff' />
          <ListItem color='#00ff00' />
          <ListItem color='#ffff00' />
          <ListItem color='#ff00ff' />
          <ListItem color='#00ffff' />
          <ListItem color='#fd88de' />
        </ListContainer>
        <ArrowForwardIos
          className='arrow right'
          onClick={() => handleClick('right')}
        />
      </Wrapper>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
`

const Wrapper = styled.div`
  position: relative;

  .arrow {
    width: 5rem;
    height: 100%;
    background-color: rgba(22, 22, 22, 0.5);
    color: var(--color-white);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    z-index: 1000;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`

const ListContainer = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
  display: flex;
  width: max-content;
  transition: all 1s ease;
`

export default ListItems
