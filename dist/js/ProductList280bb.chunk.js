webpackJsonp([5],{376:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var c=n(8),f=o(c),s=n(379),p=o(s),a=function(t){function e(t,n){r(this,e);var o=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return o.shouldComponentUpdate=p.default.shouldComponentUpdate.bind(o),o}return i(e,t),e}(f.default.Component);e.default=a},379:function(t,e,n){"use strict";var o=n(386);t.exports={shouldComponentUpdate:function(t,e){return!o(this.props,t)||!o(this.state,e)}}},386:function(t,e,n){"use strict";function o(t,e){return t===e?0!==t||0!==e||1/t==1/e:t!==t&&e!==e}function r(t,e){if(o(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(var i=0;i<n.length;i++)if(!u.call(e,n[i])||!o(t[n[i]],e[n[i]]))return!1;return!0}var u=Object.prototype.hasOwnProperty;t.exports=r}});