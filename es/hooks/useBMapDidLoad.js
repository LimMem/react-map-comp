function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 高德地图 hooks文件
 */
import { useEffect, useRef, useState } from 'react';
var win = window;

var useBMapDidLoad = function useBMapDidLoad(didLoadCallback, _ref) {
  var ak = _ref.ak,
      uri = _ref.uri;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  var loadedTimer = useRef();
  var apiTimer = useRef();

  var isLoadReady = function isLoadReady() {
    return !!(win.BMap && win.BMap.Map);
  };

  var handleLoaded = function handleLoaded() {
    if (!isLoadReady()) {
      loadedTimer.current = win.setTimeout(function () {
        handleLoaded();
      }, 300);
      return;
    }

    setLoaded(true);
    didLoadCallback();
  };

  var loadApiJS = function loadApiJS() {
    if (isLoadReady()) {
      handleLoaded();
      return;
    }

    if (win['loadingBMap']) {
      apiTimer.current = win.setTimeout(function () {
        loadApiJS();
      }, 300);
    } else if (!win['BMapApiLoaderCallback']) {
      installBMap();
    }
  };

  var installBMap = function installBMap() {
    win['loadingBMap'] = true;

    win['BMapApiLoaderCallback'] = function () {
      delete win['loadingBMap'];
      delete win['BMapApiLoaderCallback'];
    };

    var url = "//api.map.baidu.com/api?v=3.0&ak=".concat(ak, "&callback=BMapApiLoaderCallback");

    if (uri) {
      url = "".concat(uri, "&callback=BMapApiLoaderCallback");
    }

    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
    loadedTimer.current = win.setTimeout(function () {
      handleLoaded();
    }, 300);
  };

  useEffect(function () {
    if (!isLoadReady()) {
      if (!ak) {
        throw new TypeError('BMap: ak is required');
      }

      loadApiJS();
      return;
    }

    handleLoaded();
    return function () {
      if (loadedTimer.current) {
        clearTimeout(loadedTimer.current);
      }

      if (apiTimer.current) {
        clearTimeout(apiTimer.current);
      }
    };
  }, []);
  return loaded;
};

export default useBMapDidLoad;