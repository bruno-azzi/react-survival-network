import React, { useState, useEffect } from 'react';

import axios from 'axios';
import config from '../../config';

import { Grid } from '@material-ui/core';

import './global-data.scss';

export default function GlobalData() {
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    async function loadGlobalData() {
      let infected = await axios.get(config.api + 'report/infected');
      let non_infected = await axios.get(config.api + 'report/non_infected');
      let people_inventory = await axios.get(config.api + 'report/people_inventory');
      let infected_points = await axios.get(config.api + 'report/infected_points');

      infected = infected.data.report;
      non_infected = non_infected.data.report;
      people_inventory = people_inventory.data.report;
      infected_points = infected_points.data.report;

      const globalData = { infected, non_infected, people_inventory, infected_points };

      setGlobalData(globalData);
      console.log(globalData);
    }

    loadGlobalData();
  }, []);

  return (
    <div data-component='global-data'>
      <Grid container spacing={2} justify="center">
        { 
          globalData ? (
            <> 
              <Grid item xs={6}>
                <div className="item-data">
                  <strong>Infected people</strong>
                  <span>{ globalData.infected.average_infected.toFixed(2).replace('.', ',') }%</span>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="item-data green">
                  <strong>Healthy people</strong>
                  <span>{ globalData.non_infected.average_healthy.toFixed(2).replace('.', ',') }%</span>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="item-data">
                  <strong>Items per person</strong>
                  <span>{ globalData.people_inventory.average_items_quantity_per_person.toFixed(2).replace('.', ',') }</span>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="item-data green">
                  <strong>Items per healthy person</strong>
                  <span>{ globalData.people_inventory.average_items_quantity_per_healthy_person.toFixed(2).replace('.', ',') }</span>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="item-data">
                  <strong>Currency lost from infecteds</strong>
                  <span>$ { globalData.infected_points.total_points_lost }</span>
                </div>
              </Grid>
            </>
          ) : (
            <p>Loading...</p>
          )
        }
      </Grid>
    </div>
  );
}
