import React, { useRef, useEffect } from 'react';
import { useAMapDidLoad, useBMapDidLoad } from '../../hooks';
import Map from 'react-map-comp';

const Demo = (props) => {
  const mapRef = useRef(null);
  useEffect(() => {
    console.log(mapRef);
    return () => {};
  }, []);

  return (
    <>
      <Map
        ref={mapRef}
        akey="9312011951f8c6adda424d2bb49b0e58"
        style={{ width: '100%', height: '400px' }}
      ></Map>
      <Map
        akey="9312011951f8c6adda424d2bb49b0e58"
        style={{ width: '100%', height: '400px', marginTop: '30px' }}
      ></Map>
    </>
  );
};

export default Demo;
