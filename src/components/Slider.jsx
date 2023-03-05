import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import { sliderItems } from 'data';
import { mobile, tabLand } from '../responsive';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleClick = (direction) => {
    const lastSlideIndex = sliderItems.length - 1;

    if (direction === 'left') {
      setSlideIndex((slideIndex) => slideIndex > 0 ? slideIndex - 1 : lastSlideIndex);
    } else {
      setSlideIndex((slideIndex) => slideIndex < lastSlideIndex ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const lastSlideIndex = sliderItems.length - 1;

    const interval = setInterval(() => {
      setSlideIndex(slideIndex === lastSlideIndex ? 0 : slideIndex + 1);
    }, [5000]);

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined
          className={darkMode ? 'arrow__dark' : 'arrow__light'}
        />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => {
          const { id, img, desc, title } = item;
          return (
            <Slide bg={darkMode ? '111010' : 'f5fafd'} key={id}>
              <ImgContainer>
                <Image src={img} alt='' />
              </ImgContainer>
              <InfoContainer>
                <Title>{title}</Title>
                <Description>{desc}</Description>
                <Button>Shop now</Button>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined
          className={darkMode ? 'arrow__dark' : 'arrow__light'}
        />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media only screen and (max-width: 41.69em) {
    height: 100%;
  }

  ${mobile({ display: 'none' })}
`;

const Arrow = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.btnSlide};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ direction }) => direction === 'left' && '10px'};
  right: ${({ direction }) => direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 10;
`;

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${({ slideIndex }) => slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${({ bg }) => bg};
  z-index: 2000;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 5rem;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: 7rem;
  color: ${({ theme }) => theme.textSoft};

  ${tabLand({ fontSize: '3.5rem' })}
`;

const Description = styled.p`
  margin: 5rem 0;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  letter-spacing: 3px;

  ${tabLand({
  fontSize: '1.5rem',
  margin: '2.5rem 0',
})}
`;

const Button = styled.button`
  display: block;
  padding: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  border: 1px solid #777;
  background-color: transparent;
  color: #777;
  border-radius: 3px;
  cursor: pointer;

  ${tabLand({ fontSize: '1.5rem' })}

  &:focus {
    outline: none;
  }
`;

export default Slider;
