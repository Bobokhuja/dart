"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these:
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube (👍👍)
 *   https://github.com/Daugilas/lazyYT
 *   https://github.com/vb/lazyframe
 */
var LiteYTEmbed = /*#__PURE__*/function (_HTMLElement) {
  _inherits(LiteYTEmbed, _HTMLElement);

  var _super = _createSuper(LiteYTEmbed);

  function LiteYTEmbed() {
    _classCallCheck(this, LiteYTEmbed);

    return _super.apply(this, arguments);
  }

  _createClass(LiteYTEmbed, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.videoId = this.getAttribute('videoid');
      var playBtnEl = this.querySelector('.lty-playbtn'); // A label for the button takes priority over a [playlabel] attribute on the custom-element

      this.playLabel = playBtnEl && playBtnEl.textContent.trim() || this.getAttribute('playlabel') || 'Play';
      /**
       * Lo, the youtube placeholder image!  (aka the thumbnail, poster image, etc)
       *
       * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
       *
       * TODO: Do the sddefault->hqdefault fallback
       *       - When doing this, apply referrerpolicy (https://github.com/ampproject/amphtml/pull/3940)
       * TODO: Consider using webp if supported, falling back to jpg
       */

      if (!this.style.backgroundImage) {
        this.style.backgroundImage = "url(\"https://i.ytimg.com/vi/".concat(this.videoId, "/hqdefault.jpg\")");
      } // Set up play button, and its visually hidden label


      if (!playBtnEl) {
        playBtnEl = document.createElement('button');
        playBtnEl.type = 'button';
        playBtnEl.classList.add('lty-playbtn');
        this.append(playBtnEl);
      }

      if (!playBtnEl.textContent) {
        var playBtnLabelEl = document.createElement('span');
        playBtnLabelEl.className = 'lyt-visually-hidden';
        playBtnLabelEl.textContent = this.playLabel;
        playBtnEl.append(playBtnLabelEl);
      } // On hover (or tap), warm up the TCP connections we're (likely) about to use.


      this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {
        once: true
      }); // Once the user clicks, add the real iframe and drop our play button
      // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
      //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003

      this.addEventListener('click', this.addIframe);
    } // // TODO: Support the the user changing the [videoid] attribute
    // attributeChangedCallback() {
    // }

    /**
     * Add a <link rel={preload | preconnect} ...> to the head
     */

  }, {
    key: "addIframe",
    value: function addIframe() {
      if (this.classList.contains('lyt-activated')) return;
      this.classList.add('lyt-activated');
      var params = new URLSearchParams(this.getAttribute('params') || []);
      params.append('autoplay', '1');
      var iframeEl = document.createElement('iframe');
      iframeEl.width = 560;
      iframeEl.height = 315; // No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include

      iframeEl.title = this.playLabel;
      iframeEl.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframeEl.allowFullscreen = true; // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
      // https://stackoverflow.com/q/64959723/89484

      iframeEl.src = "https://www.youtube-nocookie.com/embed/".concat(encodeURIComponent(this.videoId), "?").concat(params.toString());
      this.append(iframeEl); // Set focus for a11y

      iframeEl.focus();
    }
  }], [{
    key: "addPrefetch",
    value: function addPrefetch(kind, url, as) {
      var linkEl = document.createElement('link');
      linkEl.rel = kind;
      linkEl.href = url;

      if (as) {
        linkEl.as = as;
      }

      document.head.append(linkEl);
    }
    /**
     * Begin pre-connecting to warm up the iframe load
     * Since the embed's network requests load within its iframe,
     *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
     * So, the best we can do is warm up a few connections to origins that are in the critical path.
     *
     * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
     * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
     */

  }, {
    key: "warmConnections",
    value: function warmConnections() {
      if (LiteYTEmbed.preconnected) return; // The iframe document and most of its subresources come right off youtube.com

      LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube-nocookie.com'); // The botguard script is fetched off from google.com

      LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com'); // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.

      LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
      LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');
      LiteYTEmbed.preconnected = true;
    }
  }]);

  return LiteYTEmbed;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)); // Register custom element


customElements.get('lite-youtube') || customElements.define('lite-youtube', LiteYTEmbed);
/* if (!customElements.get('the-element')) {
customElements.define('the-element', HTMLTheElement);
} */
"use strict";

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function () {
  if ("undefined" !== typeof window && window.addEventListener) {
    var e = Object.create(null),
        l,
        d = function d() {
      clearTimeout(l);
      l = setTimeout(n, 100);
    },
        m = function m() {},
        t = function t() {
      window.addEventListener("resize", d, !1);
      window.addEventListener("orientationchange", d, !1);

      if (window.MutationObserver) {
        var k = new MutationObserver(d);
        k.observe(document.documentElement, {
          childList: !0,
          subtree: !0,
          attributes: !0
        });

        m = function m() {
          try {
            k.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1);
          } catch (v) {}
        };
      } else document.documentElement.addEventListener("DOMSubtreeModified", d, !1), m = function m() {
        document.documentElement.removeEventListener("DOMSubtreeModified", d, !1);
        window.removeEventListener("resize", d, !1);
        window.removeEventListener("orientationchange", d, !1);
      };
    },
        u = function u(k) {
      function e(a) {
        if (void 0 !== a.protocol) var c = a;else c = document.createElement("a"), c.href = a;
        return c.protocol.replace(/:/g, "") + c.host;
      }

      if (window.XMLHttpRequest) {
        var d = new XMLHttpRequest();
        var m = e(location);
        k = e(k);
        d = void 0 === d.withCredentials && "" !== k && k !== m ? XDomainRequest || void 0 : XMLHttpRequest;
      }

      return d;
    };

    var n = function n() {
      function d() {
        --q;
        0 === q && (m(), t());
      }

      function l(a) {
        return function () {
          !0 !== e[a.base] && (a.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + a.hash), a.useEl.hasAttribute("href") && a.useEl.setAttribute("href", "#" + a.hash));
        };
      }

      function p(a) {
        return function () {
          var c = document.body,
              b = document.createElement("x");
          a.onload = null;
          b.innerHTML = a.responseText;
          if (b = b.getElementsByTagName("svg")[0]) b.setAttribute("aria-hidden", "true"), b.style.position = "absolute", b.style.width = 0, b.style.height = 0, b.style.overflow = "hidden", c.insertBefore(b, c.firstChild);
          d();
        };
      }

      function n(a) {
        return function () {
          a.onerror = null;
          a.ontimeout = null;
          d();
        };
      }

      var a,
          c,
          q = 0;
      m();
      var f = document.getElementsByTagName("use");

      for (c = 0; c < f.length; c += 1) {
        try {
          var g = f[c].getBoundingClientRect();
        } catch (w) {
          g = !1;
        }

        var h = (a = f[c].getAttribute("href") || f[c].getAttributeNS("http://www.w3.org/1999/xlink", "href") || f[c].getAttribute("xlink:href")) && a.split ? a.split("#") : ["", ""];
        var b = h[0];
        h = h[1];
        var r = g && 0 === g.left && 0 === g.right && 0 === g.top && 0 === g.bottom;
        g && 0 === g.width && 0 === g.height && !r ? (f[c].hasAttribute("href") && f[c].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), b.length && (a = e[b], !0 !== a && setTimeout(l({
          useEl: f[c],
          base: b,
          hash: h
        }), 0), void 0 === a && (h = u(b), void 0 !== h && (a = new h(), e[b] = a, a.onload = p(a), a.onerror = n(a), a.ontimeout = n(a), a.open("GET", b), a.send(), q += 1)))) : r ? b.length && e[b] && setTimeout(l({
          useEl: f[c],
          base: b,
          hash: h
        }), 0) : void 0 === e[b] ? e[b] = !0 : e[b].onload && (e[b].abort(), delete e[b].onload, e[b] = !0);
      }

      f = "";
      q += 1;
      d();
    };

    var p = function p() {
      window.removeEventListener("load", p, !1);
      l = setTimeout(n, 0);
    };

    "complete" !== document.readyState ? window.addEventListener("load", p, !1) : p();
  }
})();
"use strict";