
/**
 * 高德地图 hooks文件
 */
import { useEffect, useRef, useState } from 'react'

const win = (window as any);

export interface AMapLoadedAttribute {
  key: string;
  uri?: string;
}

const useAMapDidLoad = (didLoadCallback: () => void, { key, uri }: AMapLoadedAttribute) => {
  const [loaded, setLoaded] = useState(false);
  const loadedTimer = useRef();
  const apiTimer = useRef();

  const isLoadReady = () => {
    return !!(win.AMap && win.AMap.Map);
  }

  const handleLoaded = () => {
    if (!isLoadReady()) {
      loadedTimer.current = win.setTimeout(() => {
        handleLoaded();
      }, 300);
      return;
    }
    setLoaded(true);
    didLoadCallback();
  }

  const loadApiJS = () => {
    if (isLoadReady()) {
      handleLoaded();
      return;
    }
    if (win['loadingAMap']) {
      apiTimer.current = win.setTimeout(() => {
        loadApiJS();
      }, 300);
    } else if (!win['AMapApiLoaderCallback']) {
      installAMap();
    }
  };

  const installAMap = () => {
    win['loadingAMap'] = true;
    win['AMapApiLoaderCallback'] = () => {
      delete win['loadingAMap'];
      delete win['AMapApiLoaderCallback'];
    };

    let url = `//webapi.amap.com/maps?v=1.4.15&key=${key}&callback=AMapApiLoaderCallback`;
    if (uri) {
      url = `${uri}&callback=AMapApiLoaderCallback`;
    }

    const jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
    loadedTimer.current = win.setTimeout(() => {
      handleLoaded();
    }, 300);
  }

  useEffect(() => {
    if (!isLoadReady()) {
      if (!key) {
        throw new TypeError('AMap: key is required');
      }
      loadApiJS();
      return;
    }
    handleLoaded();
    return () => {
      if (loadedTimer.current) {
        clearTimeout(loadedTimer.current);
      }
      if (apiTimer.current) {
        clearTimeout(apiTimer.current);
      }
    }
  }, []);
  return loaded;
};

export default useAMapDidLoad;
