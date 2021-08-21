var _excluded = ["akey"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef, forwardRef, useMemo } from 'react';
import { useAMapDidLoad } from '../hooks';
var win = window;

var Map = function Map(props, ref) {
  var key = props.akey,
      resetProps = _objectWithoutProperties(props, _excluded);

  var mapRef = useRef(null);
  var mapContainerRef = useRef(null);
  var finalContainerRef = useMemo(function () {
    return ref || mapContainerRef;
  }, [ref]);
  useAMapDidLoad(function () {
    if (finalContainerRef) {
      mapRef.current = new win.AMap.Map(finalContainerRef.current);
      mapRef.current.on('complete', function () {// 地图图块加载完成后触发
      });

      if (finalContainerRef.current) {
        finalContainerRef.current['amap'] = mapRef.current;
      }
    }
  }, {
    key: key
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    id: "map",
    ref: finalContainerRef
  }, resetProps));
};

export default /*#__PURE__*/forwardRef(Map);