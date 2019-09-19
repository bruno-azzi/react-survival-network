import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';

import { TweenLite, Expo } from 'gsap';
import './header.scss';

import logo from '../../assets/img/logo.png';

export default function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    function toggleMenu() {
      // console.log('valor: ', menuOpened);
      
      if (menuOpened) {
        TweenLite.to('.nav', 0.6, { right: 0, ease: Expo.easeOut });
        console.log('open menu');
      } else {
        TweenLite.to('.nav', .6, { right: -250, ease: Expo.easeOut });
        // console.log('close menu');
      }
    }

    toggleMenu();
  }, [menuOpened]);

  return (
    // <header>
    //   {/* <button onClick={() => setMenuOpened(!menuOpened)}>toggleMenu</button> */}
    //   <nav className="nav">
    //     <ul>
    //       <li>Home</li>
    //       <li>About</li>
    //       <li>Services</li>
    //       <li>Contact</li>
    //     </ul>
    //     <span className="close-nav" onClick={() => setMenuOpened(false)}>x</span>
    //   </nav>
    // </header>

    <header data-component='header'>
      <Container>
        <h1 className='logo'>
          <a href='/'>
            <img src={logo} alt='Zombie Survival Social Network' title='Zombie Survival Social Network' />
          </a>
        </h1>
      </Container>
    </header>
  );
}
