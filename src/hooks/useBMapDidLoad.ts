
/**
 * 百度地图 hooks文件
 */
import { useEffect, useRef, useCallback } from 'react'

const win = (window as any);

export interface BMapLoadedAttribute {
  ak: string;
  uri?: string;
}

const useBMapDidLoad = (didLoadCallback: () => void, { ak, uri }: BMapLoadedAttribute) => {
  const loadedTimer = useRef();
  const apiTimer = useRef();
  const loadRef = useRef(false);

  const isLoadReady = () => {
    return !!(win.BMap && win.BMap.Map);
  }

  const loadFinish = useCallback(
    () => {
      cancelAllSubscriptions();
      if (!loadRef.current) {
        didLoadCallback();
        loadRef.current = true;
      }
    },
    [ak],
  );

  const handleLoaded = () => {
    if (!isLoadReady()) {
      loadedTimer.current = win.setTimeout(() => {
        handleLoaded();
      }, 300);
      return;
    }
    loadFinish();
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
    jsapi.onload = handleLoaded;
  }

  const cancelAllSubscriptions = () => {
    if (loadedTimer.current) {
      clearTimeout(loadedTimer.current);
    }
    if (apiTimer.current) {
      clearTimeout(apiTimer.current);
    }
    if (win['BMapApiLoaderCallback']) {
      delete win['BMapApiLoaderCallback'];
    }

    if (win['loadingBMap']) {
      delete win['loadingBMap'];
    }
  }

  const loadApiJSCB = useCallback(loadApiJS, [ak])

  useEffect(() => {
    if (!isLoadReady()) {
      if (!ak) {
        return;
      }
      loadApiJSCB();
      return;
    }
    loadFinish();
    return cancelAllSubscriptions;
  }, [ak]);
};
export default useBMapDidLoad;
