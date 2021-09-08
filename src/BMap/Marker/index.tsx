import React, { FC, useEffect, useRef } from 'react';
import { BMapMarker } from '../PropType';

const win: any = window;
const Marker: FC<BMapMarker> = (props) => {
  const { map, point, ...opts } = props;
  const markRef = useRef();

  const initMarker = () => {
    if (map && map.current && point) {
      const markPoint = new win.BMap.Point(point.lng, point.lat);
      markRef.current = new win.BMap.Marker(markPoint); // 创建标注
      map.current.addOverlay(markPoint, opts);
    }
  };

  useEffect(() => {
    if (!markRef || !markRef.current) {
      initMarker();
    }
    // 下面开始更新
  });

  return <></>;
};

export default Marker;
