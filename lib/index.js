"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AMap: true
};
Object.defineProperty(exports, "AMap", {
  enumerable: true,
  get: function get() {
    return _AMap.default;
  }
});

var _hooks = require("./hooks");

Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hooks[key];
    }
  });
});

var _AMap = _interopRequireDefault(require("./AMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }