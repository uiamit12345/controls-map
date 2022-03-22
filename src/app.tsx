import * as React from 'react';
import {useState, useMemo, useEffect} from 'react';
import {render} from 'react-dom';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import Pin from './pin';

const TOKEN = 'pk.eyJ1IjoiYW1pdDE5ODgiLCJhIjoiY2wxMTVzOXkzMnJseDNqcG53M2FqMnZmbiJ9.MzOTMVXuWHZEsxMoa7VuEQ'; // Set your mapbox token here

export default function App() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [cities, setCities] =  useState([]);

  useEffect(() =>{
    fetch('https://my-json-server.typicode.com/uiamit12345/demo/posts')
    .then(response => response.json())
    .then(data => {
      setCities(data);}
       );
  },[]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        { cities.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
        >
          <Pin onClick={() => setPopupInfo(city)} />
        </Marker>
      ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
