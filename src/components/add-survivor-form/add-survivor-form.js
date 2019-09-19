import React, { useState } from 'react';

import { TextField, RadioGroup, FormControlLabel, Radio, Button, Grid, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import Axios from 'axios';
import apiUrl from '../../environment';

import './add-survivor-form.scss';
import MapContainer from '../shared/map-container/map-container';

import foodIcon from '../../assets/img/food.svg';
import waterIcon from '../../assets/img/water.svg';
import ammoIcon from '../../assets/img/ammo.svg';
import medicationIcon from '../../assets/img/medication.svg';

export default function AddSurvivorForm(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('M');
  const [lonlat, setLonlat] = useState('');
  const [water, setWater] = useState(0);
  const [food, setFood] = useState(0);
  const [ammo, setAmmo] = useState(0);
  const [medication, setMedication] = useState(0);

  const inventory = [
    {
      name: 'water',
      icon: waterIcon,
      amount: water
    },
    {
      name: 'food',
      icon: foodIcon,
      amount: food
    },
    {
      name: 'ammo',
      icon: ammoIcon,
      amount: ammo
    },
    {
      name: 'medication',
      icon: medicationIcon,
      amount: medication
    }
  ];

  async function addSurvivor(e) {
    e.preventDefault();

    const payload = {
      name,
      age,
      gender,
      lonlat: formatLonlat(lonlat),
      items: formatItems()
    };

    console.log('form:', payload);

    const response = await Axios.post(apiUrl + 'people.json', payload);
    const newSurvivor = response.data;

    console.log('newSurvivor', newSurvivor);

    props.onCreateNewSurvivor(newSurvivor);
    clearForm();
  }

  const clearForm = () => {
    setName('');
    setAge('');
    setWater(0);
    setFood(0);
    setAmmo(0);
    setMedication(0);
  }

  const getUpdatedLocation = (updatedLocation) => {
    console.log('updatedLocation', updatedLocation);

    const { lon, lat } = updatedLocation;

    const formatedLonlat = `${lon} ${lat}`;

    setLonlat(formatedLonlat);
  }

  const formatLonlat = (lonlat) => {
    console.log('formatLonlat', lonlat);

    const lat = lonlat.split(' ')[0];
    const lon = lonlat.split(' ')[1];

    return `Point(${lon} ${lat})`;
  }

  const formatItems = () => {
    const formatedInventory = `Water:${water};Food:${food};Ammunition:${ammo};Medication:${medication}`;

    return formatedInventory;
  }

  const decreaseItemAmount = (itemName, itemAmount) => {
    if (itemAmount > 0 && itemAmount <= 99) {
      handleItemAmount(itemName, itemAmount - 1);
      console.log('decrease');
    }
  };

  const increaseItemAmount = (itemName, itemAmount) => {
    if (itemAmount >= 0 && itemAmount < 99) {
      handleItemAmount(itemName, itemAmount + 1);
      console.log('increase');
    }
  }

  const handleItemAmount = (itemName, itemAmount) => {
    console.log(itemName, itemAmount);

    if (itemAmount >= 0 && itemAmount <= 99) {
      switch (itemName) {
        case 'water':
          setWater(itemAmount);
          break;
  
        case 'food':
          setFood(itemAmount);
          break;
  
        case 'ammo':
          setAmmo(itemAmount);
          break;
  
        default:
          setMedication(itemAmount);
          break;
      }
    }
  };

  return (
    <form data-component='add-survivor-form' onSubmit={addSurvivor}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={8}>
          <TextField
            className='input-field'
            required
            placeholder='Name'
            label='Name'
            name='name'
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            className='input-field'
            required
            placeholder='Age'
            label='Age'
            name='age'
            inputProps={{
              maxLength: 3,
              type: 'tel'
            }}
            value={age}
            fullWidth
            onChange={e => setAge(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <label>Gender</label>
          <RadioGroup aria-label='gender'>
            <Grid container>
              <Grid item>
                <FormControlLabel
                  value='F'
                  control={<Radio color='primary' />}
                  label='Female'
                  checked={gender === 'F'}
                  onChange={e => setGender('F')}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value='M'
                  control={<Radio color='primary' />}
                  label='Male'
                  checked={gender === 'M'}
                  onChange={e => setGender('M')}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>

        <Grid item xs={8}>
          <TextField
            className='input-field'
            required
            placeholder='Latitude and Longitude'
            value={lonlat}
            label='Latitude and Longitude'
            name='lonlat'
            fullWidth
            onChange={e => setLonlat(e.target.value)}
          />
        </Grid>
      </Grid>

      <MapContainer onLocationUpdate={getUpdatedLocation} />

      <label className="inventory-label">Inventory</label>
      <Grid container justify="space-between" className="inventory">
        {
          inventory.map(item => (
            <Grid xs={3} item className='item' key={item.name}>
              <img className='item-icon' src={item.icon} alt={item.name} title={item.name} />

              <div className="field-holder">
                <IconButton variant='outlined' onClick={() => decreaseItemAmount(item.name, item.amount)}>
                  <RemoveIcon />
                </IconButton>

                <input
                  type='tel'
                  min='0'
                  max='99'
                  maxLength='2'
                  value={item.amount}
                  onChange={e => handleItemAmount(item.name, +e.target.value)}
                />
                
                <IconButton variant='outlined' onClick={() => increaseItemAmount(item.name, item.amount)}>
                  <AddRoundedIcon />
                </IconButton>
              </div>
            </Grid>
          ))
        }
      </Grid>

      <Button type='submit' className='add-survivor-btn' variant='outlined' color='primary'>
        Add
      </Button>
    </form>
  );
}
