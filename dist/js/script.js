/*! For license information please see script.js.LICENSE.txt */
(()=>{var e={878:()=>{class e extends HTMLElement{connectedCallback(){this.videoId=this.getAttribute("videoid");let t=this.querySelector(".lty-playbtn");if(this.playLabel=t&&t.textContent.trim()||this.getAttribute("playlabel")||"Play",this.style.backgroundImage||(this.style.backgroundImage=`url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`),t||(t=document.createElement("button"),t.type="button",t.classList.add("lty-playbtn"),this.append(t)),!t.textContent){const e=document.createElement("span");e.className="lyt-visually-hidden",e.textContent=this.playLabel,t.append(e)}this.addEventListener("pointerover",e.warmConnections,{once:!0}),this.addEventListener("click",this.addIframe)}static addPrefetch(e,t,n){const o=document.createElement("link");o.rel=e,o.href=t,n&&(o.as=n),document.head.append(o)}static warmConnections(){e.preconnected||(e.addPrefetch("preconnect","https://www.youtube-nocookie.com"),e.addPrefetch("preconnect","https://www.google.com"),e.addPrefetch("preconnect","https://googleads.g.doubleclick.net"),e.addPrefetch("preconnect","https://static.doubleclick.net"),e.preconnected=!0)}addIframe(){if(this.classList.contains("lyt-activated"))return;this.classList.add("lyt-activated");const e=new URLSearchParams(this.getAttribute("params")||[]);e.append("autoplay","1");const t=document.createElement("iframe");t.width=560,t.height=315,t.title=this.playLabel,t.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",t.allowFullscreen=!0,t.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${e.toString()}`,this.append(t),t.focus()}}customElements.get("lite-youtube")||customElements.define("lite-youtube",e)},899:()=>{!function(){if("undefined"!=typeof window&&window.addEventListener){var e,t=Object.create(null),n=function(){clearTimeout(e),e=setTimeout(a,100)},o=function(){},i=function(){if(window.addEventListener("resize",n,!1),window.addEventListener("orientationchange",n,!1),window.MutationObserver){var e=new MutationObserver(n);e.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),o=function(){try{e.disconnect(),window.removeEventListener("resize",n,!1),window.removeEventListener("orientationchange",n,!1)}catch(e){}}}else document.documentElement.addEventListener("DOMSubtreeModified",n,!1),o=function(){document.documentElement.removeEventListener("DOMSubtreeModified",n,!1),window.removeEventListener("resize",n,!1),window.removeEventListener("orientationchange",n,!1)}},r=function(e){function t(e){if(void 0!==e.protocol)var t=e;else(t=document.createElement("a")).href=e;return t.protocol.replace(/:/g,"")+t.host}if(window.XMLHttpRequest){var n=new XMLHttpRequest,o=t(location);e=t(e),n=void 0===n.withCredentials&&""!==e&&e!==o?XDomainRequest||void 0:XMLHttpRequest}return n},a=function(){function e(){0==--l&&(o(),i())}function n(e){return function(){!0!==t[e.base]&&(e.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+e.hash),e.useEl.hasAttribute("href")&&e.useEl.setAttribute("href","#"+e.hash))}}function a(t){return function(){var n=document.body,o=document.createElement("x");t.onload=null,o.innerHTML=t.responseText,(o=o.getElementsByTagName("svg")[0])&&(o.setAttribute("aria-hidden","true"),o.style.position="absolute",o.style.width=0,o.style.height=0,o.style.overflow="hidden",n.insertBefore(o,n.firstChild)),e()}}function s(t){return function(){t.onerror=null,t.ontimeout=null,e()}}var c,d,l=0;o();var u=document.getElementsByTagName("use");for(d=0;d<u.length;d+=1){try{var m=u[d].getBoundingClientRect()}catch(e){m=!1}var h=(c=u[d].getAttribute("href")||u[d].getAttributeNS("http://www.w3.org/1999/xlink","href")||u[d].getAttribute("xlink:href"))&&c.split?c.split("#"):["",""],v=h[0];h=h[1];var p=m&&0===m.left&&0===m.right&&0===m.top&&0===m.bottom;m&&0===m.width&&0===m.height&&!p?(u[d].hasAttribute("href")&&u[d].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",c),v.length&&(!0!==(c=t[v])&&setTimeout(n({useEl:u[d],base:v,hash:h}),0),void 0===c&&void 0!==(h=r(v))&&(c=new h,t[v]=c,c.onload=a(c),c.onerror=s(c),c.ontimeout=s(c),c.open("GET",v),c.send(),l+=1))):p?v.length&&t[v]&&setTimeout(n({useEl:u[d],base:v,hash:h}),0):void 0===t[v]?t[v]=!0:t[v].onload&&(t[v].abort(),delete t[v].onload,t[v]=!0)}u="",l+=1,e()},s=function(){window.removeEventListener("load",s,!1),e=setTimeout(a,0)};"complete"!==document.readyState?window.addEventListener("load",s,!1):s()}}()}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(878),n(899),document.querySelector(".services__block").addEventListener("click",(function(e){e.target.closest(".services__header")&&e.target.closest(".services__item").classList.toggle("services__item--active")}));var e=document.querySelector(".team__tabs"),t=document.querySelector(".team__content");e.addEventListener("click",(function(n){n.preventDefault();var o=e.children,i=t.children;if(n.target.closest(".team__tab")){for(var r=0;r<o.length;r++)o[r].classList.remove("team__tab--active"),i[r].classList.remove("team__item--active");n.target.closest(".team__tab").classList.toggle("team__tab--active"),i[+n.target.closest(".team__tab").getAttribute("data-tab")-1].classList.add("team__item--active")}}))})()})();