import React, {
  FC,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react';
import useBMapDidLoad from '../../hooks/useBMapDidLoad';
import { useMapSetting } from '../hooks';
import { BMapProps } from '../PropType';

export type BMapPropsComponent<ItemT = any> = (
  props: BMapProps & {
    children?: React.ReactElement[] | React.ReactElement | undefined;
  },
  ref?: React.Ref<ItemT>,
) => React.ReactElement | null;

const BDMap: BMapPropsComponent = (props, ref) => {
  const {
    ak,
    id,
    initMapProps = {},
    center = { lng: '116.404', lat: '39.915' },
    zoom = 14,
    style,
    children,
    styleId,
    onMapLoaded = () => {},
    ...restProps
  } = props;
  const [loaded, setLoaded] = useState(false);
  const MapRef = useRef<any>(null);
  const BMapInstance = useRef<any>(null);
  const { bindMapEvent } = useMapSetting({ mapRef: MapRef, props });
  useBMapDidLoad(
    () => {
      BMapInstance.current = (window as any).BMap;
      createMapView();
      onMapLoaded(BMapInstance.current);
      bindMapEvent();
      setLoaded(true);
    },
    { ak },
  );
  const finalContainerRef: any = useMemo(() => {
    return ref || MapRef;
  }, [ref]);

  const createMapView = () => {
    const BMap = BMapInstance.current;
    MapRef.current = new BMap.Map(id, initMapProps);
    const point = new BMap.Point(center.lng, center.lat);
    MapRef.current.centerAndZoom(point, zoom);
    if (finalContainerRef.current) {
      finalContainerRef.current = MapRef.current;
    }
  };

  useEffect(() => {
    const BMap = BMapInstance.current;
    const map = MapRef.current;
    if (loaded) {
      map.centerAndZoom(new BMap.Point(center.lng, center.lat), zoom);
    }
  }, [center, zoom, loaded]);

  useImperativeHandle(ref, () => ({}), []);

  return (
    <div ref={finalContainerRef} style={style} id={id} {...restProps}>
      {loaded && children}
    </div>
  );
};

export default forwardRef(BDMap);
