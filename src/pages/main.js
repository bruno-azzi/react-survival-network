import React, { useState, useEffect } from 'react';

import axios from 'axios';
import config from '../config';

import { Container, Grid, Button } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import Header from '../components/header/header';
import GlobalData from '../components/global-data/global-data';
import SurvivorList from '../components/survivor-list/survivor-list';
import AddSurvivorForm from '../components/add-survivor-form/add-survivor-form';

import './main.scss';

export default function Main() {
  const [survivors, setSurvivors] = useState([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    async function loadSurvs() {
      const response = await axios.get(config.api + 'people.json');

      setSurvivors(response.data.reverse());
      console.log('load survivors');
    }

    loadSurvs();
  }, []);

  const getClickedSurvivor = (survivor)  => {
    console.log(survivor.name, survivor);
  };

  const updateSurvivorList = (newSurvivor) => {
    console.log('received new survivor', newSurvivor);
    
    setSurvivors([ newSurvivor, ...survivors ]);
  }

  return (
    <main>
      <Header />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <div className="survivors-column">
              <Grid container className="column-title" justify="space-between" alignItems="center">
                <Grid item>
                  <h2 className="title">Survivors List</h2>
                </Grid>
                <Grid item>
                  <Button className="add-btn" onClick={() => setShowForm(!showForm)}>
                    <AddCircleOutlineOutlinedIcon className="add-btn-icon"/>
                  </Button>
                </Grid>
              </Grid>
              {
                survivors.length > 0 ? (
                  <SurvivorList survivors={survivors} clickedSurvivor={getClickedSurvivor} />
                ) : (
                  <p>loading...</p>
                )
              }
            </div>
          </Grid>

          <Grid item xs={8}>
            <div className="block">
              <GlobalData />
              {
                showForm && (
                  <AddSurvivorForm onCreateNewSurvivor={updateSurvivorList} />
                )
              }
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
