! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self)["js-sdk"] = {})
}(this, (function (e) {
    "use strict";
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    function t() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        var o = Array(e),
            i = 0;
        for (t = 0; t < n; t++)
            for (var r = arguments[t], s = 0, c = r.length; s < c; s++, i++) o[i] = r[s];
        return o
    }
    var n = {
        browser: function () {
            function e() {}
            return e.prototype.scrollToTop = function () {
                var e = document.documentElement.scrollTop || document.body.scrollTop;
                e > 0 && (window.requestAnimationFrame(this.scrollToTop), window.scrollTo(0, e - e / 8))
            }, e.prototype.addEventHandler = function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
            }, e.prototype.removeEventHandler = function (e, t, n) {
                return !!e.eventList.includes(t) && (e.removeEventListener && e.removeEventListener(t, n), e.detachEvent && e.detachEvent(t, n), e[t] && (e[t] = null), !0)
            }, e.prototype.startWithString = function (e, t) {
                return e.startsWith(t)
            }, e.prototype.escapeHtmlCode = function (e) {
                return e.replace(/&/gi, "&").replace(/\"/g, "").replace(/</g, "<").replace(/>/g, ">")
            }, e.prototype.getCookie = function (e) {
                var t = document.cookie.match(new RegExp("(^|)" + e + "=([^;]*)(;|$)"));
                return null != t ? unescape(t[2]) : null
            }, e.prototype.setCookie = function (e, t, n, o) {
                var i = new Date,
                    r = i.getTime() + 6e3 * i.getTimezoneOffset(),
                    s = new Date(r + 288e5);
                return s.setTime(s.getTime() + 60 * n * 60 * 1e3), document.cookie = e + "=" + escape(t) + ";path=/;expires=" + s.toUTCString() + ";domain=" + (o || window.location.host), !0
            }, e.prototype.getViewHeight = function () {
                return (document.body || document.documentElement).clientHeight
            }, e.prototype.getViewWidth = function () {
                return (document.body || document.documentElement).clientWidth
            }, e.prototype.isAndroidDevice = function () {
                return /android/i.test(navigator.userAgent.toLowerCase())
            }, e.prototype.isAppleDevice = function () {
                return /iphone|ipad|ipod|Macintosh/i.test(navigator.userAgent.toLowerCase())
            }, e.prototype.isMobileUserAgent = function () {
                return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(navigator.userAgent.toLowerCase())
            }, e
        }(),
        JSSDK: function () {
            function e() {}
            return e.prototype.isTelephone = function (e) {
                return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(e.toString())
            }, e
        }(),
        Event: function () {
            function e() {
                this.cbs = {}
            }
            return e.prototype.on = function (e, t, n) {
                void 0 === n && (n = !1), !this.isContain(e) && (this.cbs[e] = {
                    isOnce: n,
                    events: []
                }), this.cbs[e].events.includes(t) ? console.error("The Function has Already add") : this.cbs[e].events.push(t)
            }, e.prototype.emit = function (e) {
                for (var n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
                e in this.cbs && (this.cbs[e].events.forEach((function (e) {
                    e.call.apply(e, t([null], n))
                })), this.cbs[e].isOnce && this.remove(e))
            }, e.prototype.once = function (e, t) {
                this.on(e, t, !0)
            }, e.prototype.remove = function (e, t) {
                if (e && e in this.cbs)
                    if (t) {
                        var n = this.cbs[e].events.findIndex((function (e) {
                            return e === t
                        }));
                        this.cbs[e].events.splice(n, 1)
                    } else delete this.cbs[e];
                else e || (this.cbs = {})
            }, e.prototype.isContain = function (e) {
                return e in this.cbs
            }, e
        }()
    };
    e.library = n, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));