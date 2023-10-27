import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sublinks } from 'constants';
import { closeSidebar } from 'redux/submenu/subMenuSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.submenu);

  return (
    <Container type={showSidebar ? 'show' : ''}>
      <Wrapper>
        <CloseButton type='button' onClick={() => dispatch(closeSidebar())}>
          X
        </CloseButton>
        <LinksContainer>
          {sublinks.map((item, index) => {
            const { links, page } = item;
            return (
              <LinksWrapper key={index}>
                <PageTitle>{page}</PageTitle>
                <ListsContainer>
                  {links.map((link, index) => {
                    const { url, icon, label } = link;
                    return (
                      <ListItem key={index}>
                        <Link to={url}>
                          {icon}
                          {label}
                        </Link>
                      </ListItem>
                    );
                  })}
                </ListsContainer>
              </LinksWrapper>
            );
          })}
        </LinksContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ type }) => (type === 'show' ? 'visible' : 'hidden')};
  transform: scale(${({ type }) => (type ? 1 : 0)});
  z-index: ${({ type }) => (type === 'show' ? 2 : -1)};
  transition: all 0.3s linear;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 50em) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 90vw;
  height: 95vh;
  max-width: 62rem;
  padding: 4rem 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-block;
  border: none;
  font-size: 3rem;
  background-color: transparent;
  color: hsl(210, 22%, 49%);
  cursor: pointer;
`;

const LinksContainer = styled.div`
  margin-top: 1.5rem;
`;

const LinksWrapper = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h4`
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const ListsContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.25rem;
`;

const ListItem = styled.li`
  font-size: 1.5rem;

  & > * {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  a {
    &:link,
    &:visited {
      text-transform: capitalize;
      color: hsl(209, 61%, 16%);
    }

    svg {
      font-size: 2rem;
      color: hsl(210, 22%, 49%);
    }
  }
`;

export default Sidebar;
