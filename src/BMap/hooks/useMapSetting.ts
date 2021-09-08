import React, { useEffect } from 'react';
import { useBMapDidLoad } from "../../hooks";
import { mapEvents } from "../utils/mapEvent";

export const useMapSetting = ({ mapRef, props }: { mapRef: React.MutableRefObject<any>, props: any }) => {

  const bindMapEvent = () => {
    if (mapRef && mapRef.current && mapRef.current.addEventListener) {
      Object.keys(mapEvents).forEach(event => {
        const targetEvent = mapEvents[event];
        mapRef.current.addEventListener(event, props[targetEvent]);
      })
    }
  }

  useEffect(() => {
    return () => {
      if (mapRef && mapRef.current && mapRef.current.removeEventListener) {
        Object.keys(mapEvents).forEach(event => {
          const targetEvent = mapEvents[event];
          mapRef.current.removeEventListener(event, props[targetEvent]);
        })
      }
    }
  }, [])

  return {
    bindMapEvent
  }
};
