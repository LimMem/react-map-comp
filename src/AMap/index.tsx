import React, { FC, useEffect, useRef, forwardRef, useMemo } from 'react';
import { useAMapDidLoad } from '../hooks';

interface AMapProps<T> extends React.HTMLAttributes<T> {
  akey: string;
}

export type TranscriptComponent<ItemT = any> = (
  props: AMapProps<ItemT>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => React.ReactElement | null;

const win: any = window;

const Map: TranscriptComponent<HTMLDivElement> = (props, ref) => {
  const { akey: key, ...resetProps } = props;
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef(null);
  const finalContainerRef: any = useMemo(() => {
    return ref || mapContainerRef;
  }, [ref]);
  useAMapDidLoad(
    () => {
      if (finalContainerRef) {
        mapRef.current = new win.AMap.Map(finalContainerRef.current);
        if (finalContainerRef.current) {
          finalContainerRef.current['amap'] = mapRef.current;
        }
      }
    },
    { key },
  );
  return <div id="map" ref={finalContainerRef} {...resetProps}></div>;
};

export default forwardRef(Map);
