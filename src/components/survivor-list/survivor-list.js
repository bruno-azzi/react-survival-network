import React from 'react';

import { TweenMax, Expo } from 'gsap';
import { Grid } from '@material-ui/core';

import './survivor-list.scss';

export default function SurvivorList(props) {

  const survivors = props.survivors;

  console.log(props);

  if (survivors) {
    setTimeout(() => {
      TweenMax.staggerTo('[data-component="survivor-list"] .survivor', 0.3, { left: 0, opacity: 1, ease: Expo.easeOut }, 0.03);
    }, 0);
  }

  return (
    <ul data-component='survivor-list'>
      {
        survivors.map((survivor, index) => (
          <li className='survivor' key={index} onClick={() => props.clickedSurvivor(survivor)}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item className="grid-item">
                <h4 className='name'>{survivor.name}</h4>
              </Grid>
              {
                survivor['infected?'] && (
                  <Grid item className="grid-item">
                    <span className="infected-label">Infected</span>
                  </Grid>
                )
              }
            </Grid>
          </li>
        ))
      }
    </ul>
  );
}
