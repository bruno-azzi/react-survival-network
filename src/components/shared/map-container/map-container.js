import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import config from '../../../config';
import darkTheme from './dark-theme.json';
import './map-container.scss';

function MapContainer(props) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    function getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        });
      }
    }

    getGeolocation();
  }, []);

  useEffect(() => {
    props.onLocationUpdate({ lat, lon });
    console.log('att');
  }, [lat, lon])
  
  function onMarkerDragEnd(coords) {
    console.log('onMarkerDragEnd');
    const { latLng } = coords;

    setLat(latLng.lat());
    setLon(latLng.lng());

    props.onLocationUpdate({ lat, lon });
  }

  return (
    <div data-component='map'>
      {lat && lon ? (
        <Map google={props.google} styles={darkTheme} zoom={17} initialCenter={{ lat: lat, lng: lon }}>
          <Marker
            position={{ lat: lat, lng: lon }}
            draggable={true}
            onDragend={(t, map, coords) => onMarkerDragEnd(coords)}
          />
        </Map>
      ) : (
        <p>Geolocalização desativada!</p>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: config.mapApiKey
})(MapContainer);
