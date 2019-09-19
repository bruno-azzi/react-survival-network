import React, { useState, useEffect } from 'react';

import axios from 'axios';
import apiUrl from '../environment';

import { Container, Grid, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Header from '../components/header/header';
import GlobalData from '../components/global-data/global-data';
import SurvivorList from '../components/survivor-list/survivor-list';
import AddSurvivorForm from '../components/add-survivor-form/add-survivor-form';

import './main.scss';

export default function Main() {
  const [survivors, setSurvivors] = useState([]);
  const [tabValue, setValue] = useState(0);

  useEffect(() => {
    async function loadSurvs() {
      const response = await axios.get(apiUrl + 'people.json');

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

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`
    };
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabValue !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  return (
    <main>
      <Header />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className='survivors-column'>
              <h2 className='title'>Survivors List</h2>
              {survivors.length > 0 ? (
                <SurvivorList survivors={survivors} clickedSurvivor={getClickedSurvivor} />
              ) : (
                <p>loading...</p>
              )}
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className='block'>
              <AppBar position='static' color='default' className='page-tabs'>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons='on'
                  indicatorColor='primary'
                  aria-label='scrollable force tabs example'>
                  <Tab label='Global Data' icon={<AssignmentIcon />} {...a11yProps(0)} />
                  <Tab label='New Survivor' icon={<PersonAddIcon />} {...a11yProps(1)} />
                </Tabs>
              </AppBar>

              <TabPanel value={tabValue} index={0}>
                <GlobalData />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <AddSurvivorForm onCreateNewSurvivor={updateSurvivorList} />
              </TabPanel>
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
