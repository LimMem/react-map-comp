
/**
 * 百度地图 hooks文件
 */
import { useEffect, useRef, useState } from 'react'

const win = (window as any);

export interface BMapLoadedAttribute {
  ak: string;
  uri?: string;
}

const useBMapDidLoad = (didLoadCallback: () => void, { ak, uri }: BMapLoadedAttribute) => {
  const [loaded, setLoaded] = useState(false);
  const loadedTimer = useRef();
  const apiTimer = useRef();

  const isLoadReady = () => {
    return !!(win.BMap && win.BMap.Map);
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
    if (win['loadingBMap']) {
      apiTimer.current = win.setTimeout(() => {
        loadApiJS();
      }, 300);
    } else if (!win['BMapApiLoaderCallback']) {
      installBMap();
    }
  };

  const installBMap = () => {
    win['loadingBMap'] = true;
    win['BMapApiLoaderCallback'] = () => {
      delete win['loadingBMap'];
      delete win['BMapApiLoaderCallback'];
    };

    let url = `//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=BMapApiLoaderCallback`;
    if (uri) {
      url = `${uri}&callback=BMapApiLoaderCallback`;
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
      if (!ak) {
        throw new TypeError('BMap: ak is required');
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
export default useBMapDidLoad;
