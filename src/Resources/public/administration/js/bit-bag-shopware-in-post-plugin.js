!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/bundles/bitbagshopwareinpostplugin/",n(n.s="14tI")}({"+wCh":function(e,t){e.exports='<div class="inpost-point-detail">\n    <div class="image" ref="pointImageDiv">\n        <img src="xxxHTMLLINKxxx0.8646179456467160.17811809123587152xxx" alt="{{ $tc(\'cardDetails.pointName\') }}" ref="pointImage" />\n    </div>\n\n    <div class="information">\n        <p class="text-bold" ref="pointName"></p>\n        <p ref="street"></p>\n        <p ref="postCode"></p>\n        <p ref="city"></p>\n        <p ref="province"></p>\n    </div>\n</div>\n'},"14tI":function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(t);var d=Shopware.Classes.ApiService,l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(u,e);var t,n,r,c=s(u);function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return o(this,u),c.call(this,e,t,n)}return t=u,(n=[{key:"createPackage",value:function(e){var t="".concat(this.getApiBasePath(),"/_action/bitbag-inpost-plugin/package/").concat(e);return this.httpClient.post(t,{},{headers:this.getBasicHeaders()}).then((function(e){if(201===e.status)return d.handleResponse(e)}))}},{key:"getLabel",value:function(e){var t="".concat(this.getApiBasePath(),"/_action/bitbag-inpost-plugin/label/").concat(e);return this.httpClient.get(t,{responseType:"blob"},{headers:this.getBasicHeaders()})}},{key:"getOrder",value:function(e){var t="".concat(this.getApiBasePath(),"/order/").concat(e);return this.httpClient.get(t,{},{headers:this.getBasicHeaders()})}},{key:"getInpostDataByPointName",value:function(e){var t="https://api-pl-points.easypack24.net/v1/points/".concat(e);return this.httpClient.get(t)}}])&&i(t.prototype,n),r&&i(t,r),u}(d),p=Shopware.Application;p.addServiceProvider("CustomApiService",(function(e){var t=p.getContainer("init");return new l(t.httpClient,e.loginService)}));var f=n("M/VT"),h=n.n(f);n("i7bm");Shopware.Component.register("sw-order-detail-inpost-detail-card",{template:h.a,inject:["CustomApiService"],props:["order"],data:function(){return{showCard:!1}},created:function(){var e=this,t=this.order;this.getInPostResponseData(t).then((function(t){t&&(e.showCard=!0)}))},methods:{getInPostResponseData:function(e){var t=this;if(e&&e.extensions&&e.extensions.inPost){var n=e.extensions.inPost.pointName;if(n)return this.CustomApiService.getInpostDataByPointName(n).then((function(e){if(!e.data||!e.data.error)return e.data;t.showCard=!0}))}}}});var v=n("d+vc"),g=n.n(v),m=Shopware,b=m.Component,y=m.Mixin;b.register("sw-order-detail-inpost-detail-card--create-package",{template:g.a,inject:["CustomApiService"],mixins:[y.getByName("notification")],props:["order"],data:function(){return{showButton:!0}},created:function(){var e,t,n=this.order;null!=n&&null!==(e=n.extensions)&&void 0!==e&&null!==(t=e.inPost)&&void 0!==t&&t.packageId&&(this.showButton=!1)},methods:{createPackage:function(){var e=this,t=this.order.id;this.CustomApiService.createPackage(t).then((function(){e.createNotificationSuccess({message:e.$tc("package.created")}),e.showButton=!1,e.$root.$emit("getLabel.hideButton",!1)})).catch((function(n){if(n.response&&n.response.data){var r=n.response.data;if(r&&r.errors&&r.errors.length>0){var o=r.errors[0];o&&e.createNotificationError({message:e.$tc(o.detail).replace("%s",t)})}}}))}}});var w=n("De3/"),C=n.n(w),x=Shopware,P=x.Component,S=x.Mixin;P.register("sw-order-detail-inpost-detail-card--get-label",{template:C.a,inject:["CustomApiService"],mixins:[S.getByName("notification")],props:["order"],data:function(){return{hideButton:!0}},created:function(){var e,t,n=this;this.$root.$on("getLabel.hideButton",(function(e){n.hideButton=e}));var r=this.order;null!=r&&null!==(e=r.extensions)&&void 0!==e&&null!==(t=e.inPost)&&void 0!==t&&t.packageId&&(this.hideButton=!1)},methods:{getLabel:function(){var e=this,t=this.order.id;this.CustomApiService.getLabel(t).then((function(e){var t=new Blob([e.data],{type:"application/pdf"}),n=URL.createObjectURL(t);window.open(n,"_blank"),URL.revokeObjectURL(n)})).catch((function(n){n.response&&n.response.data&&n.response.data.text().then((function(n){var r=JSON.parse(n);if(r&&r.errors&&r.errors.length>0){var o=r.errors[0];o&&e.createNotificationError({message:e.$tc(o.detail).replace("%s",t)})}}))}))}}});var B=n("+wCh"),I=n.n(B);Shopware.Component.register("sw-order-detail-inpost-detail-card--point-details",{template:I.a,inject:["CustomApiService"],props:["order"],created:function(){var e=this,t=this.order;this.removeInPostDetailCardIfNotFoundInPost(t),this.getInPostResponseData(t).then((function(t){e.setInPostDetailsData(t)}))},methods:{setInPostDetailsData:function(e){if(e){var t=e.address_details,n=this.$refs.pointImageDiv,r=this.$refs.pointImage;n&&r&&(r.src=e.image_url,r.alt=e.name);var o=this.$refs.pointName;o&&(o.textContent=e.name);var i=this.$refs.street;i&&(i.textContent=t.street);var a=this.$refs.postCode;a&&(a.textContent=t.post_code);var s=this.$refs.city;s&&(s.textContent=t.city);var c=this.$refs.province;c&&(c.textContent=t.province)}},getInPostResponseData:function(e){var t=this;if(e&&e.extensions&&e.extensions.inPost){var n=e.extensions.inPost.pointName;if(n)return this.CustomApiService.getInpostDataByPointName(n).then((function(e){if(!e.data||!e.data.error)return e.data;var n=t.$refs.inpostDetailsCard;n&&n.remove()}))}},removeInPostDetailCardIfNotFoundInPost:function(e){if(!e||!e.extensions.inPost||!e.extensions.inPost.pointName){var t=this.$refs.inpostDetailsCard;t&&t.remove()}}}});var D=n("V25X"),N=n.n(D);Shopware.Component.override("sw-order-detail-base",{template:N.a})},ATL7:function(e,t,n){},"De3/":function(e,t){e.exports='<button @click="this.getLabel" class="sw-button sw-button--primary" v-if="hideButton == false" ref="getLabel">\n    {{ $tc(\'cardDetails.getLabel\') }}\n</button>\n'},"M/VT":function(e,t){e.exports='<div ref="inpostDetailsCard" v-show="showCard">\n    <sw-card title="InPost details">\n        <div class="container">\n            <sw-order-detail-inpost-detail-card--point-details :order="order" />\n\n            <div class="actions">\n                <sw-order-detail-inpost-detail-card--get-label :order="order" />\n\n                <sw-order-detail-inpost-detail-card--create-package :order="order" />\n            </div>\n        </div>\n    </sw-card>\n</div>\n'},SZ7m:function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=i[0],s={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.r(t),n.d(t,"default",(function(){return h}));var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,u=!1,d=function(){},l=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,n,o){u=n,l=o||{};var a=r(e,t);return v(a),function(t){for(var n=[],o=0;o<a.length;o++){var s=a[o];(c=i[s.id]).refs--,n.push(c)}t?v(a=r(e,t)):a=[];for(o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete i[c.id]}}}}function v(e){for(var t=0;t<e.length;t++){var n=e[t],r=i[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(m(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(m(n.parts[o]));i[n.id]={id:n.id,refs:1,parts:a}}}}function g(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function m(e){var t,n,r=document.querySelector("style["+p+'~="'+e.id+'"]');if(r){if(u)return d;r.parentNode.removeChild(r)}if(f){var o=c++;r=s||(s=g()),t=w.bind(null,r,o,!1),n=w.bind(null,r,o,!0)}else r=g(),t=C.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function C(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),l.ssrId&&e.setAttribute(p,t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},V25X:function(e,t){e.exports='{% block sw_order_detail_delivery_metadata %}\n    {% parent %}\n\n    <sw-order-detail-inpost-detail-card :order="order" />\n{% endblock %}\n'},"d+vc":function(e,t){e.exports='<button @click="this.createPackage" class="sw-button sw-button--contrast" v-show="showButton">\n    {{ $tc(\'cardDetails.createPackage\') }}\n</button>\n'},i7bm:function(e,t,n){var r=n("ATL7");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n("SZ7m").default)("095e1928",r,!0,{})}});
//# sourceMappingURL=bit-bag-shopware-in-post-plugin.js.map