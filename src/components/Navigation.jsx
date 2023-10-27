import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
} from '@material-ui/icons';
import { useState } from 'react';

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <Container>
      <div className='nav-center'>
        <div className='nav-header'>
          <h1>Logo</h1>
          <button
            className='nav-toggle'
            onClick={() => setShowLinks(!showLinks)}
          >
            ⇉
          </button>
        </div>

        <div
          className={
            showLinks ? 'links-container show-container' : 'links-container'
          }
        >
          <ul className='links'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/'>about</Link>
            </li>
            <li>
              <Link to='/'>contact</Link>
            </li>
            <li>
              <Link to='/'>projects</Link>
            </li>
            <li>
              <Link to='/'>profile</Link>
            </li>
          </ul>
        </div>

        <div className='social-icons'>
          <li>
            <Link to='https://www.twitter.com'>
              <Facebook />
            </Link>
          </li>
          <li>
            <Link to='https://www.twitter.com'>
              <Twitter />
            </Link>
          </li>
          <li>
            <Link to='https://www.twitter.com'>
              <Instagram />
            </Link>
          </li>
          <li>
            <Link to='https://www.twitter.com'>
              <LinkedIn />
            </Link>
          </li>
          <li>
            <Link to='https://www.twitter.com'>
              <Pinterest />
            </Link>
          </li>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.nav`
  width: 100vw;
  height: 5rem;
  background-color: hsl(125, 71%, 66%);
  display: flex;
  align-items: center;

  .nav-center {
    position: relative;

    @media only screen and (min-width: 50em) {
      width: 100%;
      max-width: 102.4rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .nav-header {
    display: flex;
    align-items: center;
  }

  .nav-toggle {
    border: none;
    font-weight: 600;
    font-size: 2rem;
    background-color: transparent;
    color: #fff;

    @media only screen and (min-width: 50em) {
      display: none;
    }
  }

  .links-container {
    height: 0;
    overflow: hidden;
    transition: all 0.3s linear;

    @media only screen and (min-width: 50em) {
      height: auto !important;
    }
  }

  .show-container {
    height: 15rem;
    width: 100vw;
    background-color: hsl(125, 71%, 66%);
    position: absolute;
    top: 3.7rem;
    left: 0;
    right: 0;
  }

  .links {
    list-style: none;

    a {
      &:link,
      &:visited {
        display: inline-block;
        text-transform: capitalize;
        font-size: 1.5rem;
        color: hsl(209, 34%, 30%);
        letter-spacing: 0.1rem;
        transition: all 0.3s linear;

        @media only screen and (min-width: 50em) {
          color: #fff;
        }

        &:hover {
          background-color: hsl(205, 86%, 81%);
          color: hsl(205, 78%, 60%);
        }
      }
    }

    @media only screen and (min-width: 50em) {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  .social-icons {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media only screen and (max-width: 50em) {
      display: none;
    }

    li {
      color: #fff;

      a {
        &:link,
        &:visited {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        svg {
          fill: #fff;
          font-size: 2rem;
          transition: all 0.3s linear;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
`;

export default Navigation;
