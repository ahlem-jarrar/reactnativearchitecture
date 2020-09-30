"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const fromEntries = arr => arr.reduce((acc, [k, v]) => {
  acc[k] = v;
  return acc;
}, {});

var _default = fromEntries;
exports.default = _default;
//# sourceMappingURL=fromEntries.js.map