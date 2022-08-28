import{a9 as e,a2 as t,aa as r}from"http://47.93.229.170:8081/assets/index.c5edfc93.js";var n,o={exports:{}},i={exports:{}},s=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},a=s,u=Object.prototype.toString,c=(n=Object.create(null),function(e){var t=u.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())});function f(e){return e=e.toLowerCase(),function(t){return c(t)===e}}function l(e){return Array.isArray(e)}function d(e){return void 0===e}var p=f("ArrayBuffer");function h(e){return null!==e&&"object"==typeof e}function m(e){if("object"!==c(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}var v=f("Date"),g=f("File"),E=f("Blob"),y=f("FileList");function b(e){return"[object Function]"===u.call(e)}var O=f("URLSearchParams");function R(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),l(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var w,A=(w="undefined"!=typeof Uint8Array&&Object.getPrototypeOf(Uint8Array),function(e){return w&&e instanceof w}),T={isArray:l,isArrayBuffer:p,isBuffer:function(e){return null!==e&&!d(e)&&null!==e.constructor&&!d(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){var t="[object FormData]";return e&&("function"==typeof FormData&&e instanceof FormData||u.call(e)===t||b(e.toString)&&e.toString()===t)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&p(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:h,isPlainObject:m,isUndefined:d,isDate:v,isFile:g,isBlob:E,isFunction:b,isStream:function(e){return h(e)&&b(e.pipe)},isURLSearchParams:O,isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:R,merge:function e(){var t={};function r(r,n){m(t[n])&&m(r)?t[n]=e(t[n],r):m(r)?t[n]=e({},r):l(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)R(arguments[n],r);return t},extend:function(e,t,r){return R(t,(function(t,n){e[n]=r&&"function"==typeof t?a(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e},inherits:function(e,t,r,n){e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,r&&Object.assign(e.prototype,r)},toFlatObject:function(e,t,r){var n,o,i,s={};t=t||{};do{for(o=(n=Object.getOwnPropertyNames(e)).length;o-- >0;)s[i=n[o]]||(t[i]=e[i],s[i]=!0);e=Object.getPrototypeOf(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:c,kindOfTest:f,endsWith:function(e,t,r){e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;var n=e.indexOf(t,r);return-1!==n&&n===r},toArray:function(e){if(!e)return null;var t=e.length;if(d(t))return null;for(var r=new Array(t);t-- >0;)r[t]=e[t];return r},isTypedArray:A,isFileList:y},_=T;function S(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var x=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(_.isURLSearchParams(t))n=t.toString();else{var o=[];_.forEach(t,(function(e,t){null!=e&&(_.isArray(e)?t+="[]":e=[e],_.forEach(e,(function(e){_.isDate(e)?e=e.toISOString():_.isObject(e)&&(e=JSON.stringify(e)),o.push(S(t)+"="+S(e))})))})),n=o.join("&")}if(n){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e},C=T;function P(){this.handlers=[]}P.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},P.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},P.prototype.forEach=function(e){C.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var j=P,N=T,U=T;function B(e,t,r,n,o){Error.call(this),this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o)}U.inherits(B,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var D=B.prototype,k={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(e){k[e]={value:e}})),Object.defineProperties(B,k),Object.defineProperty(D,"isAxiosError",{value:!0}),B.from=function(e,t,r,n,o,i){var s=Object.create(D);return U.toFlatObject(e,s,(function(e){return e!==Error.prototype})),B.call(s,e.message,t,r,n,o),s.name=e.name,i&&Object.assign(s,i),s};var L=B,I={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},F=T;var q,V,M,J,z=function(e,t){t=t||new FormData;var r=[];function n(e){return null===e?"":F.isDate(e)?e.toISOString():F.isArrayBuffer(e)||F.isTypedArray(e)?"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}return function e(o,i){if(F.isPlainObject(o)||F.isArray(o)){if(-1!==r.indexOf(o))throw Error("Circular reference detected in "+i);r.push(o),F.forEach(o,(function(r,o){if(!F.isUndefined(r)){var s,a=i?i+"."+o:o;if(r&&!i&&"object"==typeof r)if(F.endsWith(o,"{}"))r=JSON.stringify(r);else if(F.endsWith(o,"[]")&&(s=F.toArray(r)))return void s.forEach((function(e){!F.isUndefined(e)&&t.append(a,n(e))}));e(r,a)}})),r.pop()}else t.append(i,n(o))}(e),t};var H,W,$,X,K,Q,G,Y,Z,ee,te,re,ne=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},oe=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},ie=function(e,t){return e&&!ne(t)?oe(e,t):t};function se(){if(Q)return K;Q=1;var e=L;function t(t){e.call(this,null==t?"canceled":t,e.ERR_CANCELED),this.name="CanceledError"}return T.inherits(t,e,{__CANCEL__:!0}),K=t}function ae(){if(ee)return Z;ee=1;var e=T,t=function(){if(V)return q;V=1;var e=L;return q=function(t,r,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?r(new e("Request failed with status code "+n.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):t(n)}}(),r=function(){if(J)return M;J=1;var e=T;return M=e.isStandardBrowserEnv()?{write:function(t,r,n,o,i,s){var a=[];a.push(t+"="+encodeURIComponent(r)),e.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),e.isString(o)&&a.push("path="+o),e.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}}(),n=x,o=ie,i=function(){if(W)return H;W=1;var e=T,t=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return H=function(r){var n,o,i,s={};return r?(e.forEach(r.split("\n"),(function(r){if(i=r.indexOf(":"),n=e.trim(r.substr(0,i)).toLowerCase(),o=e.trim(r.substr(i+1)),n){if(s[n]&&t.indexOf(n)>=0)return;s[n]="set-cookie"===n?(s[n]?s[n]:[]).concat([o]):s[n]?s[n]+", "+o:o}})),s):s}}(),s=function(){if(X)return $;X=1;var e=T;return $=e.isStandardBrowserEnv()?function(){var t,r=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var t=e;return r&&(n.setAttribute("href",t),t=n.href),n.setAttribute("href",t),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return t=o(window.location.href),function(r){var n=e.isString(r)?o(r):r;return n.protocol===t.protocol&&n.host===t.host}}():function(){return!0}}(),a=I,u=L,c=se(),f=Y?G:(Y=1,G=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""});return Z=function(l){return new Promise((function(d,p){var h,m=l.data,v=l.headers,g=l.responseType;function E(){l.cancelToken&&l.cancelToken.unsubscribe(h),l.signal&&l.signal.removeEventListener("abort",h)}e.isFormData(m)&&e.isStandardBrowserEnv()&&delete v["Content-Type"];var y=new XMLHttpRequest;if(l.auth){var b=l.auth.username||"",O=l.auth.password?unescape(encodeURIComponent(l.auth.password)):"";v.Authorization="Basic "+btoa(b+":"+O)}var R=o(l.baseURL,l.url);function w(){if(y){var e="getAllResponseHeaders"in y?i(y.getAllResponseHeaders()):null,r={data:g&&"text"!==g&&"json"!==g?y.response:y.responseText,status:y.status,statusText:y.statusText,headers:e,config:l,request:y};t((function(e){d(e),E()}),(function(e){p(e),E()}),r),y=null}}if(y.open(l.method.toUpperCase(),n(R,l.params,l.paramsSerializer),!0),y.timeout=l.timeout,"onloadend"in y?y.onloadend=w:y.onreadystatechange=function(){y&&4===y.readyState&&(0!==y.status||y.responseURL&&0===y.responseURL.indexOf("file:"))&&setTimeout(w)},y.onabort=function(){y&&(p(new u("Request aborted",u.ECONNABORTED,l,y)),y=null)},y.onerror=function(){p(new u("Network Error",u.ERR_NETWORK,l,y,y)),y=null},y.ontimeout=function(){var e=l.timeout?"timeout of "+l.timeout+"ms exceeded":"timeout exceeded",t=l.transitional||a;l.timeoutErrorMessage&&(e=l.timeoutErrorMessage),p(new u(e,t.clarifyTimeoutError?u.ETIMEDOUT:u.ECONNABORTED,l,y)),y=null},e.isStandardBrowserEnv()){var A=(l.withCredentials||s(R))&&l.xsrfCookieName?r.read(l.xsrfCookieName):void 0;A&&(v[l.xsrfHeaderName]=A)}"setRequestHeader"in y&&e.forEach(v,(function(e,t){void 0===m&&"content-type"===t.toLowerCase()?delete v[t]:y.setRequestHeader(t,e)})),e.isUndefined(l.withCredentials)||(y.withCredentials=!!l.withCredentials),g&&"json"!==g&&(y.responseType=l.responseType),"function"==typeof l.onDownloadProgress&&y.addEventListener("progress",l.onDownloadProgress),"function"==typeof l.onUploadProgress&&y.upload&&y.upload.addEventListener("progress",l.onUploadProgress),(l.cancelToken||l.signal)&&(h=function(e){y&&(p(!e||e&&e.type?new c:e),y.abort(),y=null)},l.cancelToken&&l.cancelToken.subscribe(h),l.signal&&(l.signal.aborted?h():l.signal.addEventListener("abort",h))),m||(m=null);var T=f(R);T&&-1===["http","https","file"].indexOf(T)?p(new u("Unsupported protocol "+T+":",u.ERR_BAD_REQUEST,l)):y.send(m)}))}}var ue=T,ce=function(e,t){N.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))},fe=L,le=z,de={"Content-Type":"application/x-www-form-urlencoded"};function pe(e,t){!ue.isUndefined(e)&&ue.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var he,me={transitional:I,adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(he=ae()),he),transformRequest:[function(e,t){if(ce(t,"Accept"),ce(t,"Content-Type"),ue.isFormData(e)||ue.isArrayBuffer(e)||ue.isBuffer(e)||ue.isStream(e)||ue.isFile(e)||ue.isBlob(e))return e;if(ue.isArrayBufferView(e))return e.buffer;if(ue.isURLSearchParams(e))return pe(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var r,n=ue.isObject(e),o=t&&t["Content-Type"];if((r=ue.isFileList(e))||n&&"multipart/form-data"===o){var i=this.env&&this.env.FormData;return le(r?{"files[]":e}:e,i&&new i)}return n||"application/json"===o?(pe(t,"application/json"),function(e,t,r){if(ue.isString(e))try{return(t||JSON.parse)(e),ue.trim(e)}catch(n){if("SyntaxError"!==n.name)throw n}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||me.transitional,r=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,o=!r&&"json"===this.responseType;if(o||n&&ue.isString(e)&&e.length)try{return JSON.parse(e)}catch(i){if(o){if("SyntaxError"===i.name)throw fe.from(i,fe.ERR_BAD_RESPONSE,this,null,this.response);throw i}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:re?te:(re=1,te=null)},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};ue.forEach(["delete","get","head"],(function(e){me.headers[e]={}})),ue.forEach(["post","put","patch"],(function(e){me.headers[e]=ue.merge(de)}));var ve,ge,Ee=me,ye=T,be=Ee;function Oe(){return ge?ve:(ge=1,ve=function(e){return!(!e||!e.__CANCEL__)})}var Re=T,we=function(e,t,r){var n=this||be;return ye.forEach(r,(function(r){e=r.call(n,e,t)})),e},Ae=Oe(),Te=Ee,_e=se();function Se(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new _e}var xe,Ce,Pe=T,je=function(e,t){t=t||{};var r={};function n(e,t){return Pe.isPlainObject(e)&&Pe.isPlainObject(t)?Pe.merge(e,t):Pe.isPlainObject(t)?Pe.merge({},t):Pe.isArray(t)?t.slice():t}function o(r){return Pe.isUndefined(t[r])?Pe.isUndefined(e[r])?void 0:n(void 0,e[r]):n(e[r],t[r])}function i(e){if(!Pe.isUndefined(t[e]))return n(void 0,t[e])}function s(r){return Pe.isUndefined(t[r])?Pe.isUndefined(e[r])?void 0:n(void 0,e[r]):n(void 0,t[r])}function a(r){return r in t?n(e[r],t[r]):r in e?n(void 0,e[r]):void 0}var u={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a};return Pe.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||o,n=t(e);Pe.isUndefined(n)&&t!==a||(r[e]=n)})),r};function Ne(){return Ce?xe:(Ce=1,xe={version:"0.27.2"})}var Ue=Ne().version,Be=L,De={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){De[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var ke={};De.transitional=function(e,t,r){return function(n,o,i){if(!1===e)throw new Be(function(e,t){return"[Axios v"+Ue+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}(o," has been removed"+(t?" in "+t:"")),Be.ERR_DEPRECATED);return t&&!ke[o]&&(ke[o]=!0),!e||e(n,o,i)}};var Le,Ie,Fe,qe,Ve,Me,Je=T,ze=x,He=j,We=function(e){return Se(e),e.headers=e.headers||{},e.data=we.call(e,e.data,e.headers,e.transformRequest),e.headers=Re.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Re.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||Te.adapter)(e).then((function(t){return Se(e),t.data=we.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return Ae(t)||(Se(e),t&&t.response&&(t.response.data=we.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},$e=je,Xe=ie,Ke={assertOptions:function(e,t,r){if("object"!=typeof e)throw new Be("options must be an object",Be.ERR_BAD_OPTION_VALUE);for(var n=Object.keys(e),o=n.length;o-- >0;){var i=n[o],s=t[i];if(s){var a=e[i],u=void 0===a||s(a,i,e);if(!0!==u)throw new Be("option "+i+" must be "+u,Be.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new Be("Unknown option "+i,Be.ERR_BAD_OPTION)}},validators:De},Qe=Ke.validators;function Ge(e){this.defaults=e,this.interceptors={request:new He,response:new He}}Ge.prototype.request=function(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},(t=$e(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var r=t.transitional;void 0!==r&&Ke.assertOptions(r,{silentJSONParsing:Qe.transitional(Qe.boolean),forcedJSONParsing:Qe.transitional(Qe.boolean),clarifyTimeoutError:Qe.transitional(Qe.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,n.unshift(e.fulfilled,e.rejected))}));var i,s=[];if(this.interceptors.response.forEach((function(e){s.push(e.fulfilled,e.rejected)})),!o){var a=[We,void 0];for(Array.prototype.unshift.apply(a,n),a=a.concat(s),i=Promise.resolve(t);a.length;)i=i.then(a.shift(),a.shift());return i}for(var u=t;n.length;){var c=n.shift(),f=n.shift();try{u=c(u)}catch(l){f(l);break}}try{i=We(u)}catch(l){return Promise.reject(l)}for(;s.length;)i=i.then(s.shift(),s.shift());return i},Ge.prototype.getUri=function(e){e=$e(this.defaults,e);var t=Xe(e.baseURL,e.url);return ze(t,e.params,e.paramsSerializer)},Je.forEach(["delete","get","head","options"],(function(e){Ge.prototype[e]=function(t,r){return this.request($e(r||{},{method:e,url:t,data:(r||{}).data}))}})),Je.forEach(["post","put","patch"],(function(e){function t(t){return function(r,n,o){return this.request($e(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}Ge.prototype[e]=t(),Ge.prototype[e+"Form"]=t(!0)}));var Ye=T,Ze=s,et=Ge,tt=je;var rt=function e(t){var r=new et(t),n=Ze(et.prototype.request,r);return Ye.extend(n,et.prototype,r),Ye.extend(n,r),n.create=function(r){return e(tt(t,r))},n}(Ee);rt.Axios=et,rt.CanceledError=se(),rt.CancelToken=function(){if(Ie)return Le;Ie=1;var e=se();function t(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var r;this.promise=new Promise((function(e){r=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},t((function(t){n.reason||(n.reason=new e(t),r(n.reason))}))}return t.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},t.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},t.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},t.source=function(){var e;return{token:new t((function(t){e=t})),cancel:e}},Le=t}(),rt.isCancel=Oe(),rt.VERSION=Ne().version,rt.toFormData=z,rt.AxiosError=L,rt.Cancel=rt.CanceledError,rt.all=function(e){return Promise.all(e)},rt.spread=qe?Fe:(qe=1,Fe=function(e){return function(t){return e.apply(null,t)}}),rt.isAxiosError=function(){if(Me)return Ve;Me=1;var e=T;return Ve=function(t){return e.isObject(t)&&!0===t.isAxiosError}}(),i.exports=rt,i.exports.default=rt;const nt=e(o.exports=i.exports),ot={base:"http://47.93.229.170:5000"};
/*! js-cookie v3.0.1 | MIT */
function it(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)e[n]=r[n]}return e}var st=function e(t,r){function n(e,n,o){if("undefined"!=typeof document){"number"==typeof(o=it({},r,o)).expires&&(o.expires=new Date(Date.now()+864e5*o.expires)),o.expires&&(o.expires=o.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var s in o)o[s]&&(i+="; "+s,!0!==o[s]&&(i+="="+o[s].split(";")[0]));return document.cookie=e+"="+t.write(n,e)+i}}return Object.create({set:n,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var r=document.cookie?document.cookie.split("; "):[],n={},o=0;o<r.length;o++){var i=r[o].split("="),s=i.slice(1).join("=");try{var a=decodeURIComponent(i[0]);if(n[a]=t.read(s,a),e===a)break}catch(u){}}return e?n[e]:n}},remove:function(e,t){n(e,"",it({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,it({},this.attributes,t))},withConverter:function(t){return e(it({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});function at(e,t){const r=new Error(e);throw ut(r,t),r}function ut(e,t){let n=e.message;e.message.includes("timeout")&&(n="[ code: 408 ] "+e.message),r.error({content:n,title:t||"Error",duration:5e3}),e.message.includes("401")}const ct=nt.create({baseURL:"http://47.93.229.170:5000",timeout:6e5});ct.interceptors.request.use((e=>(e.service&&(e.baseURL=ot[e.service]),e.headers["Base-Version"]={VITE_USER_NODE_ENV:"production",VITE_BASE:"/base/chat/",VITE_APP_TITLE:"chat-prod",VITE_APP_BUILD_INFO:"production",VITE_APP_BASE_API:"http://47.93.229.170:5000",VITE_APP_BUILD_MODE:"false",VITE_API:"http://47.93.229.170:3000",BASE_URL:"http://47.93.229.170:8081/",MODE:"production",DEV:!1,PROD:!0}.VITE_APP_VERSION,e.headers["x-csrf-token"]=st.get("csrfToken"),t().getToken&&(e.headers.Authorization=`Bearer ${t().getToken}`),e)),(e=>Promise.reject(e))),ct.interceptors.response.use((e=>{const t=e.data,{code:r}=t;if(void 0===r)return t;switch(r){case 200:return t;case 0:return t.data;default:at(t.msg,e.config.url)}}),(e=>{if(e&&e.response)switch(e.response.status){case 400:e.message=`[ code: 400 ] server error 请求错误 ${e.response.data.msg||""}`;break;case 401:e.message="[ code: 401 ] server error 未授权，请登录";break;case 403:e.message="[ code: 403 ] server error 拒绝访问";break;case 404:e.message=`[ code: 404 ] server error 请求地址出错: ${e.response.config.url}`;break;case 408:e.message="[ code: 408 ] server error 请求超时";break;case 413:e.message=`[ code: 413 ] server error Nginx等其他配置文件错误，${e.response.config.url}`;break;case 500:e.message="[ code: 500 ] server error 服务器内部错误";break;case 501:e.message="[ code: 501 ] server error 服务未实现";break;case 502:e.message="[ code: 502 ] server error 网关错误";break;case 503:e.message="[ code: 503 ] server error 服务不可用";break;case 504:e.message="[ code: 504 ] server error 网关超时";break;case 505:e.message="[ code: 505 ] server error HTTP版本不受支持"}return ut(e),Promise.reject(e)}));const ft=ct;export{ft as r};
