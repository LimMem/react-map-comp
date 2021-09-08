import React, { FC, useRef, useEffect, useState } from 'react';
import Map from '../';
import Marker from '../../Marker';

interface DemosProps {}

const Demos: FC<DemosProps> = (props) => {
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 26.08, lng: 119.3 });
  const [ak, setAk] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setCenter({ lat: 32.08, lng: 108.3 });
      setAk('YqLjyHLyywp2A1EP9lWh0HfSCGeIWOYr');
    }, 1000);
    return () => {};
  }, []);
  return (
    <Map
      ref={mapRef}
      style={{ height: '100vh' }}
      ak={ak}
      id="testBMap"
      center={center}
      onMapLoaded={(e) => {
        console.log('s', e);
      }}
      onClick={(e) => {
        console.log(e);
      }}
      onDblClick={(e) => {
        console.log('双击', e);
      }}
    >
      <Marker map={mapRef} point={center} />
    </Map>
  );
};

export default Demos;
