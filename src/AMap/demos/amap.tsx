import React, { useRef, useEffect } from 'react';
import Map from 'react-map-comp';

const Demo = (props) => {
  const mapRef = useRef(null);
  return (
    <>
      <Map
        ref={mapRef}
        akey="9312011951f8c6adda424d2bb49b0e58"
        style={{ width: '100%', height: '400px' }}
      ></Map>
    </>
  );
};

export default Demo;
