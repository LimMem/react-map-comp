import React, { useRef, useEffect } from 'react';
import { AMap } from 'react-map-comp';

const Demo = (props) => {
  const mapRef = useRef(null);
  return (
    <>
      <AMap
        ref={mapRef}
        akey="9312011951f8c6adda424d2bb49b0e58"
        style={{ width: '100%', height: '400px' }}
      ></AMap>
    </>
  );
};

export default Demo;
