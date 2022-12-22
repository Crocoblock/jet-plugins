(()=>{"use strict";const t=function(t){return"string"!=typeof t||""===t?(console.error("The namespace must be a non-empty string."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(t)||(console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."),!1)},n=function(t){return"string"!=typeof t||""===t?(console.error("The hook name must be a non-empty string."),!1):/^__/.test(t)?(console.error("The hook name cannot begin with `__`."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(t)||(console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."),!1)},e=function(e,r){return function(o,i,s){let c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10;const l=e[r];if(!n(o))return;if(!t(i))return;if("function"!=typeof s)return void console.error("The hook callback must be a function.");if("number"!=typeof c)return void console.error("If specified, the hook priority must be a number.");const a={callback:s,priority:c,namespace:i};if(l[o]){const t=l[o].handlers;let n;for(n=t.length;n>0&&!(c>=t[n-1].priority);n--);n===t.length?t[n]=a:t.splice(n,0,a),l.__current.forEach((t=>{t.name===o&&t.currentIndex>=n&&t.currentIndex++}))}else l[o]={handlers:[a],runs:0};"hookAdded"!==o&&e.doAction("hookAdded",o,i,s,c)}},r=function(e,r){let o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(i,s){const c=e[r];if(!n(i))return;if(!o&&!t(s))return;if(!c[i])return 0;let l=0;if(o)l=c[i].handlers.length,c[i]={runs:c[i].runs,handlers:[]};else{const t=c[i].handlers;for(let n=t.length-1;n>=0;n--)t[n].namespace===s&&(t.splice(n,1),l++,c.__current.forEach((t=>{t.name===i&&t.currentIndex>=n&&t.currentIndex--})))}return"hookRemoved"!==i&&e.doAction("hookRemoved",i,s),l}},o=function(t,n){return function(e,r){const o=t[n];return void 0!==r?e in o&&o[e].handlers.some((t=>t.namespace===r)):e in o}},i=function(t,n){let e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(r){const o=t[n];o[r]||(o[r]={handlers:[],runs:0}),o[r].runs++;const i=o[r].handlers;for(var s=arguments.length,c=new Array(s>1?s-1:0),l=1;l<s;l++)c[l-1]=arguments[l];if(!i||!i.length)return e?c[0]:void 0;const a={name:r,currentIndex:0};for(o.__current.push(a);a.currentIndex<i.length;){const t=i[a.currentIndex].callback.apply(null,c);e&&(c[0]=t),a.currentIndex++}return o.__current.pop(),e?c[0]:void 0}},s=function(t,n){return function(){var e,r;const o=t[n];return null!==(e=null===(r=o.__current[o.__current.length-1])||void 0===r?void 0:r.name)&&void 0!==e?e:null}},c=function(t,n){return function(e){const r=t[n];return void 0===e?void 0!==r.__current[0]:!!r.__current[0]&&e===r.__current[0].name}},l=function(t,e){return function(r){const o=t[e];if(n(r))return o[r]&&o[r].runs?o[r].runs:0}};class a{constructor(){this.actions=Object.create(null),this.actions.__current=[],this.filters=Object.create(null),this.filters.__current=[],this.addAction=e(this,"actions"),this.addFilter=e(this,"filters"),this.removeAction=r(this,"actions"),this.removeFilter=r(this,"filters"),this.hasAction=o(this,"actions"),this.hasFilter=o(this,"filters"),this.removeAllActions=r(this,"actions",!0),this.removeAllFilters=r(this,"filters",!0),this.doAction=i(this,"actions"),this.applyFilters=i(this,"filters",!0),this.currentAction=s(this,"actions"),this.currentFilter=s(this,"filters"),this.doingAction=c(this,"actions"),this.doingFilter=c(this,"filters"),this.didAction=l(this,"actions"),this.didFilter=l(this,"filters")}}const u=function(){return new a},h=u(),{addAction:f,addFilter:d,removeAction:m,removeFilter:p,hasAction:b,hasFilter:v,removeAllActions:y,removeAllFilters:k,doAction:g,applyFilters:A,currentAction:_,currentFilter:F,doingAction:w,doingFilter:I,didAction:j,didFilter:B,actions:x,filters:N}=h;function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function T(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,O(r.key),r)}}function P(t,n,e){return(n=O(n))in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function O(t){var n=function(t,n){if("object"!==S(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===S(n)?n:String(n)}var z=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),P(this,"hooks",void 0),P(this,"globalNamespace","jet-plugins"),P(this,"blocksNamespace","frontend.element-ready"),this.hooks=n||u()}var n,e;return n=t,(e=[{key:"hookNameFromBlock",value:function(t){return"".concat(this.globalNamespace,".").concat(this.blocksNamespace,".").concat(t.replace("/","."))}},{key:"init",value:function(t,n){var e=this;n&&n.length&&this.bulkBlocksInit(n),(t=t||jQuery("body")).find('[data-is-block*="/"]').each((function(t,n){e.initBlock(n)}))}},{key:"initBlock",value:function(t){t.dataset.isBlock&&this.hooks.doAction(this.hookNameFromBlock(t.dataset.isBlock),jQuery(t))}},{key:"bulkBlocksInit",value:function(t){for(var n=0;n<t.length;n++)this.hooks.addAction(this.hookNameFromBlock(t[n].block),"".concat(this.globalNamespace,"/").concat(t[n].block),t[n].callback)}}])&&T(n.prototype,e),Object.defineProperty(n,"prototype",{writable:!1}),t}();window.JetPlugins=window.JetPlugins||new z})();