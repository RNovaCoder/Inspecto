/* Smart UI v14.4.0 (2022-Sep) 
Copyright (c) 2011-2022 jQWidgets. 
License: https://htmlelements.com/license/ */

/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 2612: /***/ () => {
      Smart(
        "smart-button",
        class extends Smart.ContentElement {
          static get properties() {
            return { value: { type: "string" }, name: { type: "string" }, type: { value: "button", type: "string" }, clickMode: { allowedValues: ["hover", "press", "release", "pressAndRelease"], type: "string", value: "release" } };
          }
          static get styleUrls() {
            return ["smart.button.css"];
          }
          template() {
            return "<button class=\"smart-button smart-unselectable\" inner-h-t-m-l='[[innerHTML]]' id='button' type='[[type]]' name='[[name]]' value='[[value]]' disabled='[[disabled]]' role=\"presentation\"></button>";
          }
          refresh() {}
          static get listeners() {
            return { "button.down": "_downHandler", "button.mouseenter": "_mouseEnterHandler", "button.mouseleave": "_mouseLeaveHandler", "button.touchend": "_touchEndHandler", "button.click": "_clickHandler", "button.up": "_upHandler", up: "_upHandler", "button.focus": "_focusHandler", "button.blur": "_blurHandler" };
          }
          focus() {
            const e = this;
            e.$.button ? e.$.button.focus() : HTMLElement.prototype.focus.call(e);
          }
          blur() {
            const e = this;
            e.$.button ? e.$.button.blur() : HTMLElement.prototype.blur.call(e);
          }
          _upHandler(e) {
            const t = this;
            if ((e.stopPropagation(), t.$.setAttributeValue("active", !1), t.dataset.target)) {
              const n = document.querySelector(t.dataset.target);
              let a = t.dataset.toggle;
              const r = "smart-window".toLowerCase();
              if ((n && n.nodeName.toLowerCase() === r && "modal" === a && (a = "openModal"), "tab" === a || "pill" === a || "list" === a)) {
                const e = this.closest(".nav, .list-group"),
                  a = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                  r = !e || ("UL" !== e.nodeName && "OL" !== e.nodeName) ? e.children(".active") : e.querySelectorAll("li > .active");
                if (e) {
                  const n = e.querySelectorAll(a);
                  for (let e = 0; e < n.length; e++) n[e].classList.remove("primary");
                  for (let e = 0; e < r.length; e++) r[e].classList.remove("active");
                  let i = t.parentNode;
                  for (; i; ) {
                    if ("LI" === i.nodeName) {
                      i.classList.add("active");
                      break;
                    }
                    i = i.parentNode;
                  }
                  t.classList.add("primary");
                }
                return (
                  n.parentNode.querySelectorAll(".active").forEach((e) => {
                    e.classList.remove("active"), e.classList.add("smart-hidden");
                  }),
                  n.classList.add("active"),
                  void n.classList.remove("smart-hidden")
                );
              }
              a &&
                n &&
                !n[a] &&
                "collapse" === a &&
                (setTimeout(() => {
                  n.classList.contains("smart-hidden") ? n.classList.remove("smart-hidden") : n.classList.add("smart-hidden");
                }),
                e.originalEvent.preventDefault()),
                a && n && !n[a] && "dropdown" === a
                  ? (setTimeout(() => {
                      n.opened = !n.opened;
                    }),
                    e.originalEvent.preventDefault())
                  : a &&
                    n &&
                    n[a] &&
                    (setTimeout(() => {
                      n[a]();
                    }, 50),
                    e.originalEvent.preventDefault());
            }
          }
          _focusHandler() {
            this.$.setAttributeValue("focus", !0), this.$.fireEvent("focus");
          }
          _blurHandler() {
            this.$.setAttributeValue("focus", !1), this.$.fireEvent("blur");
          }
          _clickHandler(e) {
            const t = this;
            (("release" !== t.clickMode && "pressAndRelease" !== t.clickMode) || t.readonly) && (e.preventDefault(), e.stopPropagation());
          }
          _downHandler(e) {
            const t = this;
            if (!(t.disabled || (t.hasRippleAnimation && Smart.Utilities.Animation.Ripple.animate(t, e.pageX, e.pageY), t.$.setAttributeValue("active", !0), ("press" !== t.clickMode && "pressAndRelease" !== t.clickMode) || t.readonly))) {
              if (t.hasAttribute("smart-blazor")) return void t.$.dispatchEvent(new Event("click"));
              const n = "buttons" in e ? e.buttons : e.which;
              t.$.fireEvent("click", { buttons: n, clientX: e.clientX, clientY: e.clientY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY });
            }
          }
          _mouseEnterHandler(e) {
            const t = this;
            if (!t.readonly && (t.$button.setAttributeValue("hover", !0), t.$.setAttributeValue("hover", !0), "hover" === t.clickMode)) {
              const n = "buttons" in e ? e.buttons : e.which;
              if (t.hasAttribute("smart-blazor")) return void t.$.dispatchEvent(new Event("click"));
              t.$.fireEvent("click", { buttons: n, clientX: e.clientX, clientY: e.clientY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY });
            }
          }
          _touchEndHandler() {
            const e = this;
            setTimeout(function () {
              e.$button.setAttributeValue("hover", !1), e.$.setAttributeValue("hover", !1);
            }, 300);
          }
          _mouseLeaveHandler() {
            this.$button.setAttributeValue("hover", !1), this.$.setAttributeValue("hover", !1);
          }
          propertyChangedHandler(e, t, n) {
            super.propertyChangedHandler(e, t, n);
            const a = this;
            "disabled" === e ? (a._setFocusable(), a.$button && a.$button.setAttributeValue("hover", !1), a.$.setAttributeValue("hover", !1), a instanceof Smart.RepeatButton && a._stopRepeat()) : "unfocusable" === e && a._setFocusable();
          }
          _setFocusable() {
            const e = this,
              t = e.$.button ? e.$.button : e;
            if (e.disabled || e.unfocusable) return t.removeAttribute("tabindex"), void (t.tabIndex = -1);
            t.tabIndex = e.tabIndex > 0 ? e.tabIndex : 0;
          }
          ready() {
            const e = this;
            super.ready(), e.setAttribute("role", "button"), e._setFocusable(), e.enableShadowDOM && e.$.hiddenInput && e.appendChild(e.$.hiddenInput);
          }
        }
      ),
        Smart(
          "smart-repeat-button",
          class extends Smart.Button {
            static get properties() {
              return { delay: { value: 50, type: "number" }, initialDelay: { value: 150, type: "number" } };
            }
            static get listeners() {
              return { "button.down": "_startRepeat", "button.mouseenter": "_overriddenHandler", "button.mouseleave": "_overriddenHandler", "button.pointerenter": "_updateInBoundsFlag", "button.pointerleave": "_updateInBoundsFlag", "button.touchmove": "_touchmoveHandler", "document.up": "_stopRepeat" };
            }
            _clickHandler(e) {
              const t = this;
              ("release" !== t.clickMode || t.preventDefaultClick || t.readonly || t.disabled) && (e.preventDefault(), e.stopPropagation(), (t.preventDefaultClick = !1));
            }
            _updateInBoundsFlag(e) {
              const t = this;
              -1 !== e.type.indexOf("leave") ? ((t._isPointerInBounds = !1), t.$button.setAttributeValue("hover", !1), t.$.setAttributeValue("hover", !1)) : ((t._isPointerInBounds = !0), t.$button.setAttributeValue("hover", !0), t.$.setAttributeValue("hover", !0)), 1 !== ("buttons" in e ? e.buttons : e.which) && t._stopRepeat(e);
            }
            _startRepeat(e) {
              const t = this;
              t.setAttribute("active", ""),
                t._initialTimer ||
                  t.readonly ||
                  (t._initialTimer = setTimeout(function () {
                    t._repeatTimer = setInterval(() => {
                      if (t._isPointerInBounds) {
                        if (t.hasAttribute("smart-blazor")) return t.$.dispatchEvent(new Event("click")), void (t.preventDefaultClick = !0);
                        const n = "buttons" in e ? e.buttons : e.which;
                        t.$.fireEvent("click", { buttons: n, clientX: e.clientX, clientY: e.clientY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY }), (t.preventDefaultClick = !0);
                      }
                    }, t.delay);
                  }, t.initialDelay));
            }
            _stopRepeat(e) {
              const t = this;
              t.readonly || (e && ("pointercancel" === e.type || (e.originalEvent && "pointercancel" === e.originalEvent.type))) || (t.$.setAttributeValue("active", !1), t._repeatTimer && (clearInterval(t._repeatTimer), (t._repeatTimer = null)), t._initialTimer && (clearTimeout(t._initialTimer), (t._initialTimer = null)));
            }
            _touchmoveHandler(e) {
              this.preventDefaultClick && e.cancelable && (e.preventDefault(), e.stopPropagation());
            }
            _overriddenHandler() {}
          }
        ),
        Smart(
          "smart-toggle-button",
          class extends Smart.Button {
            static get properties() {
              return { checked: { value: !1, type: "boolean?" }, falseContent: { value: "", reflectToAttribute: !1, type: "string" }, indeterminateContent: { value: "", reflectToAttribute: !1, type: "string" }, indeterminate: { value: !1, type: "boolean" }, trueContent: { value: "", reflectToAttribute: !1, type: "string" }, indeterminateTemplate: { value: null, type: "any" }, trueTemplate: { value: null, type: "any" }, falseTemplate: { value: null, type: "any" }, type: { value: "toggle", type: "string", defaultReflectToAttribute: !0, readonly: !0 } };
            }
            static get listeners() {
              return { keydown: "_keyHandler", keyup: "_keyHandler", dragstart: "_dragStartHandler", "button.click": "_buttonClickHandler", "button.mouseenter": "_buttonMouseEnterHandler", "button.mouseleave": "_buttonMouseLeaveHandler", "document.up": "_documentUpHandler" };
            }
            ready() {
              super.ready(), this._setAriaState(), this._updateGroupValue();
            }
            _setAriaState() {
              const e = this,
                t = e.checked;
              null !== t ? e.setAttribute("aria-pressed", t) : e.setAttribute("aria-pressed", "mixed");
            }
            _buttonClickHandler() {}
            _buttonMouseLeaveHandler() {
              this.removeAttribute("hover");
            }
            _buttonMouseEnterHandler() {
              const e = this;
              e.setAttribute("hover", ""), e.disabled || e.readonly || "hover" !== e.clickMode || (e._changeCheckState("pointer"), e.focus(), e._updateHidenInputNameAndValue());
            }
            _documentUpHandler(e) {
              const t = this;
              t._pressed && ((t._pressed = !1), t.disabled || t.readonly || "press" === t.clickMode || "pointercancel" === e.originalEvent.type || (t._changeCheckState("pointer"), t.focus(), t._updateHidenInputNameAndValue()));
            }
            _downHandler(e) {
              const t = this;
              t.disabled || t.readonly || (t.hasRippleAnimation && Smart.Utilities.Animation.Ripple.animate(t, e.pageX, e.pageY), (t._pressed = !0), ("press" !== t.clickMode && "pressAndRelease" !== t.clickMode) || (t._changeCheckState("pointer"), t.hasAttribute("smart-blazor") ? t.$.dispatchEvent(new Event("click")) : t.$.fireEvent("click"), t._updateHidenInputNameAndValue()), "press" === t.clickMode && (e.preventDefault(), e.stopPropagation()));
            }
            _dragStartHandler(e) {
              e.preventDefault();
            }
            _keyHandler(e) {
              const t = this;
              if (!0 !== t.disabled && !t.readonly && 32 === e.keyCode) {
                if ("keydown" === e.type) return void e.preventDefault();
                if ("none" === t.switchMode) return;
                t._changeCheckState("keyboard"), t._updateHidenInputNameAndValue();
              }
            }
            _updateGroupValue() {
              const e = this;
              if (e.dataset.target) {
                const t = document.querySelector(e.dataset.target);
                if (t) {
                  const n = document.querySelectorAll('[data-target="' + e.dataset.target + '"]'),
                    a = [];
                  if (e.checked) {
                    const n = e.dataset.property,
                      a = e.dataset.value;
                    if (n && void 0 !== t[n]) {
                      let e = a;
                      "true" === e && (e = !0), "false" === e && (e = !1), (t[n] = e);
                    }
                  }
                  for (let t = 0; t < n.length; t++) {
                    const r = n[t];
                    r.checked && (r.name ? (a.push(r.name), e.id && r.setAttribute("data-id", e.id)) : e.id && a.push(e.id));
                  }
                  (t.value = a.toString()),
                    e._targetDispatchTimer && clearTimeout(e._targetDispatchTimer),
                    (e._targetDispatchTimer = setTimeout(() => {
                      t.dispatchEvent(new Event("change"));
                    }, 100));
                }
              }
            }
            _changeCheckState(e) {
              const t = this;
              let n = null;
              null === t.checked ? (t.checked = !0) : ((n = t.checked), (t.checked = !t.checked)), t._handleTextSelection(), t.$.fireEvent("change", { value: t.checked, oldValue: n, changeType: e }), t.checked ? t.$.fireEvent("checkValue", { changeType: e }) : t.$.fireEvent("uncheckValue", { changeType: e }), t._updateGroupValue(), t._setAriaState();
            }
            _handleTextSelection() {
              const e = this;
              e.$.addClass("smart-unselectable"), e.timer && clearTimeout(e.timer), (e.timer = setTimeout(() => e.$.removeClass("smart-unselectable"), 500));
            }
            propertyChangedHandler(e, t, n) {
              super.propertyChangedHandler(e, t, n);
              const a = this;
              if ("checked" === e) return a.$.fireEvent("change", { value: n, oldValue: t, changeType: "api" }), void a._setAriaState();
              switch (e) {
                case "trueTemplate":
                  a._handleTemplate(!0);
                  break;
                case "falseTemplate":
                  a._handleTemplate(!1);
                  break;
                case "indeterminateTemplate":
                  a._handleTemplate();
              }
            }
            _htmlBindOnInitialization() {
              const e = this;
              e._bindContentProperty("trueContent", "smart-true-content"), e._bindContentProperty("falseContent", "smart-false-content"), e._bindContentProperty("indeterminateContent", "smart-indeterminate-content");
            }
            _bindContentProperty(e, t) {
              const n = this;
              if (!n.$[e + "Container"]) return;
              let a = document.createElement("div");
              a.innerHTML = n.innerHTML;
              let r,
                i = a.getElementsByClassName(t);
              if (i.length > 0) for (let e = 0; e < i.length; e++) r = i[e];
              "" === n[e] && (n[e] = void 0 === r ? "" : r.outerHTML), (n.$[e + "Container"].innerHTML = n[e]);
            }
            _updateContentProperties() {
              const e = this;
              function t(t) {
                e.$[t + "Container"] && (e[t] = e.$[t + "Container"].innerHTML);
              }
              t("trueContent"), t("falseContent"), t("indeterminateContent");
            }
            _updateHidenInputValue() {
              const e = this;
              if (!e.$.hiddenInput) return;
              let t;
              (t = null === e.checked ? "null" : !1 === e.checked ? "off" : e.value || "on"), e.$.hiddenInput.setAttribute("value", t);
            }
            _updateHidenInputName() {
              const e = this;
              if (!e.$.hiddenInput) return;
              let t = !1 === e.checked ? "" : e.name || "";
              e.$.hiddenInput.setAttribute("name", t);
            }
            _updateHidenInputNameAndValue() {
              this._updateHidenInputName(), this._updateHidenInputValue();
            }
            _handleTemplate(e, t) {
              const n = this;
              let a, r, i;
              if ((!0 === e ? ((a = n.trueTemplate), (r = n.$.trueContentContainer), (i = n.trueContent)) : !1 === e ? ((a = n.falseTemplate), (r = n.$.falseContentContainer), (i = n.falseContent)) : ((a = n.indeterminateTemplate), (r = n.$.indeterminateContentContainer), (i = n.indeterminateContent)), t && (r.innerHTML = i || ""), null === a || !a)) return;
              if ("function" == typeof a) return void a(r, { value: i });
              if (!("content" in document.createElement("template"))) return void n.error(n.localize("htmlTemplateNotSuported", { elementType: n.nodeName.toLowerCase() }));
              if (((a = document.getElementById(a)), null === a || !("content" in a))) return void n.error(n.localize("invalidTemplate", { elementType: n.nodeName.toLowerCase(), property: "template" }));
              const o = a.content,
                l = o.childNodes.length,
                s = /{{\w+}}/g;
              let u,
                d = [];
              for (let e = 0; e < l; e++) for (u = s.exec(o.childNodes[e].innerHTML); u; ) d.push({ childNodeIndex: e, bindingString: u[0] }), (u = s.exec(o.childNodes[e].innerHTML));
              const c = d.length;
              let p,
                h,
                m = document.importNode(a.content, !0);
              for (let e = 0; e < c; e++) {
                (p = m.childNodes[d[e].childNodeIndex]), (h = d.length);
                for (let t = 0; t < h; t++) p.innerHTML = p.innerHTML.replace(d[e].bindingString, i);
              }
              r.innerHTML = "";
              for (let e = 0; e < m.childNodes.length; e++) m.childNodes[e].outerHTML && (r.innerHTML += m.childNodes[e].outerHTML);
            }
          }
        );

      /***/
    },

    /***/ 6321: /***/ () => {
      !(function () {
        const e = "13.2.0",
          t = [];
        let n = "Smart";
        if (window[n] && window[n].Version) {
          if (window[n].Version === e) return;
          if (window[n].Version !== e) n += e;
          else {
            let e = 2;
            for (; window[n]; ) (n += e.toString()), e++;
          }
        }
        const r = navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf("Edge") > -1;
        document.elementsFromPoint || (document.elementsFromPoint = document.msElementsFromPoint);
        class o {
          static isBoolean(e) {
            return "boolean" == typeof e;
          }
          static isFunction(e) {
            return !!(e && e.constructor && e.call && e.apply);
          }
          static isArray(e) {
            return Array.isArray(e);
          }
          static isObject(e) {
            return (e && ("object" == typeof e || this.isFunction(e))) || !1;
          }
          static isDate(e) {
            return e instanceof Date;
          }
          static isString(e) {
            return "string" == typeof e;
          }
          static isNumber(e) {
            return "number" == typeof e;
          }
          static getType(e) {
            const t = this,
              n = ["Boolean", "Number", "String", "Function", "Array", "Date", "Object"].find((n) => {
                if (t["is" + n](e)) return n;
              });
            return n ? n.toLowerCase() : void 0;
          }
        }
        class i {
          static animate(e, t, r, o) {
            const i = e;
            if (!i || i instanceof HTMLElement == 0) return;
            if (0 === i.getElementsByClassName("smart-ripple").length) {
              const e = document.createElement("span");
              e.classList.add("smart-ripple"), e.setAttribute("role", "presentation");
              let t = !0,
                r = null;
              if (window[n].EnableShadowDOM && i.enableShadowDOM && !0 !== i.isInShadowDOM) {
                for (let e = 0; e < i.shadowRoot.host.shadowRoot.children.length; e++) "link" !== i.shadowRoot.host.shadowRoot.children[e].tagName.toLowerCase() && (r = i.shadowRoot.host.shadowRoot.children[e]);
                i.shadowRoot.host.shadowRoot.querySelector(".smart-ripple") && (t = !1);
              } else r = i.firstElementChild;
              t && (r && !r.noRipple && r.offsetHeight > 0 ? r.appendChild(e) : i.appendChild(e));
            }
            let s = null;
            if (((s = window[n].EnableShadowDOM && i.shadowRoot ? i.shadowRoot.host.shadowRoot.querySelector(".smart-ripple") : i.getElementsByClassName("smart-ripple")[0]), !s)) return;
            (s.innerHTML = ""), s.classList.remove("smart-animate"), (s.style.height = s.style.width = Math.max(i.offsetHeight, i.offsetWidth) + "px");
            const a = window.getComputedStyle(s.parentElement),
              l = parseInt(a.borderLeftWidth) || 0,
              d = parseInt(a.borderTopWidth) || 0,
              c = i.getBoundingClientRect(),
              u = t - (c.left + window.pageXOffset) - s.offsetWidth / 2 - l,
              p = r - (c.top + window.pageYOffset) - s.offsetHeight / 2 - d;
            (s.style.left = u + "px"),
              (s.style.top = p + "px"),
              s.classList.add("smart-animate"),
              s.addEventListener("animationend", function e() {
                s.parentElement && s.parentElement.removeChild(s), o && o(), s.removeEventListener("animationend", e), s.removeEventListener("animationcancel", e);
              }),
              s.addEventListener("animationcancel", function e() {
                s.parentElement && s.parentElement.removeChild(s), o && o(), s.removeEventListener("animationcancel", e), s.removeEventListener("animationend", e);
              });
          }
        }
        class s {
          static easeInQuad(e, t, n, r) {
            return n * (e /= r) * e + t;
          }
          static easeOutQuad(e, t, n, r) {
            return -n * (e /= r) * (e - 2) + t;
          }
          static easeInOutQuad(e, t, n, r) {
            return (e /= r / 2) < 1 ? (n / 2) * e * e + t : (-n / 2) * (--e * (e - 2) - 1) + t;
          }
          static easeInCubic(e, t, n, r) {
            return n * (e /= r) * e * e + t;
          }
          static easeOutCubic(e, t, n, r) {
            return n * ((e = e / r - 1) * e * e + 1) + t;
          }
          static easeInOutCubic(e, t, n, r) {
            return (e /= r / 2) < 1 ? (n / 2) * e * e * e + t : (n / 2) * ((e -= 2) * e * e + 2) + t;
          }
          static easeInQuart(e, t, n, r) {
            return n * (e /= r) * e * e * e + t;
          }
          static easeOutQuart(e, t, n, r) {
            return -n * ((e = e / r - 1) * e * e * e - 1) + t;
          }
          static easeInOutQuart(e, t, n, r) {
            return (e /= r / 2) < 1 ? (n / 2) * e * e * e * e + t : (-n / 2) * ((e -= 2) * e * e * e - 2) + t;
          }
          static easeInQuint(e, t, n, r) {
            return n * (e /= r) * e * e * e * e + t;
          }
          static easeOutQuint(e, t, n, r) {
            return n * ((e = e / r - 1) * e * e * e * e + 1) + t;
          }
          static easeInOutQuint(e, t, n, r) {
            return (e /= r / 2) < 1 ? (n / 2) * e * e * e * e * e + t : (n / 2) * ((e -= 2) * e * e * e * e + 2) + t;
          }
          static easeInSine(e, t, n, r) {
            return -n * Math.cos((e / r) * (Math.PI / 2)) + n + t;
          }
          static easeOutSine(e, t, n, r) {
            return n * Math.sin((e / r) * (Math.PI / 2)) + t;
          }
          static easeInOutSine(e, t, n, r) {
            return (-n / 2) * (Math.cos((Math.PI * e) / r) - 1) + t;
          }
          static easeInExpo(e, t, n, r) {
            return 0 === e ? t : n * Math.pow(2, 10 * (e / r - 1)) + t;
          }
          static easeOutExpo(e, t, n, r) {
            return e === r ? t + n : n * (1 - Math.pow(2, (-10 * e) / r)) + t;
          }
          static easeInOutExpo(e, t, n, r) {
            return 0 === e ? t : e === r ? t + n : (e /= r / 2) < 1 ? (n / 2) * Math.pow(2, 10 * (e - 1)) + t : (n / 2) * (2 - Math.pow(2, -10 * --e)) + t;
          }
          static easeInCirc(e, t, n, r) {
            return -n * (Math.sqrt(1 - (e /= r) * e) - 1) + t;
          }
          static easeOutCirc(e, t, n, r) {
            return n * Math.sqrt(1 - (e = e / r - 1) * e) + t;
          }
          static easeInOutCirc(e, t, n, r) {
            return (e /= r / 2) < 1 ? (-n / 2) * (Math.sqrt(1 - e * e) - 1) + t : (n / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
          }
          static easeInElastic(e, t, n, r) {
            let o = 1.70158,
              i = 0,
              s = n;
            return 0 === e ? t : 1 == (e /= r) ? t + n : (i || (i = 0.3 * r), s < Math.abs(n) ? ((s = n), (o = i / 4)) : (o = (i / (2 * Math.PI)) * Math.asin(n / s)), -s * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * r - o) * (2 * Math.PI)) / i) + t);
          }
          static easeOutElastic(e, t, n, r) {
            let o = 1.70158,
              i = 0,
              s = n;
            return 0 === e ? t : 1 == (e /= r) ? t + n : (i || (i = 0.3 * r), s < Math.abs(n) ? ((s = n), (o = i / 4)) : (o = (i / (2 * Math.PI)) * Math.asin(n / s)), s * Math.pow(2, -10 * e) * Math.sin(((e * r - o) * (2 * Math.PI)) / i) + n + t);
          }
          static easeInOutElastic(e, t, n, r) {
            let o = 1.70158,
              i = 0,
              s = n;
            return 0 === e ? t : 2 == (e /= r / 2) ? t + n : (i || (i = r * (0.3 * 1.5)), s < Math.abs(n) ? ((s = n), (o = i / 4)) : (o = (i / (2 * Math.PI)) * Math.asin(n / s)), e < 1 ? s * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * r - o) * (2 * Math.PI)) / i) * -0.5 + t : s * Math.pow(2, -10 * (e -= 1)) * Math.sin(((e * r - o) * (2 * Math.PI)) / i) * 0.5 + n + t);
          }
          static easeInBack(e, t, n, r, o) {
            return void 0 === o && (o = 1.70158), n * (e /= r) * e * ((o + 1) * e - o) + t;
          }
          static easeOutBack(e, t, n, r, o) {
            return void 0 === o && (o = 1.70158), n * ((e = e / r - 1) * e * ((o + 1) * e + o) + 1) + t;
          }
          static easeInOutBack(e, t, n, r, o) {
            return void 0 === o && (o = 1.70158), (e /= r / 2) < 1 ? (n / 2) * (e * e * ((1 + (o *= 1.525)) * e - o)) + t : (n / 2) * ((e -= 2) * e * ((1 + (o *= 1.525)) * e + o) + 2) + t;
          }
          static easeInBounce(e, t, n, r) {
            return n - this.easeOutBounce(r - e, 0, n, r) + t;
          }
          static easeOutBounce(e, t, n, r) {
            return (e /= r) < 1 / 2.75 ? n * (7.5625 * e * e) + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t;
          }
          static easeInOutBounce(e, t, n, r) {
            return e < r / 2 ? 0.5 * this.easeInBounce(2 * e, 0, n, r) + t : 0.5 * this.easeOutBounce(2 * e - r, 0, n, r) + 0.5 * n + t;
          }
        }
        class a {
          static get isMobile() {
            const e = /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase());
            return e || ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
          }
          static get Browser() {
            let e;
            const t = function (t) {
              let n = t.indexOf(e);
              if (-1 === n) return;
              const r = t.indexOf("rv:");
              return "Trident" === e && -1 !== r ? parseFloat(t.substring(r + 3)) : parseFloat(t.substring(n + e.length + 1));
            };
            let n = {};
            return (
              (n[
                (function () {
                  const t = [
                    { string: navigator.userAgent, subString: "Edge", identity: "Edge" },
                    { string: navigator.userAgent, subString: "MSIE", identity: "IE" },
                    { string: navigator.userAgent, subString: "Trident", identity: "IE" },
                    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
                    { string: navigator.userAgent, subString: "Opera", identity: "Opera" },
                    { string: navigator.userAgent, subString: "OPR", identity: "Opera" },
                    { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
                    { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
                  ];
                  for (let n = 0; n < t.length; n++) {
                    let r = t[n].string;
                    if (((e = t[n].subString), -1 !== r.indexOf(t[n].subString))) return t[n].identity;
                  }
                  return "Other";
                })()
              ] = !0),
              (n.version = t(navigator.userAgent) || t(navigator.appVersion) || "Unknown"),
              n
            );
          }
          static toCamelCase(e) {
            return e.replace(/-([a-z])/g, function (e) {
              return e[1].toUpperCase();
            });
          }
          static toDash(e) {
            return e
              .split(/(?=[A-Z])/)
              .join("-")
              .toLowerCase();
          }
          static unescapeHTML(e) {
            return new DOMParser().parseFromString(e, "text/html").documentElement.textContent;
          }
          static escapeHTML(e) {
            const t = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" };
            return String(e).replace(/[&<>"'`=\/]/g, (e) => t[e]);
          }
          static sanitizeHTML(e) {
            if (e && (e.indexOf("onclick") >= 0 || e.indexOf("onload") >= 0 || e.indexOf("onerror") >= 0)) return this.escapeHTML(e);
            const t = new RegExp("<s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)[^>]*>(.*?)<s*/s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)>", "ig");
            return String(e).replace(t, (e) => this.escapeHTML(e));
          }
          static createGUID() {
            function e() {
              return Math.floor(65536 * (1 + Math.random()))
                .toString(16)
                .substring(1);
            }
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
          }
          static getScriptLocation() {
            return "./" !== window[n].BaseUrl
              ? window[n].BaseUrl
              : (function () {
                  if (document.currentScript) {
                    let e = document.currentScript.src,
                      t = e.lastIndexOf("/");
                    return (e = e.substring(0, t)), e;
                  }
                  const e = new Error();
                  let t = "(",
                    n = ")";
                  if ((Smart.Utilities.Core.Browser.Safari && ((t = "@"), (n = "\n")), e.fileName)) return e.fileName.replace("/smart.element.js", "");
                  let r = e.stack.split(t);
                  return (r = r[1]), (r = r.split(n)[0]), (r = r.split(":")), r.splice(-2, 2), (r = r.join(":")), r.replace("/smart.element.js", "");
                })();
          }
          static CSSVariablesSupport() {
            return window.CSS && window.CSS.supports && window.CSS.supports("(--fake-var: 0)");
          }
          static assign(e, t) {
            const n = (e) => e && "object" == typeof e && !Array.isArray(e) && null !== e;
            let r = Object.assign({}, e);
            return (
              n(e) &&
                n(t) &&
                Object.keys(t).forEach((o) => {
                  n(t[o]) ? (o in e ? (r[o] = this.assign(e[o], t[o])) : Object.assign(r, { [o]: t[o] })) : Object.assign(r, { [o]: t[o] });
                }),
              r
            );
          }
          static html(e, t) {
            const n = this;
            let r = "",
              o = e.childNodes;
            if (!t) {
              for (let e, t = 0, i = o.length; t < i && (e = o[t]); t++) {
                const t = ["strong"];
                if (e instanceof HTMLElement || (e.tagName && t.indexOf(e.tagName.toLowerCase()) >= 0)) {
                  const t = e.tagName.toLowerCase(),
                    o = e.attributes;
                  let i = "<" + t;
                  for (let e, t = 0; (e = o[t]); t++) i += " " + e.name + '="' + e.value.replace(/[&\u00A0"]/g, y.Core.escapeHTML) + '"';
                  (i += ">"), ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"][t] && (r += i), (r = r + i + n.html(e) + "</" + t + ">");
                } else {
                  if (8 === e.nodeType) continue;
                  r += e.textContent.replace(/[&\u00A0<>]/g, y.Core.escapeHTML);
                }
              }
              return r;
            }
            {
              const n = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
              e.innerHTML = t.replace(n, "<$1></$2>");
            }
          }
        }
        let l = [];
        class d {
          static watch(e) {
            switch (e.nodeName.toLowerCase()) {
              case "smart-grid":
              case "smart-kanban":
              case "smart-table":
              case "smart-pivot-table":
              case "smart-scheduler":
              case "smart-tabs":
              case "smart-card-view":
              case "smart-list-box":
              case "smart-combo-box":
              case "smart-drop-down-list":
              case "smart-calendar":
              case "smart-gauge":
              case "smart-numeric-text-box":
              case "smart-menu":
              case "smart-tree":
                l.push(e);
                break;
              default:
                return;
            }
            d.start();
          }
          static start() {
            d.isStarted ||
              ((d.isStarted = !0),
              d.interval && clearInterval(d.interval),
              0 === l.length || document.hidden
                ? (d.isStarted = !1)
                : (d.interval = setInterval(function () {
                    d.observe();
                  }, 100)));
          }
          static stop() {
            (d.isStarted = !1), d.interval && clearInterval(d.interval);
          }
          static observeElement(e) {
            const t = e;
            if ("test" === window.Smart.Mode || document.hidden) return void (d.interval && clearInterval(d.interval));
            let n = e._computedStyle || "resize" !== t.hasStyleObserver ? document.defaultView.getComputedStyle(t, null) : {},
              r = !0,
              o = "resize" !== t.hasStyleObserver ? ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "display", "visibility", "font-size", "font-family", "font-style", "font-weight", "max-height", "min-height", "max-width", "min-width", "overflow", "overflow-x", "overflow-y"] : [];
            if ((e.styleProperties && (o = o.concat(e.styleProperties)), e.observableStyleProperties && (o = e.observableStyleProperties), !t._styleInfo)) {
              t._styleInfo = [];
              for (let e = 0; e < o.length; e++) {
                const r = o[e],
                  i = r.startsWith("--") ? n.getPropertyValue(r) : n[r];
                t._styleInfo[r] = i;
              }
              return;
            }
            if ((e.isHidden || ("none" !== n.display && ((0 !== e.offsetWidth && 0 !== e.offsetHeight) || (e.isHidden = !0))), e.isHidden)) {
              if ((e.visibilityChangedHandler(), e.isHidden)) return;
              r = !1;
            }
            let i = [];
            for (let e = 0; e < o.length; e++) {
              const r = o[e],
                s = r.startsWith("--") ? n.getPropertyValue(r) : n[r];
              t._styleInfo[r] !== s && ((i[r] = { oldValue: t._styleInfo[r], value: s }), i.length++), (t._styleInfo[r] = s);
            }
            i.length > 0 && (t.$.fireEvent("styleChanged", { styleProperties: i }, { bubbles: !1, cancelable: !0 }), i.display && r && t.$.fireEvent("resize", t, { bubbles: !1, cancelable: !0 }));
          }
          static observe() {
            for (let e = 0; e < l.length; e++) {
              const t = l[e];
              this.observeElement(t);
            }
          }
          static unwatch(e) {
            d.stop();
            const t = l.indexOf(e);
            -1 !== t && l.splice(t, 1), d.start();
          }
        }
        let c = [];
        const u = [],
          p = ["resize", "down", "up", "move", "tap", "taphold", "swipeleft", "swiperight", "swipetop", "swipebottom"];
        class h {
          constructor(e) {
            const t = this;
            (t.target = e), (t.$target = new f(e)), (t.$document = e.$document ? e.$document : new f(document)), (t.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase());
            let n = { handlers: {}, boundEventTypes: [], listen: t.listen.bind(t), unlisten: t.unlisten.bind(t) };
            return (
              (t.tapHoldDelay = 750),
              (t.swipeMin = 10),
              (t.swipeMax = 5e3),
              (t.swipeDelay = 1e3),
              (t.tapHoldDelay = 750),
              (t.inputEventProperties = ["clientX", "clientY", "pageX", "pageY", "screenX", "screenY"]),
              p.forEach((e) => {
                (n[e] = (t) => {
                  n.handlers[e] = t;
                }),
                  (t[e] = (e) => {
                    if (!n.handlers[e.type]) {
                      if (("mousemove" === e.type || "pointermove" === e.type || "touchmove" === e.type) && n.handlers.move) {
                        const r = t.createEvent(e, "move");
                        n.handlers.move(r);
                      }
                      return !0;
                    }
                    return n.handlers[e.type](e);
                  });
              }),
              t.listen(),
              (t.handlers = n.handlers),
              n
            );
          }
          listen(e) {
            const t = this;
            if ("resize" === e && t.target !== document && t.target !== window && !1 !== t.target.hasResizeObserver)
              if (Smart.Utilities.Core.Browser.Firefox) {
                if (!t.target.resizeObserver) {
                  let e,
                    n,
                    r,
                    o = !1,
                    i = t.target.offsetWidth,
                    s = t.target.offsetHeight;
                  const a = new ResizeObserver(() => {
                    if (!o) return void (o = !0);
                    const a = new CustomEvent("resize", { bubbles: !1, cancelable: !0 });
                    (n = t.target.offsetWidth), (r = t.target.offsetHeight), (e = n !== i || r !== s), t.target.requiresLayout && (e = !0), e && (t.resize(a), (t.target.requiresLayout = !1));
                  });
                  a.observe(t.target), (t.target.resizeObserver = a);
                }
              } else if (!t.target.resizeTrigger) {
                const e = document.createElement("div");
                (e.className = "smart-resize-trigger-container"), (e.innerHTML = '<div class="smart-resize-trigger-container"><div class="smart-resize-trigger"></div></div><div class="smart-resize-trigger-container"><div class="smart-resize-trigger-shrink"></div></div>'), e.setAttribute("aria-hidden", !0), window[n].EnableShadowDOM && t.target.shadowRoot ? t.target.shadowRoot.appendChild(e) : t.target.appendChild(e), (t.target.resizeTrigger = e);
                const r = e.childNodes[0],
                  o = r.childNodes[0],
                  i = e.childNodes[1],
                  s = function () {
                    (o.style.width = "100000px"), (o.style.height = "100000px"), (r.scrollLeft = 1e5), (r.scrollTop = 1e5), (i.scrollLeft = 1e5), (i.scrollTop = 1e5);
                  };
                let a,
                  l,
                  d,
                  c,
                  u = t.target.offsetWidth,
                  p = t.target.offsetHeight;
                if (0 === u || 0 === p) {
                  const e = function () {
                    s(), t.target.removeEventListener("resize", e);
                  };
                  t.target.addEventListener("resize", e), s();
                } else s();
                (t.target.resizeHandler = function () {
                  l ||
                    (l = requestAnimationFrame(function () {
                      if (((l = 0), (d = t.target.offsetWidth), (c = t.target.offsetHeight), (a = d !== u || c !== p), t.target.requiresLayout && (a = !0), !a)) return;
                      (u = d), (p = c);
                      const e = new CustomEvent("resize", { bubbles: !1, cancelable: !0 });
                      t.resize(e), (t.target.requiresLayout = !1);
                    })),
                    s();
                }),
                  r.addEventListener("scroll", t.target.resizeHandler),
                  i.addEventListener("scroll", t.target.resizeHandler);
              }
            t.isListening || ((t.isListening = !0), (t.isPressed = !1), (t.isReleased = !1), (t.isInBounds = !1), window.PointerEvent ? (t.$target.listen("pointerdown.inputEvents" + t.id, t.pointerDown.bind(t)), t.$target.listen("pointerup.inputEvents" + t.id, t.pointerUp.bind(t)), t.$target.listen("pointermove.inputEvents" + t.id, t.pointerMove.bind(t)), t.$target.listen("pointercancel.inputEvents" + t.id, t.pointerCancel.bind(t))) : ("ontouchstart" in window && (t.$target.listen("touchmove.inputEvents" + t.id, t.touchMove.bind(t)), t.$target.listen("touchstart.inputEvents" + t.id, t.touchStart.bind(t)), t.$target.listen("touchend.inputEvents" + t.id, t.touchEnd.bind(t)), t.$target.listen("touchcancel.inputEvents" + t.id, t.touchCancel.bind(t))), t.$target.listen("mousedown.inputEvents" + t.id, t.mouseDown.bind(t)), t.$target.listen("mouseup.inputEvents" + t.id, t.mouseUp.bind(t)), t.$target.listen("mousemove.inputEvents" + t.id, t.mouseMove.bind(t)), t.$target.listen("mouseleave.inputEvents" + t.id, t.mouseLeave.bind(t))), t.target._handleDocumentUp || ((t.target._handleDocumentUp = t.handleDocumentUp.bind(t)), (t.target._handleDocumentUpId = t.id), t.$document.listen("mouseup.inputEvents" + t.target._handleDocumentUpId, t.target._handleDocumentUp)));
          }
          unlisten(e) {
            const t = this;
            if (((t.isListening = !1), window.PointerEvent ? (t.$target.unlisten("pointerdown.inputEvents" + t.id), t.$target.unlisten("pointerup.inputEvents" + t.id), t.$target.unlisten("pointermove.inputEvents" + t.id), t.$target.unlisten("pointercancel.inputEvents" + t.id)) : ("ontouchstart" in window && (t.$target.unlisten("touchstart.inputEvents" + t.id), t.$target.unlisten("touchmove.inputEvents" + t.id), t.$target.unlisten("touchend.inputEvents" + t.id), t.$target.unlisten("touchcancel.inputEvents" + t.id)), t.$target.unlisten("mousedown.inputEvents" + t.id), t.$target.unlisten("mouseup.inputEvents" + t.id), t.$target.unlisten("mousemove.inputEvents" + t.id), t.$target.unlisten("mouseleave.inputEvents" + t.id)), t.target._handleDocumentUp && (t.$document.unlisten("mouseup.inputEvents" + t.target._handleDocumentUpId, t.target._handleDocumentUp), delete t.target._handleDocumentUp, delete t.target._handleDocumentUpId), "resize" === e))
              if (Smart.Utilities.Core.Browser.Firefox) t.target.resizeObserver && (t.target.resizeObserver.unobserve(t.target), delete t.target.resizeObserver);
              else if (t.target.resizeTrigger) {
                const e = t.target.resizeTrigger,
                  n = e.childNodes[0],
                  r = e.childNodes[1];
                n.removeEventListener("scroll", t.target.resizeHandler), r.removeEventListener("scroll", t.target.resizeHandler), (t.target.resizeHandler = null), e.parentNode.removeChild(e), delete t.target.resizeTrigger;
              }
          }
          handleDocumentUp(e) {
            const t = this;
            (t.isPressed = !1), (t.isReleased = !1), t.resetSwipe(e);
          }
          createEvent(e, t) {
            const n = this,
              r = e.touches,
              o = e.changedTouches,
              i = r && r.length ? r[0] : o && o.length ? o[0] : void 0,
              s = new CustomEvent(t, { bubbles: !0, cancelable: !0, composed: void 0 !== n.$target.element.getRootNode().host });
            if (((s.originalEvent = e), i)) {
              for (let e = 0; e < n.inputEventProperties.length; e++) {
                const t = n.inputEventProperties[e];
                s[t] = i[t];
              }
              return s;
            }
            for (let t in e) t in s || (s[t] = e[t]);
            return s;
          }
          fireTap(e) {
            const t = this;
            if ((clearTimeout(this.tapHoldTimeout), !this.tapHoldFired && this.isInBounds)) {
              const n = t.createEvent(e, "tap");
              t.tap(n);
            }
          }
          initTap(e) {
            const t = this;
            (t.isInBounds = !0),
              (t.tapHoldFired = !1),
              (t.tapHoldTimeout = setTimeout(function () {
                if (t.isInBounds) {
                  t.tapHoldFired = !0;
                  const n = t.createEvent(e, "taphold");
                  t.taphold(n);
                }
              }, t.tapHoldDelay));
          }
          pointerDown(e) {
            return this.handleDown(e);
          }
          mouseDown(e) {
            const t = this;
            if (!(t.isPressed || (t.touchStartTime && new Date() - t.touchStartTime < 500))) return t.handleDown(e);
          }
          touchStart(e) {
            const t = this;
            return (t.touchStartTime = new Date()), (t.isTouchMoved = !0), t.handleDown(e);
          }
          mouseUp(e) {
            const t = this;
            if (!(t.isReleased || (t.touchEndTime && new Date() - t.touchEndTime < 500))) return t.handleUp(e);
          }
          handleDown(e) {
            const t = this;
            (t.isReleased = !1), (t.isPressed = !0);
            const n = t.createEvent(e, "down");
            return (t.handlers.tap || t.handlers.taphold) && t.initTap(n), (t.handlers.swipeleft || t.handlers.swiperight || t.handlers.swipetop || t.handlers.swipebottom) && t.initSwipe(n), t.down(n);
          }
          handleUp(e) {
            const t = this;
            (t.isReleased = !0), (t.isPressed = !1);
            const n = t.createEvent(e, "up"),
              r = t.up(n);
            return (t.handlers.tap || t.handlers.taphold) && t.fireTap(n), t.resetSwipe(n), r;
          }
          handleMove(e) {
            const t = this;
            let n = t.move(e);
            return t.isPressed && ((t._maxSwipeVerticalDistance = Math.max(t._maxSwipeVerticalDistance, Math.abs(t._startY - e.pageY))), (t._maxSwipeHorizontalDistance = Math.max(t._maxSwipeHorizontalDistance, Math.abs(t._startX - e.pageX))), (n = t.handleSwipeEvents(e))), n;
          }
          touchEnd(e) {
            return (this.touchEndTime = new Date()), this.handleUp(e);
          }
          pointerUp(e) {
            return this.handleUp(e);
          }
          pointerCancel(e) {
            this.pointerUp(e);
          }
          touchCancel(e) {
            this.touchEnd(e);
          }
          mouseLeave() {
            this.isInBounds = !1;
          }
          mouseMove(e) {
            if (!this.isTouchMoved) return this.handleMove(e);
          }
          pointerMove(e) {
            return this.handleMove(e);
          }
          touchMove(e) {
            const t = this,
              n = e.touches,
              r = e.changedTouches,
              o = n && n.length ? n[0] : r && r.length ? r[0] : void 0;
            for (let n = 0; n < t.inputEventProperties.length; n++) {
              const r = t.inputEventProperties[n];
              void 0 === e[r] && (e[r] = o[r]);
            }
            return (t.isTouchMoved = !0), t.handleMove(e);
          }
          handleSwipeEvents(e) {
            const t = this;
            let n = !0;
            return (t.handlers.swipetop || t.handlers.swipebottom) && (n = this.handleVerticalSwipeEvents(e)), !1 === n || ((t.handlers.swipeleft || t.handlers.swiperight) && (n = this.handleHorizontalSwipeEvents(e))), n;
          }
          handleVerticalSwipeEvents(e) {
            let t, n;
            return (t = e.pageY), (n = t - this._startY), this.swiped(e, n, "vertical");
          }
          handleHorizontalSwipeEvents(e) {
            let t, n;
            return (t = e.pageX), (n = t - this._startX), this.swiped(e, n, "horizontal");
          }
          swiped(e, t, n) {
            const r = this;
            if (((n = n || 0), Math.abs(t) >= r.swipeMin && !r._swipeEvent && !r._swipeLocked)) {
              let o = t < 0 ? "swipeleft" : "swiperight";
              if (("horizontal" === n ? (r._swipeEvent = r.createEvent(e, o)) : ((o = t < 0 ? "swipetop" : "swipebottom"), (r._swipeEvent = r.createEvent(e, t < 0 ? "swipetop" : "swipebottom"))), r[o] && (r[o](this._swipeEvent), Math.abs(t) <= this.swipeMax))) return e.stopImmediatePropagation(), !1;
            }
            return !0;
          }
          resetSwipe() {
            (this._swipeEvent = null), clearTimeout(this._swipeTimeout);
          }
          initSwipe(e) {
            const t = this;
            (t._maxSwipeVerticalDistance = 0),
              (t._maxSwipeHorizontalDistance = 0),
              (t._startX = e.pageX),
              (t._startY = e.pageY),
              (t._swipeLocked = !1),
              (t._swipeEvent = null),
              (t._swipeTimeout = setTimeout(function () {
                t._swipeLocked = !0;
              }, t.swipeDelay));
          }
        }
        class m {
          get scrollWidth() {
            const e = this;
            return e.horizontalScrollBar ? e.horizontalScrollBar.max : -1;
          }
          set scrollWidth(e) {
            const t = this;
            e < 0 && (e = 0), t.horizontalScrollBar && (t.horizontalScrollBar.max = e);
          }
          get scrollHeight() {
            const e = this;
            return e.verticalScrollBar ? e.verticalScrollBar.max : -1;
          }
          set scrollHeight(e) {
            const t = this;
            e < 0 && (e = 0), t.verticalScrollBar && (t.verticalScrollBar.max = e);
          }
          get scrollLeft() {
            const e = this;
            return e.horizontalScrollBar ? e.horizontalScrollBar.value : -1;
          }
          set scrollLeft(e) {
            const t = this;
            e < 0 && (e = 0), t.horizontalScrollBar && (t.horizontalScrollBar.value = e);
          }
          get scrollTop() {
            const e = this;
            return e.verticalScrollBar ? e.verticalScrollBar.value : -1;
          }
          set scrollTop(e) {
            const t = this;
            e < 0 && (e = 0), t.verticalScrollBar && (t.verticalScrollBar.value = e);
          }
          get vScrollBar() {
            return this.verticalScrollBar;
          }
          get hScrollBar() {
            return this.horizontalScrollBar;
          }
          constructor(e, t, n) {
            const r = this;
            (r.container = e), (r.horizontalScrollBar = t), (r.verticalScrollBar = n), (r.disableSwipeScroll = !1), r.listen();
          }
          listen() {
            const e = this,
              t = a.isMobile,
              n = e.horizontalScrollBar,
              r = e.verticalScrollBar;
            let o, i, s, l, d, c, u, p;
            e.inputEvents = new h(e.container);
            const m = function (e) {
                return { amplitude: 0, delta: 0, initialValue: 0, min: 0, max: e.max, previousValue: 0, pointerPosition: 0, targetValue: 0, scrollBar: e, value: 0, velocity: 0 };
              },
              f = m(n),
              g = m(r),
              w = function () {
                const t = e.container.touchVelocityCoefficient || 50;
                (c = Date.now()), (u = c - l), (l = c);
                const n = function (e) {
                  (e.delta = e.value - e.previousValue), (e.previousValue = e.value);
                  let n = (t * e.delta) / (1 + u);
                  e.velocity = 0.8 * n + 0.2 * e.velocity;
                };
                n(g), n(f);
              },
              b = function (e) {
                return (p.value = e > p.max ? p.max : e < p.min ? p.min : e), (p.scrollBar.value = p.value), e > p.max ? "max" : e < p.min ? "min" : "value";
              };
            function v() {
              let t, n;
              p.amplitude && (e.container.$.fireEvent("kineticScroll"), (t = Date.now() - l), (n = -p.amplitude * Math.exp(-t / 500)), n > 5 || n < -5 ? (b(p.targetValue + n), cancelAnimationFrame(i), (i = 0), (i = requestAnimationFrame(v))) : b(p.targetValue));
            }
            let _;
            e.inputEvents.down(function (n) {
              if (!t) return;
              const r = n.originalEvent.currentTarget,
                i = r && r.closest ? r.closest("smart-scroll-bar") : void 0;
              if (i === e.horizontalScrollBar || i === e.verticalScrollBar) return;
              (s = !0), (o = !1);
              const a = function (e, t) {
                (e.amplitude = 0), (e.pointerPosition = t), (e.previousValue = e.value), (e.value = e.scrollBar.value), (e.initialValue = e.value), (e.max = e.scrollBar.max);
              };
              a(g, n.clientY), a(f, n.clientX), (l = Date.now()), clearInterval(d), (d = setInterval(w, 500));
            }),
              e.inputEvents.up(function () {
                if (!s) return !0;
                if ((clearInterval(d), e.disableSwipeScroll)) return void (s = !1);
                const t = function (e) {
                  (p = e), (e.amplitude = 0.8 * e.velocity), (e.targetValue = Math.round(e.value + e.amplitude)), (l = Date.now()), cancelAnimationFrame(i), (i = requestAnimationFrame(v)), (e.velocity = 0);
                };
                g.velocity > 10 || g.velocity < -10 ? t(g) : (f.velocity > 10 || f.velocity < -10) && t(f), (s = !1);
              }),
              e.inputEvents.move(function (t) {
                if (!s) return !0;
                if (e.disableSwipeScroll) return;
                if ((o && (t.originalEvent.preventDefault(), t.originalEvent.stopPropagation()), (f.visible = e.scrollWidth > 0), (g.visible = e.scrollHeight > 0), !s || (!f.visible && !g.visible))) return;
                const n = e.container.touchScrollRatio,
                  r = e.container;
                let i, a;
                n && ("number" == typeof n ? ((i = -n), (a = -n)) : "function" == typeof n && ((i = n(g.max, r.offsetHeight)), (a = n(f.max, r.offsetWidth)))), (g.ratio = i || -g.max / r.offsetHeight), (g.delta = (t.clientY - g.pointerPosition) * g.ratio), (f.ratio = a || -f.max / r.offsetWidth), (f.delta = (t.clientX - f.pointerPosition) * f.ratio);
                let l = "value";
                const d = function (t, n, r) {
                  return t.delta > 5 || t.delta < -5 ? ((p = t), (l = t.initialValue + t.delta > p.max ? "max" : t.initialValue + t.delta < p.min ? "min" : "value"), ("min" === l && 0 === t.initialValue) || ("max" === l && t.initialValue === t.max) || !t.visible || (e.container.$.fireEvent("kineticScroll"), b(t.initialValue + t.delta), w(), r.originalEvent.preventDefault(), r.originalEvent.stopPropagation(), (o = !0), !1)) : null;
                };
                let c = d(g, t.clientY, t);
                if (null !== c) return c;
                {
                  let e = d(f, t.clientX, t);
                  if (null !== e) return e;
                }
              }),
              (e.scrollTo = function (t, n) {
                const r = !1 === n ? f : g;
                let o = !1;
                l || (l = Date.now()), _ || (_ = Date.now()), Math.abs(Date.now() - _) > 375 ? (l = Date.now()) : (o = !0), (_ = Date.now()), (r.value = r.scrollBar.value), (r.delta = t - r.value), (r.max = r.scrollBar.max), t <= r.min && (t = r.min), t >= r.max && (t = r.max), (r.targetValue = t);
                const s = t;
                let a = r.value;
                (r.velocity = (100 * r.delta) / (1 + r.max)), (r.from = a);
                const d = function (e) {
                    return (r.value = e > r.max ? r.max : e < r.min ? r.min : e), (r.scrollBar.value = r.value), e > r.max ? "max" : e < r.min ? "min" : "value";
                  },
                  c = function () {
                    let n,
                      u = Date.now() - _,
                      p = Math.min(1e3, Date.now() - l),
                      h = r.velocity * Math.exp(p / 175);
                    if (o) ((h < 0 && r.value <= t) || (h > 0 && r.value >= t)) && (h = 0), (r.value + h <= r.min || r.value + h >= r.max) && (h = 0), h > 0.5 || h < -0.5 ? (d(r.value + h), cancelAnimationFrame(i), (i = 0), (i = requestAnimationFrame(c))) : d(r.targetValue);
                    else {
                      if (u >= 175) return cancelAnimationFrame(i), e.container.$.fireEvent("kineticScroll"), void (i = 0);
                      (n = y.Animation.Easings.easeInSine(u, a, s - a, 175)), d(n), cancelAnimationFrame(i), (i = 0), (i = requestAnimationFrame(c));
                    }
                  };
                cancelAnimationFrame(i), (i = requestAnimationFrame(c));
              }),
              e.inputEvents.listen();
          }
          unlisten() {
            const e = this;
            e.inputEvents && e.inputEvents.unlisten(), delete e.inputEvents;
          }
        }
        class f {
          constructor(e) {
            (this.events = {}), (this.handlers = {}), (this.element = e);
          }
          hasClass(e) {
            const t = this,
              n = e.split(" ");
            for (let e = 0; e < n.length; e++) if (!t.element.classList.contains(n[e])) return !1;
            return !0;
          }
          addClass(e) {
            const t = this;
            if (t.hasClass(e)) return;
            const n = e.split(" ");
            for (let e = 0; e < n.length; e++) t.element.classList.add(n[e]);
            t.isNativeElement || d.observeElement(t.element);
          }
          removeClass(e) {
            const t = this;
            if (0 === arguments.length) return void t.element.removeAttribute("class");
            const n = e.split(" ");
            for (let e = 0; e < n.length; e++) t.element.classList.remove(n[e]);
            "" === t.element.className && t.element.removeAttribute("class"), t.isNativeElement || d.observeElement(t.element);
          }
          get isCustomElement() {
            const e = this;
            return !!e.element.tagName.startsWith(n) || e.element instanceof window[n].BaseElement == 1 || ("DIV" !== e.element.tagName && "SPAN" !== e.element.tagName && "BUTTON" !== e.element.tagName && "INPUT" !== e.element.tagName && "UL" !== e.element.tagName && "LI" !== e.element.tagName && document.createElement(e.element.nodeName) instanceof window[n].BaseElement == 1);
          }
          get isNativeElement() {
            return !this.isCustomElement;
          }
          dispatch(e) {
            const t = this,
              n = t.events[e.type];
            let r = !1;
            if (n.length > 1)
              for (let e = 0; e < n.length; e++) {
                const t = n[e];
                if (t.namespace && t.namespace.indexOf("_") >= 0) {
                  r = !0;
                  break;
                }
              }
            r &&
              n.sort(function (e, t) {
                let n = e.namespace,
                  r = t.namespace;
                return (n = -1 === n.indexOf("_") ? 0 : parseInt(n.substring(n.indexOf("_") + 1))), (r = -1 === r.indexOf("_") ? 0 : parseInt(r.substring(r.indexOf("_") + 1))), n < r ? -1 : n > r ? 1 : 0;
              });
            for (let r = 0; r < n.length; r++) {
              const o = n[r];
              if (((e.namespace = o.namespace), (e.context = o.context), e.defaultPrevented)) break;
              const i = o.handler.apply(t.element, [e]);
              if (void 0 !== i && ((e.result = i), !1 === i)) {
                e.preventDefault(), e.stopPropagation();
                break;
              }
            }
            return e.result;
          }
          fireEvent(e, t, n) {
            const r = this;
            n || (n = { bubbles: !0, cancelable: !0, composed: null !== r.element.getRootNode().host }), (n.detail = t || {});
            const o = new CustomEvent(e, n);
            return (
              (o.originalStopPropagation = o.stopPropagation),
              (o.stopPropagation = function () {
                return (o.isPropagationStopped = !0), o.originalStopPropagation();
              }),
              r.dispatchEvent(o),
              o
            );
          }
          get isPassiveSupported() {
            const e = this;
            if (void 0 !== e.supportsPassive) return e.supportsPassive;
            e.supportsPassive = !1;
            try {
              let t = Object.defineProperty({}, "passive", {
                get: function () {
                  e.supportsPassive = !0;
                },
              });
              window.addEventListener("testPassive", null, t), window.removeEventListener("testPassive", null, t);
            } catch (e) {}
            return e.supportsPassive;
          }
          dispatchEvent(e) {
            const t = this,
              n = e.type,
              r = t.element.context,
              o = n.substring(0, 1).toUpperCase() + n.substring(1);
            (t.element.context = document), t.element["on" + o] ? t.element["on" + o](e) : t.element["on" + n.toLowerCase()] ? t.element["on" + n.toLowerCase()](e) : t.element.dispatchEvent(e), (t.element.context = r);
          }
          listen(e, t) {
            const n = this,
              r = e.split("."),
              o = r.slice(1).join("."),
              i = r[0];
            n.events[i] || (n.events[i] = []);
            const s = { type: i, handler: t, context: n.element, namespace: o };
            p.indexOf(i) >= 0 &&
              (n.inputEvents || (n.inputEvents = new h(n.element)),
              n.inputEvents[i](function (e) {
                n.dispatchEvent(e);
              }),
              n.inputEvents.boundEventTypes.push(i),
              n.inputEvents.listen(i)),
              0 === n.events[i].length && ((n.handlers[i] = n.dispatch.bind(n)), "wheel" === i ? n.element.addEventListener("wheel", n.handlers[i], !!n.isPassiveSupported && { passive: !1 }) : "touchmove" === i || "touchstart" === i || "touchend" === i ? n.element.addEventListener(i, n.handlers[i], !!n.isPassiveSupported && { passive: !1 }) : n.element.addEventListener(i, n.handlers[i], !1)),
              n.events[i].push(s);
          }
          unlisten(e) {
            const t = this,
              n = e.split("."),
              r = n.slice(1).join("."),
              o = n[0];
            let i = t.events[o];
            if ((t.inputEvents && t.inputEvents.boundEventTypes.indexOf(o) >= 0 && (t.inputEvents.boundEventTypes.splice(t.inputEvents.boundEventTypes.indexOf(o), 1), 0 === t.inputEvents.boundEventTypes.length && t.inputEvents.unlisten(o)), i)) {
              for (let e = 0; e < i.length; e++) {
                if ("" !== r) {
                  let e = i.findIndex((e) => e.namespace === r);
                  i.splice(e, 1);
                  break;
                }
                i = [];
              }
              0 === i.length && (t.element.removeEventListener(o, t.handlers[o]), (t.events[o] = []), delete t.handlers[o]);
            }
          }
          getAttributeValue(e, t) {
            const n = this,
              r = n.element.getAttribute(e);
            if (n.isNativeElement) return n.deserialize(r, t);
            const o = n.element.propertyByAttributeName[e];
            return void 0 === o.deserialize ? n.deserialize(r, t, o.nullable) : n.element[o.deserialize](r);
          }
          setAttributeValue(e, t, n) {
            const r = this;
            let o,
              i = !1;
            if (r.isNativeElement) {
              if (((o = r.serialize(t, n)), "boolean" === n && ["checked", "selected", "async", "autofocus", "autoplay", "controls", "defer", "disabled", "hidden", "ismap", "loop", "multiple", "open", "readonly", "required", "scoped"].indexOf(e) >= 0)) return void (t ? r.element.setAttribute(e, "") : r.element.removeAttribute(e));
            } else {
              const s = r.element.propertyByAttributeName[e];
              (i = !s || s.nullable), (o = s && s.serialize ? r.element[s.serialize](t) : r.serialize(t, n, i));
            }
            ("array" !== n && "object" !== n) || ("[]" !== o && "{}" !== o) ? (void 0 === o ? (r.element.removeAttribute(e), r.element.shadowRoot && r.element.$.root && r.element.$.root.removeAttribute(e)) : (r.element.setAttribute(e, o), r.element.shadowRoot && r.element.$.root && r.element.$.root.setAttribute(e, o))) : r.element.removeAttribute(e);
          }
          serialize(e, t, n) {
            if ((void 0 === t && (t = y.Types.getType(e)), void 0 !== e && (n || null !== e))) {
              if (n && null === e) return "null";
              if ("string" === t) return e;
              if ("boolean" === t || "bool" === t) {
                if (!0 === e || "true" === e || 1 === e || "1" === e) return "";
                if (!1 === e || "false" === e || 0 === e || "0" === e) return;
              }
              return "array" === t ? JSON.stringify(e) : ["string", "number", "int", "integer", "float", "date", "any", "function"].indexOf(t) >= 0 ? e.toString() : "object" === t ? JSON.stringify(e) : void 0;
            }
          }
          deserialize(e, t, n) {
            const r = "null" === e;
            if (void 0 !== e && (!r || n)) {
              if (r && n) return null;
              if ("boolean" === t || "bool" === t) return null !== e;
              if ("number" === t || "float" === t) return "NaN" === e ? NaN : "Infinity" === e ? 1 / 0 : "-Infinity" === e ? -1 / 0 : parseFloat(e);
              if ("int" === t || "integer" === t) return "NaN" === e ? NaN : "Infinity" === e ? 1 / 0 : "-Infinity" === e ? -1 / 0 : parseInt(e);
              if ("string" === t) return e;
              if ("any" === t) return e;
              if ("date" === t) return new Date(e);
              if ("function" === t) {
                if ("function" == typeof window[e]) return window[e];
              } else if ("array" === t || "object" === t)
                try {
                  const t = JSON.parse(e);
                  if (t) return t;
                } catch (n) {
                  if (window[e] && "object" == typeof window[e]) return window[e];
                  if ("array" === t && e.indexOf("[") >= 0) {
                    if (e.indexOf("{") >= 0) {
                      let t = e.replace(/{/gi, "").replace("[", "").replace("]", "").replace(/'/gi, "").replace(/"/gi, "").trim();
                      t = t.split("},");
                      for (let e = 0; e < t.length; e++) {
                        let n = {},
                          r = t[e].trim().split(",");
                        for (let e = 0; e < r.length; e++) {
                          const t = r[e].split(":")[0].trim(),
                            o = r[e].split(":")[1].trim();
                          n[t] = o;
                        }
                        t[e] = n;
                      }
                      return t;
                    }
                    return e.replace("[", "").replace("]", "").replace(/'/gi, "").replace(/"/gi, "").trim().split(",");
                  }
                }
            }
          }
        }
        class g {
          static get Ripple() {
            return i;
          }
          static get Easings() {
            return s;
          }
        }
        class y {
          static get Types() {
            return o;
          }
          static get Core() {
            return a;
          }
          static get Animation() {
            return g;
          }
          static get Scroll() {
            return m;
          }
          static get InputEvents() {
            return h;
          }
          static Extend(e) {
            return new f(e);
          }
          static Assign(e, t) {
            if (e.indexOf(".") >= 0) {
              const n = e.split(".");
              return y[n[0]] || (y[n[0]] = {}), void (y[n[0]][n[1]] = t);
            }
            y[e] = t;
          }
        }
        const w = y.Extend(document);
        let b = null;
        document.addEventListener("click", () => {
          d.start(),
            b && clearTimeout(b),
            (b = setTimeout(() => {
              d.stop();
            }, 1e4));
        }),
          document.addEventListener("mouseenter", () => {
            d.start();
          }),
          document.addEventListener("mouseleave", () => {
            d.stop();
          });
        class v {}
        v.cache = {};
        class _ extends HTMLElement {
          static get properties() {
            return { animation: { value: "advanced", type: "string", allowedValues: ["none", "simple", "advanced"] }, unfocusable: { value: !1, type: "boolean" }, disabled: { value: !1, type: "boolean" }, dataContext: { value: null, reflectToAttribute: !1, type: "any" }, debugMode: { value: !0, type: "boolean", reflectToAttribute: !1 }, locale: { value: "en", type: "string", reflectToAttribute: !1 }, localizeFormatFunction: { value: null, type: "any", reflectToAttribute: !1 }, messages: { value: { en: { propertyUnknownName: "Invalid property name: '{{name}}'!", propertyUnknownType: "'{{name}}' property is with undefined 'type' member!", propertyInvalidValue: "Invalid '{{name}}' property value! Actual value: '{{actualValue}}', Expected value: '{{value}}'!", propertyInvalidValueType: "Invalid '{{name}}' property value type! Actual type: '{{actualType}}', Expected type: '{{type}}'!", methodInvalidValueType: "Invalid '{{name}}' method argument value type! Actual type: '{{actualType}}', Expected type: '{{type}}' for argument with index: '{{argumentIndex}}'!", methodInvalidArgumentsCount: "Invalid '{{name}}' method arguments count! Actual arguments count: '{{actualArgumentsCount}}', Expected at least: '{{argumentsCount}}' argument(s)!", methodInvalidReturnType: "Invalid '{{name}}' method return type! Actual type: '{{actualType}}', Expected type: '{{type}}'!", elementNotInDOM: "Element does not exist in DOM! Please, add the element to the DOM, before invoking a method.", moduleUndefined: "Module is undefined.", missingReference: "{{elementType}}: Missing reference to '{{files}}'.", htmlTemplateNotSuported: "{{elementType}}: Web Browser doesn't support HTMLTemplate elements.", invalidTemplate: "{{elementType}}: '{{property}}' property accepts a string that must match the id of an HTMLTemplate element from the DOM." } }, reflectToAttribute: !1, inherit: !0, type: "object" }, props: { value: null, reflectToAttribute: !1, isHierarchicalProperty: !0, type: "any" }, readonly: { value: !1, type: "boolean" }, renderMode: { value: "auto", type: "string", reflectToAttribute: !1, allowedValues: ["auto", "manual"] }, rightToLeft: { value: !1, type: "boolean" }, rethrowError: { value: !0, type: "boolean", reflectToAttribute: !1 }, theme: { value: window[n].Theme, type: "string" }, visibility: { value: "visible", allowedValues: ["visible", "collapsed", "hidden"], type: "string" }, wait: { value: !1, type: "boolean" } };
          }
          getBindings(e, t) {
            const n = this;
            let r = 0,
              o = {},
              i = ((e) => {
                if (e instanceof HTMLElement) return n.parseAttributes(e);
                {
                  let t = n.parseProperty(e.data ? e.data.trim() : null, "textContent", e);
                  if (t) return n && e.parentNode === n.$.content && ((t.value = "" !== n.$.html ? n.$.html : void 0), (n.innerHTML = "")), { textContent: t };
                }
              })(e);
            i && (o.data = i), t || ((o.mapping = []), (t = o)), e.getAttribute && ((o.nodeId = e.getAttribute("smart-id")), t && i && (t.mapping[o.nodeId] = i)), (o.node = e), e.firstChild && (o.children = {});
            for (let i = e.firstChild; i; i = i.nextSibling) o.children[r++] = n.getBindings(i, t);
            return o;
          }
          _addRemovePropertyBinding(e, t, n, r, o) {
            if (!e || !t || !n) return;
            const i = this,
              s = i.bindings,
              a = n.getAttribute("smart-id"),
              l = e.indexOf("{{") >= 0;
            let d = !1;
            (e = e.replace("{{", "").replace("}}", "").replace("[[", "").replace("]]", "")).indexOf("!") >= 0 && ((e = e.replace("!", "")), (d = !0));
            const c = i._properties[e],
              u = { name: e, reflectToAttribute: c.reflectToAttribute, twoWay: l, type: c.type, not: d };
            if (o && !r) {
              const n = {},
                r = { name: e, targetPropertyName: t, reflectToAttribute: c.reflectToAttribute, twoWay: l, type: c.type, not: d };
              (n[e] = r), (s.mapping[a] = n);
            }
            const p = function (e) {
              for (let o in e) {
                const s = e[o];
                if (s.nodeId === a) {
                  s.data || (s.data = {}), r ? ((s.data[t] = null), delete s.data[t]) : (s.data[t] = u);
                  break;
                }
                if (s.children) p(s.children);
                else if (s.node && s.node.children && s.node === n.parentElement) {
                  const e = s.node;
                  if (!e.firstChild) continue;
                  s.children = {};
                  let t = 0;
                  for (let n = e.firstChild; n; n = n.nextSibling) s.children[t++] = i.getBindings(n);
                  p(s.children);
                }
              }
            };
            p(s.children), r ? delete i.boundProperties[e] : (i.boundProperties[e] = !0), i.updateBoundNodes(e);
          }
          addPropertyBinding(e, t, n, r) {
            this._addRemovePropertyBinding(e, t, n, !1, r);
          }
          removePropertyBinding(e, t, n, r) {
            this._addRemovePropertyBinding(e, t, n, !0, r);
          }
          parseAttributes(e) {
            const t = this;
            let n;
            for (let r = 0; r < e.attributes.length; r++) {
              const o = e.attributes[r],
                i = o.name,
                s = o.value;
              v.cache["toCamelCase" + i] || (v.cache["toCamelCase" + i] = y.Core.toCamelCase(i));
              const a = v.cache["toCamelCase" + i];
              if (i.indexOf("(") >= 0) {
                let r = i.substring(1, i.length - 1);
                if (t && !t.dataContext) {
                  (t.templateListeners[e.getAttribute("smart-id") + "." + r] = s), e.removeAttribute(i);
                  continue;
                }
                {
                  n || (n = {});
                  const e = s.substring(0, s.indexOf("("));
                  n[a] = { isEvent: !0, name: r, value: e };
                  continue;
                }
              }
              let l = t.parseProperty(s, i, e);
              l && (n || (n = {}), (n[a] = l));
            }
            return n;
          }
          parseProperty(e, t) {
            if (!e || !e.length) return;
            const n = this;
            let r,
              o = e.length,
              i = 0,
              s = 0,
              a = 0,
              l = !0;
            for (; s < o; ) {
              i = e.indexOf("{{", s);
              let t = e.indexOf("[[", s),
                n = "}}";
              if ((t >= 0 && (i < 0 || t < i) && ((i = t), (l = !1), (n = "]]")), (a = i < 0 ? -1 : e.indexOf(n, i + 2)), a < 0)) return;
              r = r || {};
              let o = e.slice(i + 2, a).trim();
              (r.name = o), (s = a + 2);
            }
            const d = r.name,
              c = n ? n._properties[d] : null;
            return (r.twoWay = l), (r.ready = !1), n && (d.indexOf("::") >= 0 ? (n.boundProperties[d.substring(0, d.indexOf("::"))] = !0) : (n.boundProperties[d] = !0)), c ? ((r.type = c.type), (r.reflectToAttribute = c.reflectToAttribute)) : (["checked", "selected", "async", "autofocus", "autoplay", "controls", "defer", "disabled", "hidden", "ismap", "loop", "multiple", "open", "readonly", "required", "scoped"].indexOf(t) >= 0 ? (r.type = "boolean") : (r.type = "string"), (r.reflectToAttribute = !0)), r;
          }
          updateTextNodes() {
            const e = this;
            e.updateTextNode(e.shadowRoot || e, e.bindings, e);
          }
          updateTextNode(e, t, n) {
            const r = this;
            if (!t) return;
            let o = 0;
            for (let i = e.firstChild; i && t.children; i = i.nextSibling) r.updateTextNode(i, t.children[o++], n);
            if (t && t.data)
              for (let e in t.data) {
                const r = t.data[e],
                  o = r.name;
                "textContent" === e && r.twoWay && !r.updating && void 0 !== r.value && (n[o] = r.value);
              }
          }
          updateBoundProperty(e, t) {
            if (t.updating) return;
            const n = this;
            (t.updating = !0), (n[e] = t.value), (t.updating = !1);
          }
          updateBoundNodes(e) {
            const t = this;
            if ((t.updateBoundNode(t.shadowRoot || t, t.bindings, t, e), t.detachedChildren.length > 0))
              for (let n = 0; n < t.detachedChildren.length; n++) {
                const r = t.detachedChildren[n],
                  o = r.getAttribute("smart-id"),
                  i = function (e) {
                    if (e.nodeId === o) return e;
                    for (let t in e.children) {
                      const n = e.children[t];
                      if ((n.getAttribute ? n.getAttribute("smart-id") : "") === o) return e;
                      if (n.children) {
                        const e = i(n);
                        if (e) return e;
                      }
                    }
                    return null;
                  },
                  s = i(t.bindings);
                if (s) t.updateBoundNode(r, s, t, e, !0);
                else if (r.getAttribute && t.bindings.mapping) {
                  const n = t,
                    r = t.bindings;
                  if (r)
                    for (let o in r.mapping) {
                      const i = n.querySelector('[smart-id="' + o + '"]');
                      if (i) {
                        const s = r.mapping[o];
                        t.updateBoundData(i, s, n, e);
                      }
                    }
                }
              }
          }
          updateBoundMappedNodes() {
            const e = this,
              t = e.bindings,
              n = e;
            if (t.mapping)
              for (let r in t.mapping) {
                let o = n.querySelector('[smart-id="' + r + '"]');
                if ((n.shadowRoot && ((o = n.querySelector('[id="' + r + '"]')), o || (o = n.shadowRoot.querySelector('[id="' + r + '"]') || n.shadowRoot.querySelector('[smart-id="' + r + '"]'))), o)) {
                  const i = t.mapping[r];
                  e.updateBoundData(o, i, n);
                } else if (n.getAttribute("aria-controls")) {
                  let i = document.getElementById(n.getAttribute("aria-controls"));
                  if ((!i && n.shadowRoot && (i = n.shadowRoot.getElementById(n.getAttribute("aria-controls"))), (o = i.querySelector('[smart-id="' + r + '"]')), o)) {
                    const i = t.mapping[r];
                    e.updateBoundData(o, i, n);
                  }
                }
              }
          }
          updateBoundNode(e, t, n, r, o) {
            const i = this;
            if (!t) return;
            let s = 0;
            if (o) {
              if (o && !t.data)
                for (let a = e.firstChild; a && t.children; a = a.nextSibling)
                  if (a.getAttribute) {
                    const e = a.getAttribute("smart-id"),
                      o = (function () {
                        for (let n in t.children) if (t.children[n].nodeId === e) return t.children[n];
                      })();
                    i.updateBoundNode(a, o, n, r), s++;
                  } else i.updateBoundNode(a, t.children[s++], n, r, o);
            } else
              for (let o = e.firstChild; o && t.children; o = o.nextSibling)
                if (o.getAttribute) {
                  const e = o.getAttribute("smart-id"),
                    a = (function () {
                      for (let n in t.children) if (t.children[n].nodeId === e) return t.children[n];
                    })();
                  i.updateBoundNode(o, a, n, r), s++;
                } else i.updateBoundNode(o, t.children[s++], n, r);
            if (!t || !t.data) return;
            const a = t.data;
            i.updateBoundData(e, a, n, r);
          }
          updateBoundData(e, t, n, r) {
            const o = this;
            for (let i in t) {
              const s = t[i];
              let a = s.name;
              if (!s.updating && (a.indexOf("::") >= 0 && (a = a.substring(0, a.indexOf("::"))), void 0 === r || r === a)) {
                if (a.indexOf("(") >= 0) {
                  let e = a.substring(a.indexOf("("));
                  const t = a.substring(0, a.indexOf("("));
                  if (((e = e.substring(1, e.length - 1)), (e = e.replace(/ /gi, "")), (e = e.split(",")), e.length > 0 && "" !== e[0])) {
                    let r = [];
                    for (let t = 0; t < e.length; t++) r.push(n[e[t]]);
                    s.value = n[t].apply(n, r);
                  } else s.value = n[t]();
                  s.type = typeof s.value;
                } else s.value = n[a];
                if ("innerHTML" === a) {
                  if (e[i].toString().trim() !== n[a].toString().trim()) {
                    if (window.smartBlazor && e[i].indexOf("\x3c!--") >= 0) {
                      (s.ready || n._properties[a].defaultValue !== s.value) && (e[i] = s.value.toString());
                      continue;
                    }
                    (s.ready || n._properties[a].defaultValue !== s.value) && (e[i] = s.value.toString().trim());
                  }
                } else s.not ? ((e[i] = !s.value), s.targetPropertyName && (e[s.targetPropertyName] = !s.value)) : ((e[i] = s.value), s.targetPropertyName && (e[s.targetPropertyName] = s.value));
                if (e.$ && e.$.isNativeElement) {
                  v.cache["toDash" + i] || (v.cache["toDash" + i] = y.Core.toDash(i));
                  const t = v.cache["toDash" + i],
                    n = e.$.getAttributeValue(t, s.type);
                  !s.reflectToAttribute || (n === s.value && s.ready) || e.$.setAttributeValue(t, s.value, s.type), s.reflectToAttribute || e.$.setAttributeValue(t, null, s.type);
                }
                if (!s.ready) {
                  if (e.$ && e.$.isCustomElement) {
                    v.cache["toDash" + i] || (v.cache["toDash" + i] = y.Core.toDash(i));
                    const t = v.cache["toDash" + i];
                    e._properties || (e._beforeCreatedProperties = e._properties = e.propertyByAttributeName = []), e._properties[i] || ((e._properties[i] = { attributeName: t }), e._beforeCreatedProperties && (e._beforeCreatedProperties[i] = e._properties[i]), (e.propertyByAttributeName[t] = e._properties[i]));
                    const n = e._properties[i];
                    (n.isUpdating = !0), s.reflectToAttribute && (s.not ? e.$.setAttributeValue(n.attributeName, !s.value, s.type) : e.$.setAttributeValue(n.attributeName, s.value, s.type)), s.reflectToAttribute || e.$.setAttributeValue(n.attributeName, null, s.type), (n.isUpdating = !1);
                  }
                  if (s.twoWay) {
                    const t = function (t) {
                      if (((s.value = t), e.$ && e.$.isNativeElement)) {
                        v.cache["toDash" + i] || (v.cache["toDash" + i] = y.Core.toDash(i));
                        const t = v.cache["toDash" + i],
                          n = e.$.getAttributeValue(t, s.type);
                        s.reflectToAttribute && n !== s.value && e.$.setAttributeValue(t, s.value, s.type), s.reflectToAttribute || e.$.setAttributeValue(t, null, s.type);
                      }
                    };
                    if (s.name.indexOf("::") >= 0) {
                      const n = s.name.indexOf("::"),
                        r = s.name.substring(n + 2);
                      o["$" + e.getAttribute("smart-id")].listen(r, function () {
                        t(e[i]);
                        const n = s.name.substring(0, s.name.indexOf("::"));
                        o.updateBoundProperty(n, s);
                      });
                    }
                    if (e.$ && e.$.isCustomElement) {
                      e._properties[i] && (e._properties[i].notify = !0), v.cache["toDash" + i] || (v.cache["toDash" + i] = y.Core.toDash(i));
                      const n = v.cache["toDash" + i];
                      o["$" + e.getAttribute("smart-id")].listen(n + "-changed", function (e) {
                        let n = e.detail;
                        t(n.value);
                        const r = o.context;
                        e.context !== document && (o.context = o), o.updateBoundProperty(s.name, s), (o.context = r);
                      });
                    }
                  }
                }
                s.ready = !0;
              }
            }
          }
          static clearCache() {
            this.cache = {};
          }
          addMessages(e, t) {
            Object.assign(this.messages[e], t);
          }
          localize(e, t) {
            const n = this;
            if (!n.messages || !n.messages[n.locale]) return;
            let r = n.messages[n.locale][e];
            if ("" === r) return "";
            if (!r) {
              const r = n.messages.en;
              if (r) {
                let n = r[e];
                if (n) {
                  for (let e in t) {
                    let r = t[e];
                    n = n.replace(new RegExp("{{" + e + "}}", "g"), r);
                  }
                  return n;
                }
                return e;
              }
            }
            const o = r;
            for (let e in t) {
              let n = t[e];
              r = r.replace(new RegExp("{{" + e + "}}", "g"), n);
            }
            if (n.localizeFormatFunction) {
              const i = n.localizeFormatFunction(o, r, t, e);
              if (void 0 !== i) return i;
            }
            return r;
          }
          static get requires() {
            return {};
          }
          static get listeners() {
            return {
              "theme-changed": function (e) {
                this.theme = e.detail.newValue;
              },
            };
          }
          static get methods() {
            return {};
          }
          get classNamesMap() {
            return { animation: "smart-animate", rippleAnimation: "smart-ripple" };
          }
          get hasAnimation() {
            return "none" !== this.animation;
          }
          get hasRippleAnimation() {
            return "none" !== this.animation && "advanced" === this.animation;
          }
          static get modules() {
            return window[n].Modules;
          }
          get properties() {
            const e = this;
            return e._properties || (e._properties = []), e._properties;
          }
          get parents() {
            const e = this;
            let t = [],
              r = e.parentNode;
            for (; r && 9 !== r.nodeType; ) r instanceof HTMLElement == 1 && t.push(r), (r = r.parentNode);
            const o = e.getRootNode();
            if (o.host) {
              const e = (e) => {
                let t = [e],
                  n = e.parentNode;
                for (; n && 9 !== n.nodeType; ) n instanceof HTMLElement == 1 && t.push(n), (n = n.parentNode);
                return t;
              };
              t = t.concat(e(o.host));
            }
            return window[n].EnableShadowDOM && e.isInShadowDOM && e.shadowParent && (t = t.concat(e.shadowParent.parents)), t;
          }
          log(e) {
            this._logger("log", e);
          }
          warn(e) {
            this._logger("warn", e);
          }
          error(e) {
            this._logger("error", e);
          }
          _logger(e, t) {
            if (this.debugMode) {
              const n = t instanceof Error ? t.message : t.toString();
              console[e](n);
            }
            if (this.rethrowError && "error" === e) throw t;
          }
          get focused() {
            return this.contains(document.activeElement);
          }
          template() {
            return "<div></div>";
          }
          registered() {
            const e = this;
            e.onRegistered && e.onRegistered();
          }
          created() {
            const e = this;
            (e.isReady = !1), e._initElement(e), e._setModuleState("created"), e.onCreated && e.onCreated();
          }
          completed() {
            const e = this;
            (e.isCompleted = !0), e._onCompleted && e._onCompleted(), e.onCompleted && e.onCompleted();
          }
          whenReady(e) {
            const t = this;
            t.isCompleted ? e() : (t.whenReadyCallbacks || (t.whenReadyCallbacks = []), t.whenReadyCallbacks.push(e));
          }
          whenRendered(e) {
            const t = this;
            t.isRendered ? e() : (t.whenRenderedCallbacks || (t.whenRenderedCallbacks = []), t.whenRenderedCallbacks.push(e));
          }
          addThemeClass() {
            const e = this;
            "" !== e.theme && e.classList.add("smart-" + e.theme);
          }
          addDefaultClass() {
            const e = this;
            e.classList.add(n.toLowerCase() + "-element"), e.classList.add(e.nodeName.toLowerCase());
          }
          _renderShadowRoot() {
            const e = this;
            if (e.shadowRoot) {
              e.$.root.classList.add(e.nodeName.toLowerCase());
              for (let t = 0; t < e.attributes.length; t++) {
                const n = e.attributes[t];
                "class" === n.name || "id" === n.name || "style" === n.name || "tabindex" === n.name || n.name.indexOf("aria") >= 0 || e.$.root.setAttribute(n.name, n.value);
              }
              for (let t = 0; t < e.classList.length; t++) {
                const n = e.classList[t];
                "smart-element-init" !== n && "smart-element" !== n && "smart-hidden" !== n && "smart-visibility-hidden" !== n && e.$.root.classList.add(n);
              }
            }
          }
          render() {
            const e = this;
            if (!e.isRendered && ((e.isRendered = !0), (e.isRendering = !1), (e.context = document), e._renderShadowRoot(), e.whenRenderedCallbacks)) {
              for (let t = 0; t < e.whenRenderedCallbacks.length; t++) e.whenRenderedCallbacks[t]();
              e.whenRenderedCallbacks = [];
            }
            e.onRender && e.onRender(), e.disabled && e.setAttribute("aria-disabled", !0), e.readonly && -1 !== ["checkbox", "combobox", "grid", "gridcell", "listbox", "radiogroup", "slider", "spinbutton", "textbox"].indexOf(e.getAttribute("role")) && e.setAttribute("aria-readonly", !0);
          }
          ready() {
            const e = this;
            if ((e._setId(), e.addThemeClass(), e.addDefaultClass(), "collapsed" === e.visibility ? e.classList.add("smart-hidden") : "hidden" === e.visibility && e.classList.add("smart-visibility-hidden"), e.dataContext && e.applyDataContext(), e.onReady && e.onReady(), e.shadowRoot && Smart(e._selector))) {
              if (Smart(e._selector).styleUrls) {
                const t = Smart(e._selector).styleUrls;
                for (let n = 0; n < t.length; n++) e.importStyle(t[n]);
              }
              if (Smart(e._selector).styles) {
                const t = document.createElement("style");
                (t.innerHTML = Smart(e._selector).styles), e.shadowRoot.insertBefore(t, e.shadowRoot.firstChild);
              }
            }
            Smart(e._selector) && Smart(e._selector).ready && Smart(e._selector).ready();
          }
          _setId() {
            const e = this;
            if (!e.id) {
              const t = e.elementName;
              e.id =
                t.slice(0, 1).toLowerCase() +
                t.slice(1) +
                Math.floor(65536 * (1 + Math.random()))
                  .toString(16)
                  .substring(1);
            }
          }
          checkLicense() {
            const e = this;
            "Evaluation" === window[n].License && -1 === window.location.hostname.indexOf("htmlelements") && (e.logWatermark(), e.logLicense(), (window[n].License = ""));
          }
          logWatermark() {
            const e = document.createElement("a");
            (e.href = "https://www.htmlelements.com/"),
              (e.innerHTML = "https://www.htmlelements.com/"),
              (e.style.position = "absolute"),
              (e.style.right = "5px"),
              (e.style.bottom = "5px"),
              (e.style.color = "#fff"),
              (e.style.padding = "20px"),
              (e.style.borderRadius = "5px"),
              (e.style.background = "#0C3D78"),
              (e.style.cursor = "pointer"),
              (e.style.zIndex = "999999"),
              (e.style.display = "none"),
              (e.style.fontSize = "24px"),
              (e.style.textDecoration = "none"),
              (e.style.fontWeight = "bold"),
              (e.style.opacity = 0),
              (e.style.transition = "opacity .35s ease-in-out"),
              (e.id = "watermark"),
              document.getElementById("watermark") ||
                setTimeout(() => {
                  document.getElementById("watermark") ||
                    (document.body.appendChild(e),
                    setTimeout(() => {
                      e.style.opacity = 1;
                    }),
                    setTimeout(() => {
                      (e.style.opacity = 0),
                        setTimeout(() => {
                          e.parentNode.removeChild(e);
                        }, 350);
                    }, 6e3));
                }, 1e3);
          }
          logLicense() {
            "";
          }
          get _selector() {
            const e = this;
            return e.id ? "#" + e.id : e.classList.length > 0 ? "." + e.classList[0] : "";
          }
          applyDataContext(e) {
            const t = this;
            let n = "string" == typeof t.dataContext ? window[t.dataContext] || document[t.dataContext] : t.dataContext;
            if ((e && ((n = e), (t.dataContext = e)), n)) {
              if (!n._uid) {
                (n._uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()), (n._properties = []);
                for (let e in n) {
                  const r = n[e];
                  "function" != typeof r &&
                    "_properties" !== e &&
                    "_uid" !== e &&
                    ((n._properties[e] = r),
                    Object.defineProperty(n, e, {
                      configurable: !1,
                      enumerable: !0,
                      get: () => n._properties[e],
                      set(r) {
                        const o = n._properties[e];
                        n._properties[e] = r;
                        let i = [];
                        (i[e] = { oldValue: o, value: r }), i.length++, (t.updatingDataContext = !0), w.fireEvent("dataContextPropertyChanged", { dataContext: n, properties: i }, { bubbles: !1, cancelable: !0 }), (t.updatingDataContext = !1);
                      },
                    }));
                }
              }
              if (((t.dataContextProperties = t.parseAttributes(t)), (t.dataContextPropertiesMap = {}), (t.dataContextListeners = {}), t.dataContextProperties)) {
                t.updatingDataContext = !0;
                for (let e in t.dataContextProperties) {
                  const r = t.dataContextProperties[e],
                    o = r.name;
                  if (((r.propertyName = e), (t.dataContextPropertiesMap[o] = e), v.cache["toDash" + e] || (v.cache["toDash" + e] = y.Core.toDash(o)), r.isEvent)) {
                    const e = r.value;
                    t.dataContextListeners[o] && t.removeEventListener(o, t.dataContextListeners[o]),
                      (t.dataContextListeners[o] = function (t) {
                        n[e](t);
                      }),
                      t.addEventListener(o, t.dataContextListeners[o]);
                  }
                  if (o.indexOf(".") >= 0) {
                    const r = o.split(".");
                    let i = n[r[0]];
                    for (let e = 1; e < r.length; e++) i = i[r[e]];
                    void 0 !== i && (t[e] = i);
                  } else t[e] = n[o];
                }
                (t.dataContextPropertyChangedHandler = function (e) {
                  const n = e.detail.properties;
                  if (e.detail.dataContext === ("string" == typeof t.dataContext ? window[t.dataContext] || document[t.dataContext] : t.dataContext))
                    for (let e in n) {
                      const r = t.dataContextPropertiesMap[e],
                        o = t.context;
                      r && ((t.context = document), (t[r] = n[e].value), (t.context = o));
                    }
                }),
                  w.listen("dataContextPropertyChanged", t.dataContextPropertyChangedHandler),
                  (t.updatingDataContext = !1);
              } else t.dataContextProperties = null;
            } else {
              t.dataContextProperties = null;
              const e = function () {
                ("string" == typeof t.dataContext ? window[t.dataContext] || document[t.dataContext] : t.dataContext) && (t.applyDataContext(), window.removeEventListener("load", e));
              };
              window.addEventListener("load", e);
            }
          }
          updateDataContextProperty(e) {
            const t = this,
              n = "string" == typeof t.dataContext ? window[t.dataContext] || document[t.dataContext] : t.dataContext,
              r = t.dataContextProperties[e];
            if (!t.updatingDataContext && r.twoWay) {
              const o = r.name;
              if (o.indexOf(".") >= 0) {
                const r = o.split(".");
                let i = n[r[0]];
                for (let e = 1; e < r.length; e++) i = i[r[e]];
                void 0 !== i && ((i = t[e]), c[n._uid] && (c[n._uid][e] = i));
              } else (n[o] = t[e]), c[n._uid] && (c[n._uid][e] = n[o]);
            }
          }
          static get version() {
            return window[n].Version;
          }
          initProperties() {
            const e = this;
            if ((Smart(e._selector) && Smart(e._selector).properties && (e._initProperties = Smart(e._selector).properties), e.hasAttribute("props") && !e.props ? (e._initProperties = window[e.getAttribute("props")]) : e.props && (e._initProperties = e.props), e._initProperties)) {
              const t = Object.keys(e._initProperties);
              for (let n = 0; n < t.length; n++) {
                const r = t[n],
                  o = e._initProperties[r];
                if (void 0 !== o) {
                  if (o.constructor === Smart.ObservableArray || o instanceof Smart.ObservableArray) {
                    e[r] = o.toArray();
                    continue;
                  }
                  if (o.constructor === Smart.DataAdapter || "smartDataAdapter" === o.constructor.name || ("object" == typeof o && Smart.DataAdapter && o instanceof Smart.DataAdapter) || o instanceof Smart.Observable || o.constructor === Smart.Observable || "object" != typeof o || y.Types.isArray(o) || o instanceof Date) {
                    if (void 0 === e[r] && -1 === ["onReady", "onAttached", "onDetached", "onCreated", "onCompleted"].indexOf(r)) {
                      const t = e.localize("propertyUnknownName", { name: r });
                      e.log(t);
                    }
                    e[r] = o;
                    continue;
                  }
                }
                if ("messages" !== r)
                  if ("dataSourceMap" !== r && "rowCSSRules" !== r) {
                    if (o && "object" == typeof o) {
                      const t = function (n, r) {
                        const o = Object.keys(n);
                        for (let i = 0; i < o.length; i++) {
                          const s = o[i],
                            a = n[s],
                            l = e._properties[r + "_" + s];
                          if (l && null === l.value) {
                            if (void 0 === e[r + "_" + s]) {
                              const t = e.localize("propertyUnknownName", { name: r + "_" + s });
                              e.log(t);
                            }
                            e[r + "_" + s] = a;
                          } else if ("object" == typeof a && !y.Types.isArray(a) && a && a.constructor !== Date) t(a, r + "_" + s);
                          else {
                            if (void 0 === e[r + "_" + s]) {
                              const t = e.localize("propertyUnknownName", { name: r + "_" + s });
                              e.log(t);
                            }
                            e[r + "_" + s] = a;
                          }
                        }
                      };
                      t(o, r);
                    }
                  } else e[r] = o;
                else e[r] = Object.assign(e[r], o);
              }
            }
          }
          setProperties(e) {
            const t = this,
              n = Object.keys(e);
            for (let r = 0; r < n.length; r++) {
              const o = n[r],
                i = e[o];
              if (i.constructor === Smart.ObservableArray || i instanceof Smart.ObservableArray) t[o] = i.toArray();
              else if (i.constructor === Smart.DataAdapter || "smartDataAdapter" === i.constructor.name || ("object" == typeof i && Smart.DataAdapter && i instanceof Smart.DataAdapter) || i instanceof Smart.Observable || i.constructor === Smart.Observable || "object" != typeof i || y.Types.isArray(i) || i instanceof Date) {
                if (void 0 === t[o] && -1 === ["onReady", "onAttached", "onDetached", "onCreated", "onCompleted"].indexOf(o)) continue;
                const e = t._properties[o];
                "int" === e.type || ("number" === e.type && "string" == typeof subPropertyValue) ? ("int" === e.type ? (t[o] = parseInt(i)) : (t[o] = parseFloat(i))) : (t[o] = i);
              } else if ("messages" !== o && "dataSourceMap" !== o) {
                if ("object" == typeof i) {
                  const e = function (n, r) {
                    const o = Object.keys(n);
                    for (let i = 0; i < o.length; i++) {
                      const s = o[i],
                        a = n[s],
                        l = t._properties[r + "_" + s];
                      if (l && null === l.value) {
                        if (void 0 === t[r + "_" + s]) continue;
                        const e = t._properties[r + "_" + s];
                        "int" === e.type || ("number" === e.type && "string" == typeof a) ? ("int" === e.type ? (t[r + "_" + s] = parseInt(a)) : (t[r + "_" + s] = parseFloat(a))) : (t[r + "_" + s] = a);
                      } else if ("object" == typeof a && !y.Types.isArray(a) && a && a.constructor !== Date) e(a, r + "_" + s);
                      else {
                        if (void 0 === t[r + "_" + s]) continue;
                        const e = t._properties[r + "_" + s];
                        "int" === e.type || ("number" === e.type && "string" == typeof a) ? ("int" === e.type ? (t[r + "_" + s] = parseInt(a)) : (t[r + "_" + s] = parseFloat(a))) : (t[r + "_" + s] = a);
                      }
                    }
                  };
                  e(i, o);
                }
              } else t[o] = i;
            }
          }
          setup() {
            const e = this;
            if (((e.context = this), e.isReady && !e.isCompleted)) return;
            if (e.isReady) return e._setModuleState("attached"), (e.isAttached = !0), e.attached(), e._handleListeners("listen"), void (e.context = document);
            e.ownerElement && e.ownerElement.detachedChildren.indexOf(e) >= 0 && e.ownerElement.detachedChildren.splice(e.ownerElement.detachedChildren.indexOf(e), 1), (e.isReady = !0), (e.methods = e.getStaticMember("methods")), e.initProperties(), a.isMobile && e.classList.add("smart-mobile");
            for (let t = 0; t < e.attributes.length; t += 1) {
              const n = e.propertyByAttributeName[e.attributes[t].name];
              if (!n) continue;
              let r = e.$.getAttributeValue(n.attributeName, n.type);
              const o = r ? r.toString() : "";
              if (!(o.indexOf("{{") >= 0 || o.indexOf("[[") >= 0 || ("object" !== n.type && "array" !== n.type && (e.attributes[t].value.indexOf("{{") >= 0 || e.attributes[t].value.indexOf("[[") >= 0)) || void 0 === r || n.value === r)) {
                const o = y.Types.getType(r),
                  i = e.attributes[t].value;
                if (("any" === n.type || "object" === n.type) && "" + e[n.name] === r) continue;
                if ("array" === n.type && e[n.name] && JSON.stringify(e[n.name]) === r) continue;
                if ("number" === o && isNaN(r) && "NaN" !== i && "Infinity" !== i && "-Infinity" !== i) {
                  const t = e.localize("propertyInvalidValueType", { name: n.name, actualType: "string", type: n.type });
                  e.log(t);
                }
                (n.isUpdatingFromAttribute = !0), (e[n.name] = r), (n.isUpdatingFromAttribute = !1);
              }
            }
            for (let t in e._properties) {
              const n = e._properties[t];
              if (("innerHTML" === t && n.value === n.defaultValue && (n.value = n.defaultValue = y.Core.html(e)), ("boolean" !== n.type && "bool" !== n.type) || ("false" === e.getAttribute(n.attributeName) && ((n.isUpdating = !0), e.setAttribute(n.attributeName, ""), (n.isUpdating = !1))), n.defaultReflectToAttribute && n.reflectToAttribute)) {
                if (n.defaultReflectToAttribute && n.defaultReflectToAttributeConditions) {
                  let t = !0;
                  for (let r = 0; r < n.defaultReflectToAttributeConditions.length; r++) {
                    const o = n.defaultReflectToAttributeConditions[r];
                    let i, s;
                    for (let e in o) (i = e), (s = o[e]);
                    e._properties[i] && e._properties[i].value !== s && (t = !1);
                  }
                  if (!t) continue;
                }
                (n.isUpdating = !0), e.$.setAttributeValue(n.attributeName, n.value, n.type), (n.isUpdating = !1);
              }
            }
            const t = [];
            if (e.children.length > 0)
              for (let n = 0; n < e.children.length; n++) {
                const r = e.children[n];
                y.Extend(r).isCustomElement && t.push(r);
              }
            e.applyTemplate(),
              (e.complete = function () {
                if (!e.templateBindingsReady) {
                  const t = (e) => {
                    e.templateBindingsReady || ((e.templateBindingsReady = !0), e.updateTextNodes(), e.updateBoundNodes());
                  };
                  if (e.ownerElement) {
                    let n = e.ownerElement,
                      r = [];
                    for (; n; ) r.push(n), (n = n.ownerElement);
                    for (let e = r.length - 1; e >= 0; e--) t(r[e]);
                    t(e);
                  } else t(e);
                }
                const t = () => {
                  if ((e._setModuleState("ready"), e.ready(), "auto" !== e.renderMode || e.isRendered || e.render(), (e.isAttached = !0), e._setModuleState("attached"), e.attached(), e._handleListeners("listen"), e.isHidden || (0 !== e.offsetWidth && 0 !== e.offsetHeight) || (e.isHidden = !0), e.completed(), e.isRendered && (e.context = document), e.whenReadyCallbacks)) {
                    for (let t = 0; t < e.whenReadyCallbacks.length; t++) e.whenReadyCallbacks[t]();
                    e.whenReadyCallbacks = [];
                  }
                };
                if (e.wait) e.classList.add("smart-visibility-hidden");
                else if (e.classList.contains("smart-async"))
                  requestAnimationFrame(() => {
                    t();
                  });
                else {
                  const n = e.shadowParent;
                  e.shadowParent = null;
                  const r = e.parents;
                  if (((e.shadowParent = n), 0 === r.length)) return;
                  const o = () => {
                    let t = e.ownerElement,
                      n = [];
                    for (; t; ) n.push(t), (t = t.ownerElement);
                    for (let e = n.length - 1; e >= 0; e--) n[e].updateBoundMappedNodes();
                  };
                  e.ownerElement && "HTML" !== r[r.length - 1].nodeName
                    ? e.getRootNode().host
                      ? t()
                      : e.ownerElement && "HTML" === e.ownerElement.parents[e.ownerElement.parents.length - 1].nodeName
                      ? (o(), t())
                      : (e.checkIsInDomInterval = setInterval(() => {
                          const n = e.parents;
                          "HTML" === n[n.length - 1].nodeName && (clearInterval(e.checkIsInDomInterval), o(), t());
                        }, 100))
                    : t();
                }
              });
            let r = [].slice.call(e.querySelectorAll("[smart-id]")).concat(t);
            if ((window[n].EnableShadowDOM && !0 !== e.isInShadowDOM && (r = [].slice.call(e.shadowRoot.querySelectorAll("[smart-id]")).concat(t)), 0 === r.length)) e.complete();
            else {
              e._completeListeners = 0;
              for (let t = 0; t < r.length; t++) {
                const n = r[t];
                if (y.Extend(n).isCustomElement) {
                  const t = function () {
                    e._completeListeners--, 0 === e._completeListeners && (e.complete(), delete e._completeListeners);
                  }.bind(e);
                  n.isCompleted ||
                    n.isUtilityElement ||
                    !0 === n.wait ||
                    (e._completeListeners++,
                    n._onCompleted ||
                      ((n.completeHandlers = []),
                      (n._onCompleted = function () {
                        for (let e = 0; e < n.completeHandlers.length; e++) n.completeHandlers[e]();
                      })),
                    n.completeHandlers.push(t));
                }
              }
              0 === e._completeListeners && e.complete();
            }
          }
          visibilityChangedHandler() {
            const e = this;
            e.isReady &&
              requestAnimationFrame(() => {
                0 === e.offsetWidth || 0 === e.offsetHeight ? (e.isHidden = !0) : ((e.isHidden = !1), e.$.fireEvent("resize", e, { bubbles: !1, cancelable: !0 }));
              });
          }
          attributeChangedCallback(e, t, n) {
            const r = this,
              o = r.propertyByAttributeName[e];
            if ((("class" !== e && "style" !== e) || r.visibilityChangedHandler(), o || r.attributeChanged(e, t, n), r.onAttributeChanged && r.onAttributeChanged(e, t, n), !o || (o && o.isUpdating))) return;
            let i = r.$.getAttributeValue(o.attributeName, o.type);
            void 0 !== n && r[o.name] !== i && ((o.isUpdatingFromAttribute = !0), (r[o.name] = void 0 !== i ? i : r._properties[o.name].defaultValue), (o.isUpdatingFromAttribute = !1));
          }
          attributeChanged(e, t, n) {}
          set hasStyleObserver(e) {
            const t = this;
            void 0 === t._hasStyleObserver && (t._hasStyleObserver = e), e ? d.watch(t) : d.unwatch(t);
          }
          get hasStyleObserver() {
            const e = this;
            return void 0 === e._hasStyleObserver || e._hasStyleObserver;
          }
          attached() {
            const e = this;
            e.hasStyleObserver && d.watch(e), e.onAttached && e.onAttached(), Smart(e._selector) && Smart(e._selector).attached && Smart(e._selector).attached();
          }
          detached() {
            const e = this;
            e.hasStyleObserver && d.unwatch(e), e._setModuleState("detached"), (e.isAttached = !1), e.ownerElement && -1 === e.ownerElement.detachedChildren.indexOf(e) && e.ownerElement.detachedChildren.push(e), e._handleListeners("unlisten"), e.onDetached && e.onDetached(), Smart(e._selector) && Smart(e._selector).detached && Smart(e._selector).detached(), u && u[e._selector] && delete u[e._selector];
          }
          propertyChangedHandler(e, t, n) {
            const r = this;
            t !== n && ("theme" === e && ("" !== t && r.classList.remove("smart-" + t), "" !== n && r.classList.add("smart-" + n)), "visibility" === e ? ("collapsed" === t ? r.classList.remove("smart-hidden") : "hidden" === t && r.classList.remove("smart-visibility-hidden"), "collapsed" === n ? r.classList.add("smart-hidden") : "hidden" === n && r.classList.add("smart-visibility-hidden")) : ("disabled" === e || "readonly" === e) && r._ariaPropertyChangedHandler(e, n), r.propertyChanged && r.propertyChanged(e, t, n));
          }
          _ariaPropertyChangedHandler(e, t) {
            const n = this;
            ("readonly" === e && -1 === ["checkbox", "combobox", "grid", "gridcell", "listbox", "radiogroup", "slider", "spinbutton", "textbox"].indexOf(n.getAttribute("role"))) || (t ? n.setAttribute("aria-" + e, !0) : n.removeAttribute("aria-" + e));
          }
          _handleListeners(e) {
            const t = this,
              n = t.tagName.toLowerCase(),
              r = (r) => {
                for (let o in r) {
                  const i = o.split(".");
                  let s = i[0],
                    a = t.$;
                  if (i[1])
                    if (((s = i[1]), (a = t["$" + i[0]]), "document" === i[0])) {
                      let e = t.smartId;
                      "" === e && (e = y.Core.toCamelCase(n)), (s = s + "." + e);
                    } else t.smartId && (s = s + "." + t.smartId + "_" + t.parents.length);
                  else t.smartId && (s = s + "." + t.smartId);
                  const l = r[o],
                    d = function (e) {
                      const n = t.context;
                      (t.context = t), t[l] && t[l].apply(t, [e]), (t.context = n);
                    };
                  a && a[e](s, d);
                }
              };
            r(t.getStaticMember("listeners")), r(t.templateListeners), Smart(t._selector) && Smart(t._selector).properties && r(Smart(t._selector).listeners);
          }
          parseTemplate() {
            const e = this,
              n = e.template(),
              o = document.createDocumentFragment();
            if (t[e.nodeName] && !r) return t[e.nodeName].cloneNode(!0);
            if ("" === n) return null;
            let i = document.createElement("div");
            o.appendChild(i), (i.innerHTML = n);
            let s = i.childNodes;
            i.parentNode.removeChild(i);
            for (let e = 0; e < s.length; e++) o.appendChild(s[e]);
            return (t[e.nodeName] = o), r ? o : o.cloneNode(!0);
          }
          applyTemplate() {
            const e = this,
              t = e.parseTemplate();
            if (!t) return;
            if (!t.hasChildNodes) return;
            const n = t.childNodes[0],
              r = (t, n) => {
                (e["$" + t] = n.$ = y.Extend(n)), (e.$[t] = n), (n.ownerElement = e);
              };
            let o = n;
            if (n.getElementsByTagName("content").length > 0) {
              let e = n.getElementsByTagName("content")[0];
              (o = e.parentNode), o.removeChild(e);
            } else {
              const e = t.querySelectorAll("[inner-h-t-m-l]");
              e && e.length > 0 && (o = e[0]);
            }
            e.$.template = "template" === n.nodeName.toLowerCase() ? n : n.querySelector("template");
            let i = t.querySelectorAll("[id]");
            0 === i.length && (i = t.querySelectorAll("*")), r("root", n), r("content", o), (e.$.html = e.innerHTML.toString().trim());
            for (let t = 0; t < i.length; t += 1) {
              let n = i[t];
              "" === n.id && (n.id = "child" + t), r(n.id, n), n.setAttribute("smart-id", n.id), e.shadowRoot ? (n.shadowParent = e) : n.removeAttribute("id");
            }
            for (!1 !== e.hasTemplateBindings ? (e.bindings = e.getBindings(t)) : (e.bindings = []), e.$root.addClass("smart-container"); e.childNodes.length; ) o.appendChild(e.firstChild);
            if ((e.appendTemplate(t), e.$.template)) {
              const t = document.createElement("div");
              t.classList.add("smart-template-container"), (e.$.templateContainer = t), e.$.template.parentNode.insertBefore(t, e.$.template), e.refreshTemplate();
            }
          }
          refreshTemplate() {
            const e = this;
            if (!e.$.templateContainer) return;
            e.templateDetached(e.$.templateContainer);
            const t = e.$.template.content.cloneNode(!0);
            (e.templateBindings = e.getBindings(t)), (e.templateProperties = []);
            let n = document.createDocumentFragment();
            const r = function (t, n, o) {
              for (let i in t) {
                const s = t[i],
                  a = s.node.cloneNode();
                n.appendChild(a);
                let l = [],
                  d = !1;
                if (s.data)
                  for (let t in s.data) {
                    const r = s.data[t],
                      i = r.name;
                    if (((e.templateProperties[i] = !0), a.removeAttribute(y.Core.toDash(t)), "*items" === t)) (l = e[i]), (d = !0);
                    else if (i.indexOf("item.") >= 0 && void 0 !== o) (r.value = o[i.substring("item.".length)]), (a[t] = r.value);
                    else if (i.indexOf("item") >= 0 && void 0 !== o) (r.value = o), (a[t] = r.value);
                    else if ("*if" === t)
                      if (i.indexOf("(") >= 0) {
                        let t,
                          r = i.substring(i.indexOf("("));
                        const o = i.substring(0, i.indexOf("("));
                        if (((r = r.substring(1, r.length - 1)), (r = r.replace(/ /gi, "")), (r = r.split(",")), r.length > 0 && "" !== r[0])) {
                          let n = [];
                          for (let t = 0; t < r.length; t++) n.push(e[r[t]]);
                          t = e[o].apply(e, n);
                        } else t = e[o]();
                        !1 === t && n.removeChild(a);
                      } else e[i] || n.removeChild(a);
                    else e.updateBoundNode(a, s, e, i);
                  }
                if (l.length > 0 || d) {
                  for (let e = 0; e < l.length; e++) s.children && r(s.children, a, l[e]);
                  if ("number" == typeof l) for (let e = 0; e < l; e++) s.children && r(s.children, a, e);
                } else s.children && r(s.children, a, o);
              }
            };
            r(e.templateBindings.children, n), (e.$.templateContainer.innerHTML = ""), e.$.templateContainer.appendChild(n), e.templateAttached(e.$.templateContainer);
          }
          templateAttached() {}
          templateDetached() {}
          appendTemplate(e) {
            this.appendChild(e);
          }
          defineElementModules() {
            const e = this,
              t = e.constructor.prototype;
            if ("BaseElement" === t.elementName) {
              t.modules = e.constructor.modules;
              const n = t.modules;
              for (let t = 0; t < n.length; t += 1) e.addModule(n[t]);
            } else {
              const n = t.modules;
              if (!n) return;
              for (let t = 0; t < n.length; t += 1) {
                const r = n[t],
                  o = r.prototype;
                e.defineElementMethods(o.methodNames, o), e.defineElementProperties(r.properties);
              }
            }
          }
          watch(e, t) {
            const n = this;
            n._watch = null !== e && null !== t ? { properties: e, propertyChangedCallback: t } : null;
          }
          unwatch() {
            this._watch = null;
          }
          set(e, t, n) {
            const r = this,
              o = r.context;
            (r.context = !0 === n ? document : r), (r[e] = t), (r.context = o);
          }
          get(e) {
            return this[e];
          }
          _setModuleState(e, t) {
            const n = this,
              r = "is" + e.substring(0, 1).toUpperCase() + e.substring(1),
              o = "on" + e.substring(0, 1).toUpperCase() + e.substring(1);
            for (let i = 0; i < n.modulesList.length; i++) {
              const s = n.modulesList[i];
              (s[r] = !0), s[e] && s[e](t), s[o] && s[o](t);
            }
          }
          addModule(e, t) {
            const n = this;
            if (!e) return;
            const r = n.modules.slice(0),
              o = e.prototype,
              i = Object.getPrototypeOf(e);
            if ((i.name && i.name !== e.name && n.addModule(i), !e.moduleName && e.name && (e.moduleName = e.name), -1 === r.findIndex((t) => e.moduleName === t.moduleName) && r.push(e), n.defineModule(e), n.defineElementMethods(o.methodNames, o), n.defineElementProperties(e.properties), (n.constructor.prototype.modules = r), t))
              for (let t in Smart.Elements.tagNames) {
                const r = Smart.Elements.tagNames[t];
                let o = Object.getPrototypeOf(r),
                  i = [];
                for (; o !== HTMLElement; ) i.push(o.prototype), (o = Object.getPrototypeOf(o));
                i.indexOf(n) >= 0 && r !== n && r.prototype.addModule(e);
              }
          }
          defineModule(e) {
            if (e.isDefined) return;
            e.prototype._initModule = function (e) {
              this.ownerElement = e;
            };
            const t = e.properties || {},
              n = Object.keys(t),
              r = Object.getOwnPropertyNames(e.prototype);
            e.prototype.methodNames = r;
            for (let r = 0; r < n.length; r += 1) {
              const o = n[r],
                i = t[o];
              Object.defineProperty(e.prototype, o, {
                configurable: !1,
                enumerable: !0,
                get() {
                  return this.ownerElement ? this.ownerElement[o] : i.value;
                },
                set(e) {
                  this.ownerElement[o] = e;
                },
              });
            }
            e.isDefined = !0;
          }
          getStaticMember(e, t) {
            const r = window[n][this.elementName],
              o = r[e];
            t || (t = "");
            let i = "array" === t ? [] : "string" === t ? "" : {},
              s = Object.getPrototypeOf(r),
              a = [];
            for (; s[e]; ) a.push(s[e]), (s = Object.getPrototypeOf(s));
            for (let e = a.length - 1; e >= 0; e--)
              if ("array" === t) for (let t = 0; t < a[e].length; t++) -1 === i.indexOf(a[e][t]) && i.push(a[e][t]);
              else "string" === t ? -1 === i.indexOf(a[e]) && (i += a[e]) : (i = y.Core.assign(i, a[e]));
            if ("array" === t) {
              for (let e = 0; e < o.length; e++) -1 === i.indexOf(o[e]) && i.push(o[e]);
              return i;
            }
            return "string" === t ? (-1 === i.indexOf(o) && (i += o), i) : y.Core.assign(i, o);
          }
          defineElementHierarchicalProperties(e, t) {
            const n = this,
              r = [];
            !(function (e) {
              const n = Object.keys(e);
              for (let o = 0; o < n.length; o++) {
                const i = n[o];
                if ("messages" === i) continue;
                const s = e[i],
                  a = Object.keys(s),
                  l = a.indexOf("value") >= 0 && a.indexOf("type") >= 0 && "object" == typeof s.value;
                if ("propertyObject" === s.type || l) {
                  const e = function (n, o) {
                    if (!n.value) return;
                    const i = Object.keys(n.value);
                    for (let s = 0; s < i.length; s++) {
                      const a = i[s],
                        l = n.value[a],
                        d = o + "_" + a;
                      if ("object" != typeof l || null === l) break;
                      const c = Object.keys(l);
                      if (!(c.indexOf("value") >= 0 && c.indexOf("type") >= 0)) break;
                      if (("array" !== n.type && (n.isHierarchicalProperty = !0), (l.parentPropertyName = o), t)) {
                        const e = t._properties[d];
                        if (n.value.hasOwnProperty(a)) {
                          if (e.isDefined) continue;
                          delete n.value[a];
                        }
                        (e.isDefined = !0),
                          Object.defineProperty(n.value, a, {
                            configurable: !1,
                            enumerable: !0,
                            get: () => t._properties[d].value,
                            set(e) {
                              t.updateProperty(t, t._properties[d], e);
                            },
                          });
                      }
                      r[d] || ((r[d] = l), r.length++), ("propertyObject" === l.type || ("object" == typeof l.value && "array" !== l.type)) && e(t ? t._properties[d] : l, d);
                    }
                  };
                  e(s, i);
                }
              }
            })(e),
              r.length > 0 && !t && n.defineElementProperties(r);
          }
          defineElement() {
            const e = this,
              t = e.constructor.prototype,
              n = e.getStaticMember("properties"),
              r = Object.getOwnPropertyNames(t);
            (t.extendedProperties = {}),
              (t.boundProperties = {}),
              (t.templateListeners = {}),
              e.defineElementModules(),
              e.defineElementMethods(r, t),
              e.defineElementProperties(n),
              e.defineElementHierarchicalProperties(e.extendedProperties),
              (t._initElement = function () {
                const e = this,
                  n = t.extendedProperties,
                  r = Object.keys(n),
                  o = e.modules;
                (e.$ = y.Extend(e)), (e.$document = w), (e.smartId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()), e.isCreated || ((e.modulesList = []), (e._properties = []), e._beforeCreatedProperties && ((e._properties = e._beforeCreatedProperties), delete e._beforeCreatedProperties), (e.detachedChildren = []), (e.propertyByAttributeName = []));
                for (let t = 0; t < o.length; t += 1) {
                  let n = new (0, o[t])();
                  n._initModule(e), e.modulesList.push(n);
                }
                for (let t = 0; t < r.length; t += 1) {
                  const o = r[t],
                    i = n[o];
                  let s = i.value;
                  if (e._properties[o]) {
                    if (void 0 !== e._properties[o].notify) continue;
                    delete e._properties[o];
                  }
                  if ((E && "innerHTML" === o && delete e[o], -1 === window.navigator.userAgent.indexOf("PhantomJS") && e.hasOwnProperty(o) && ((s = e[o]), delete e[o]), "array" === i.type && null != s && (s = s.slice(0)), "object" === i.type && null != s && (s = Array.isArray(s) ? s.slice(0) : Object.assign({}, s)), (e._properties[o] = { name: o, notify: i.notify, allowedValues: i.allowedValues, type: i.type, nullable: i.nullable, reflectToAttribute: i.reflectToAttribute, defaultReflectToAttribute: i.defaultReflectToAttribute, defaultReflectToAttributeConditions: i.defaultReflectToAttributeConditions, value: s, readOnly: i.readOnly, defaultValue: s, attributeName: i.attributeName, observer: i.observer, inherit: i.inherit, extend: i.extend, validator: i.validator }), (e.propertyByAttributeName[i.attributeName] = e._properties[o]), !i.hasOwnProperty("type"))) {
                    const t = e.localize("propertyUnknownType", { name: o });
                    e.log(t);
                  }
                  if ("any" === i.type || "propertyObject" === i.type) continue;
                  const a = y.Types.getType(s);
                  if (null != s && i.type !== a && !i.validator) {
                    if ("object" === i.type && "array" === a) continue;
                    if ("number" === a && ["integer", "int", "float"].findIndex((e) => e === i.type) >= 0) continue;
                    const t = e.localize("propertyInvalidValueType", { name: o, actualType: a, type: i.type });
                    e.log(t);
                  }
                }
                e.defineElementHierarchicalProperties(e._properties, e), (e.isCreated = !0);
              }),
              t.registered();
          }
          defineElementMethods(e, t) {
            const n = this.constructor.prototype,
              r = function (e, t) {
                const n = Array.prototype.slice.call(arguments, 2),
                  r = function () {
                    if (!this.isReady && "localize" !== t && "localize" !== t && "cloneNode" !== t && "importStyle" !== t && "log" !== t && "parseAttributes" !== t) {
                      const e = this.localize("elementNotInDOM");
                      this.log(e);
                    }
                    let r = this;
                    for (let e = 0; e < this.modulesList.length; e++) {
                      let n = this.modulesList[e];
                      if (t in n) {
                        r = n;
                        break;
                      }
                    }
                    const o = this.context,
                      i = n.concat(Array.prototype.slice.call(arguments));
                    let s = null;
                    const a = function (e, t) {
                      return e === t || ("number" === e && ("int" === t || "integer" === t || "float" === t)) || ("bool" === e && "boolean" === t) || ("boolean" === e && "bool" === t) || ("object" === e && "any" === t) || void 0;
                    };
                    if (this.methods) {
                      const e = this.methods[t];
                      if (e) {
                        const n = e.split(":");
                        s = n[n.length - 1].trim();
                        const r = [],
                          o = e.substring(1 + e.indexOf("("), e.lastIndexOf(")")).split(",");
                        let l = "";
                        for (let e = 0; e < o.length; e++) {
                          const t = o[e];
                          (l += t), t.indexOf(":") >= 0 ? (r.push(l), (l = "")) : (l += ",");
                        }
                        let d = r.length;
                        for (let e = 0; e < r.length; e++) {
                          const n = r[e].trim().split(":"),
                            o = n[0].split("=")[0].trim().indexOf("?") >= 0,
                            s = n[1].indexOf("?") >= 0,
                            l = n[1].replace(/\?/gi, "").trim(),
                            c = l.split("|");
                          let u = n[0].split("=")[1];
                          const p = y.Types.getType(i[e]);
                          if (void 0 === i[e] && u) {
                            switch (((u = u.trim()), l[0])) {
                              case "date": {
                                let e = u.substring(u.indexOf("(") + 1, u.lastIndexOf(")"));
                                (e = e.length > 0 ? e.split(",").map((e) => parseInt(e)) : []), (u = 0 === e.length ? new Date() : new Date(e[0], e[1], e[2]));
                                break;
                              }
                              case "bool":
                              case "boolean":
                                u = "true" === u || "1" === u;
                                break;
                              case "int":
                              case "integer":
                                u = parseInt(u);
                                break;
                              case "float":
                              case "number":
                                u = parseFloat(u);
                                break;
                              case "any":
                              case "object":
                                u = u.indexOf("{") >= 0 ? JSON.parse(u) : u;
                            }
                            i.push(u);
                          } else o && d--;
                          if (l !== p && p) {
                            let n = !0;
                            for (let e = 0; e < c.length; e++)
                              if (a(p, c[e])) {
                                n = !1;
                                break;
                              }
                            if (n && (null !== i[e] || !s)) {
                              const n = this.localize("methodInvalidValueType", { name: t, actualType: p, type: l, argumentIndex: e });
                              this.log(n);
                            }
                          }
                          if (i.length < d) {
                            const e = this.localize("methodInvalidArgumentsCount", { name: t, actualArgumentsCount: i.length, argumentsCount: d });
                            this.log(e);
                          }
                        }
                      }
                    }
                    this.context = this;
                    const l = e.apply(r, i);
                    if (s) {
                      const e = void 0 === y.Types.getType(l) ? "void" : y.Types.getType(l);
                      if (!a(e, s)) {
                        const n = this.localize("methodInvalidReturnType", { name: t, actualType: e, type: s });
                        this.log(n);
                      }
                    }
                    return (this.context = o), l;
                  };
                return r;
              },
              o = ["constructor", "ready", "created", "render", "attached", "detached", "appendChild", "insertBefore", "removeChild", "connect", "disconnectedCallback", "connectedCallback", "attributeChangedCallback", "propertyChangedHandler", "enableShadowDOM", "isInShadowDOM", "addPropertyBindings"];
            for (let i in e) {
              let s = e[i];
              (s && s.startsWith && s.startsWith("_")) || void 0 !== o.find((e) => e === s) || n.extendedProperties[s] || (y.Types.isFunction(t[s]) && (n[s] = r(t[s], s)));
            }
          }
          defineElementProperties(e) {
            if (!e) return;
            const t = this,
              n = t.constructor.prototype,
              r = Object.keys(e),
              o = t.getStaticMember("properties");
            Object.assign(n.extendedProperties, e),
              (t.updateProperty = function (e, t, n) {
                const r = e;
                if (!t || t.readOnly) return;
                if (t.allowedValues) {
                  let e = !1;
                  for (let r = 0; r < t.allowedValues.length; r++)
                    if (t.allowedValues[r] === n) {
                      e = !0;
                      break;
                    }
                  if (!e) {
                    const e = JSON.stringify(t.allowedValues).replace(/\[|\]/gi, "").replace(",", ", ").replace(/"/gi, "'"),
                      o = "'" + n + "'",
                      i = r.localize("propertyInvalidValue", { name: t.name, actualValue: o, value: e });
                    return void r.log(i);
                  }
                }
                const o = t.name,
                  i = r._properties[o].value;
                if (t.validator && r[t.validator]) {
                  const e = r.context;
                  r.context = r;
                  const o = r[t.validator](i, n);
                  void 0 !== o && (n = o), (r.context = e);
                }
                if (i !== n) {
                  if (r.propertyChanging) {
                    const e = r.propertyChanging(o, i, n);
                    if (!1 === e || null === e) return;
                  }
                  if (!t.hasOwnProperty("type")) {
                    const e = r.localize("propertyUnknownType", { name: o });
                    r.log(e);
                  }
                  if ("array" !== t.type || JSON.stringify(i) !== JSON.stringify(n)) {
                    if ((null != n && "any" !== t.type && "propertyObject" !== t.type && t.type !== y.Types.getType(n) && !t.validator) || (null === n && !t.nullable)) {
                      let e = !0;
                      if (("object" === t.type && "array" === y.Types.getType(n) && (e = !1), "number" === y.Types.getType(n) && ["integer", "int", "float"].findIndex((e) => e === t.type) >= 0 && (e = !1), e)) {
                        const e = r.localize("propertyInvalidValueType", { name: o, actualType: y.Types.getType(n), type: t.type });
                        return void r.error(e);
                      }
                    }
                    if (((t.isUpdating = !0), t.isHierarchicalProperty)) {
                      const e = function (t, n) {
                        if (!t) return;
                        const o = Object.keys(t);
                        for (let i = 0; i < o.length; i++) {
                          const s = o[i],
                            a = t[s];
                          "object" == typeof a && !y.Types.isArray(a) && a && a.constructor !== Date ? e(a, n + "_" + s) : (r[n + "_" + s] = a);
                        }
                      };
                      e(n, o);
                    } else r._properties[o].value = n;
                    if ((!t.isUpdatingFromAttribute && t.reflectToAttribute && r.$.setAttributeValue(t.attributeName, n, t.type), r.isReady && (!r.ownerElement || (r.ownerElement && r.ownerElement.isReady)))) {
                      if (("wait" === o && (n || !i || r.isCompleted || (r.classList.remove("smart-visibility-hidden"), r.ownerElement && r.ownerElement.updateBoundMappedNodes(), r.updateBoundMappedNodes(), r.complete())), "renderMode" === o)) return;
                      if (r.context !== r && !r.wait) {
                        const e = r.context;
                        (r.context = r), r.propertyChangedHandler(o, i, n), (r.context = e), t.observer && r[t.observer] && ((r.context = r), r[t.observer](i, n), (r.context = document)), r._watch && r._watch.properties.indexOf(o) >= 0 && r._watch.propertyChangedCallback(o, i, n);
                      }
                      const e = t.notify || r.boundProperties[o];
                      e && (r.$.fireEvent(t.attributeName + "-changed", { context: r.context, oldValue: i, value: r[o] }), r.boundProperties[o] && r.updateBoundNodes(o)), e && r.templateProperties && r.templateProperties[o] && r.refreshTemplate(), r.dataContextProperties && ("dataContext" === o ? r.applyDataContext() : r.dataContextProperties[o] && r.updateDataContextProperty(o));
                    }
                    t.isUpdating = !1;
                  }
                }
              });
            for (let t = 0; t < r.length; t += 1) {
              const i = r[t],
                s = e[i],
                a = y.Core.toDash(i),
                l = s.type || "any",
                d = l.indexOf("?") >= 0 || "any" === l;
              d && "any" !== l && (s.type = l.substring(0, l.length - 1)),
                (s.nullable = d),
                (s.attributeName = a.toLowerCase()),
                (s.name = i),
                (s.reflectToAttribute = void 0 === s.reflectToAttribute || s.reflectToAttribute),
                s.inherit && o[i] && (s.value = o[i].value),
                s.extend && o[i] && y.Core.assign(s.value, o[i].value),
                n.hasOwnProperty(i) ||
                  Object.defineProperty(n, i, {
                    configurable: !1,
                    enumerable: !0,
                    get() {
                      if (this._properties[i]) return this._properties[i].value;
                    },
                    set(e) {
                      const t = this;
                      t.updateProperty(t, t._properties[i], e);
                    },
                  });
            }
          }
        }
        let C = [],
          S = [],
          x = [],
          E = !1;
        const A = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        A && parseInt(A[2], 10) <= 50 && (E = !0);
        class T {
          static register(e, t) {
            const r = t.prototype;
            let o = a.toCamelCase(e).replace(/[a-z]+/, ""),
              i = t.version || window[n].Version;
            if (window.customElements.get(e) && window.customElements.get(e).version === i) return;
            let s = e;
            for (i = i.split("."); window.customElements.get(e); ) (e = s + "-" + i.join(".")), (i[2] = parseInt(i[2]) + 1);
            if (!C[e]) {
              if (e.startsWith(n.toLowerCase())) C[e] = window[n][o] = window[n.toLowerCase() + o] = t;
              else {
                let r = e.split("-")[0];
                (r = r.substring(0, 1).toUpperCase() + r.substring(1)), window[n][r] || (window[n][r] = {}), (C[e] = window[n][r][o] = window[r.toLowerCase() + o] = t), window[n][o] && (o = a.toCamelCase(e)), (window[n][o] = t);
              }
              (r.elementName = o), r.defineElement(), S[e] && S[e](r), window.customElements.define(e, t);
            }
          }
          static registerElements() {
            const e = this;
            if (e.toRegister) {
              e.isRegistering = !0;
              for (let t = 0; t < e.toRegister.length; t++) {
                const n = e.toRegister[t];
                e.register(n.tagName, n.element);
              }
              e.isRegistering = !1;
            }
          }
          static get(e) {
            if (C[e]) return C[e];
          }
          static whenRegistered(e, t) {
            if (!e) throw new Error("Syntax Error: Invalid tag name");
            const n = S[e],
              r = this.get(e),
              o = r ? r.modules.length : 3;
            try {
              n || r
                ? !n && r
                  ? (t(r.prototype), (S[e] = void 0))
                  : n && !r
                  ? (S[e] = function (e) {
                      n(e), t(e);
                    })
                  : n && r && (r.proto && (n(r.proto), t(r.proto)), (S[e] = void 0))
                : (S[e] = function (e) {
                    try {
                      t(e);
                    } catch (e) {
                      const t = e instanceof Error ? e.message : e.toString();
                      console.log(t);
                    }
                  });
            } catch (e) {
              const t = e instanceof Error ? e.message : e.toString();
              console.log(t);
            }
            if (r && o !== r.prototype.modules.length) {
              const t = document.querySelectorAll(e);
              for (let e = 0; e < t.length; e++) {
                const n = t[e];
                n.isCreated && n._initElement();
              }
            }
          }
        }
        (T.lazyRegister = !1), (T.tagNames = []);
        class P {
          constructor() {
            const e = this;
            (e.name = "observableArray"), (e.observables = arguments.length < 3 ? null : arguments[2]);
            const t = new Proxy(e, {
              deleteProperty: function (e, t) {
                return delete e[t], !0;
              },
              apply: function (e, t, n) {
                return e.apply(t, n);
              },
              get: function (t, n) {
                return t[n] || isNaN(parseInt(n)) ? t[n] : e.getItem(parseInt(n));
              },
              set: function (t, n, r) {
                return t[n] || isNaN(parseInt(n)) ? ((t[n] = r), !0) : (e.setItem(parseInt(n), r), !0);
              },
            });
            if (((e._addArgs = { eventName: "change", object: t, action: "add", index: null, removed: new Array(), addedCount: 1 }), (e._removeArgs = { eventName: "change", object: t, action: "remove", index: null, removed: null, addedCount: 0 }), arguments.length >= 1 && Array.isArray(arguments[0]))) {
              e._array = [];
              const t = arguments[0];
              for (let n = 0, r = t.length; n < r; n++) {
                const r = e._getItem(e._array.length, t[n]);
                e._array.push(r);
              }
            } else e._array = Array.apply(null, arguments);
            return 2 === arguments.length && (e.notifyFn = arguments[1]), t;
          }
          get canNotify() {
            const e = this;
            return void 0 === e._canNotify && (e._canNotify = !0), e._canNotify;
          }
          set canNotify(e) {
            this._canNotify = e;
          }
          _notify(e) {
            const t = this;
            t.canNotify && t.notifyFn && t.notifyFn(e);
          }
          notify(e) {
            e && (this.notifyFn = e);
          }
          toArray() {
            return this._array;
          }
          _getItem(e, t) {
            const n = this;
            return "string" == typeof t || "number" == typeof t || void 0 === t
              ? t
              : new Proxy(t, {
                  deleteProperty: function (e, t) {
                    return delete e[t], !0;
                  },
                  set: function (t, r, o) {
                    const i = t[r];
                    return (t[r] = o), !n._canNotify || !1 === t.canNotify || ((n.observables && !n.observables[r]) || n._notify({ eventName: "change", object: n, target: t, action: "update", index: e, path: e + "." + r, oldValue: i, newValue: o, propertyName: r }), !0);
                  },
                });
          }
          getItem(e) {
            return this._array[e];
          }
          setItem(e, t) {
            const n = this,
              r = n._array[e];
            (n._array[e] = n._getItem(e, t)), n._notify({ eventName: "change", object: n._array, action: "update", index: e, removed: [r], addedCount: 1 });
          }
          get length() {
            return this._array.length;
          }
          set length(e) {
            const t = this;
            o.isNumber(e) && t._array && t._array.length !== e && t.splice(e, t._array.length - e);
          }
          toString() {
            return this._array.toString();
          }
          toLocaleString() {
            return this._array.toLocaleString();
          }
          concat() {
            const e = this;
            e._addArgs.index = e._array.length;
            const t = e._array.concat.apply(e._array, arguments);
            return new Smart.ObservableArray(t);
          }
          join(e) {
            return this._array.join(e);
          }
          pop() {
            const e = this;
            (e._removeArgs.index = e._array.length - 1), delete e[e._array.length - 1];
            const t = e._array.pop();
            return (e._removeArgs.removed = [t]), e._notify(e._removeArgs), e._notifyLengthChange(), t;
          }
          push() {
            const e = this;
            if (((e._addArgs.index = e._array.length), 1 === arguments.length && Array.isArray(arguments[0]))) {
              const t = arguments[0];
              for (let n = 0, r = t.length; n < r; n++) {
                const r = e._getItem(e._array.length, t[n]);
                e._array.push(r);
              }
            } else {
              const t = e._getItem(e._addArgs.index, arguments[0]);
              e._array.push.apply(e._array, [t]);
            }
            return (e._addArgs.addedCount = e._array.length - e._addArgs.index), e._notify(e._addArgs), e._notifyLengthChange(), e._array.length;
          }
          _notifyLengthChange() {
            const e = this;
            if (!e.canNotify) return;
            const t = e._createPropertyChangeData("length", e._array.length);
            e._notify(t);
          }
          _createPropertyChangeData(e, t, n) {
            return { eventName: "change", object: this, action: e, value: t, oldValue: n };
          }
          reverse() {
            return this._array.reverse();
          }
          shift() {
            const e = this,
              t = e._array.shift();
            return (e._removeArgs.index = 0), (e._removeArgs.removed = [t]), e._notify(e._removeArgs), e._notifyLengthChange(), t;
          }
          slice(e, t) {
            return this._array.slice(e, t);
          }
          sort(e) {
            return this._array.sort(e);
          }
          splice(e, t, n) {
            const r = this,
              o = r._array.length;
            let i;
            if (n && n.length) for (let o = 0; o < n.length; o++) i = r._array.splice(e + o, t, n[o]);
            else i = r._array.splice.apply(r._array, arguments);
            if (n) {
              let t = r.canNotify;
              if (((r.canNotify = !1), n.length)) for (let t = 0; t < n.length; t++) r.setItem(e + t, n[t]);
              else r.setItem(e, n);
              (r.canNotify = t), r._notify({ eventName: "change", object: this, action: "add", index: e, added: i, addedCount: r._array.length > o ? r._array.length - o : 0 });
            } else r._notify({ eventName: "change", object: this, action: "remove", index: e, removed: i, addedCount: r._array.length > o ? r._array.length - o : 0 });
            return r._array.length !== o && r._notifyLengthChange(), i;
          }
          unshift() {
            const e = this,
              t = e._array.length,
              n = e._array.unshift.apply(e._array, arguments);
            return (e._addArgs.index = 0), (e._addArgs.addedCount = n - t), e._notify(this._addArgs), e._notifyLengthChange(), n;
          }
          indexOf(e, t) {
            const n = this;
            for (let r = t || 0, o = n._array.length; r < o; r++) if (n._array[r] === e) return r;
            return -1;
          }
          lastIndexOf(e, t) {
            const n = this;
            for (let r = t || n._array.length - 1; r >= 0; r--) if (n._array[r] === e) return r;
            return -1;
          }
          find(e, t) {
            return this._array.find(e, t);
          }
          findIndex(e, t) {
            return this._array.findIndex(e, t);
          }
          every(e, t) {
            return this._array.every(e, t);
          }
          some(e, t) {
            return this._array.some(e, t);
          }
          forEach(e, t) {
            this._array.forEach(e, t);
          }
          map(e, t) {
            return this._array.map(e, t);
          }
          filter(e, t) {
            return this._array.filter(e, t);
          }
          reduce(e, t) {
            return void 0 !== t ? this._array.reduce(e, t) : this._array.reduce(e);
          }
          reduceRight(e, t) {
            return void 0 !== t ? this._array.reduceRight(e, t) : this._array.reduceRight(e);
          }
          move(e, t) {
            this.splice(t, 0, this.splice(e, 1)[0]);
          }
        }
        let D = {};
        window[n] && (D = window[n]),
          (window[n] = function (e, t) {
            let r = e;
            if (e) {
              if (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)
                return u[e]
                  ? u[e]
                  : t
                  ? ((u[e] = new t()),
                    (function (e, t) {
                      const n = t.properties;
                      t._properties = [];
                      const r = function (n, o) {
                        const i = Object.keys(n);
                        for (let s = 0; s < i.length; s++) {
                          const a = i[s],
                            l = n[a];
                          (t._properties[o + a] = l),
                            Array.isArray(l)
                              ? (t._properties[o + a] = new P(l, function (t) {
                                  const n = a + "." + t.path,
                                    r = t.newValue,
                                    o = document.querySelector(e);
                                  if (o) {
                                    const e = n.split(".");
                                    let t = o;
                                    for (let n = 0; n < e.length; n++) t = t[e[n]];
                                    t = r;
                                  }
                                }))
                              : (Object.defineProperty(n, a, {
                                  configurable: !1,
                                  enumerable: !0,
                                  get: () => t._properties[o + a],
                                  set(e) {
                                    t._properties[o + a] = e;
                                  },
                                }),
                                (l && "DataAdapter" === l.constructor.name) || (l && "object" == typeof l && Smart.DataAdapter && l instanceof Smart.DataAdapter) || ("object" == typeof l && l && Object.keys(l).length > 0 && r(l, o + a + ".")));
                        }
                      };
                      r(n, ""), Object.defineProperty(t, "properties", { configurable: !1, enumerable: !0, get: () => n });
                      const o = document.querySelector(e);
                      if (o && o.isReady) for (let e in n) o[e] = n[e];
                      else if (o) {
                        o.props = {};
                        for (let e in n) o.props[e] = n[e];
                      }
                    })(e, u[e]),
                    u[e])
                  : void 0;
              if (t) {
                if (((T.tagNames[e] = t), T.lazyRegister)) {
                  T.toRegister || (T.toRegister = []);
                  const e = a.toCamelCase(r).replace(/[a-z]+/, "");
                  return (window[n][e] = t), void T.toRegister.push({ tagName: r, element: t });
                }
                T.register(r, t);
              }
            }
          }),
          window.addEventListener("load", function () {
            const e = window[n].Elements.tagNames;
            let t = [];
            for (let r in e) {
              const o = e[r];
              let i = document.querySelectorAll("[" + r + "]");
              for (let e = 0; e < i.length; e++) {
                const t = i[e];
                t instanceof HTMLDivElement && ((t.__proto__ = o.prototype), t.created(), t.connectedCallback()), t.classList.add("smart-element-ready");
              }
              let s = o.name;
              "Item" === s && (s = "ListItem"), (i = document.querySelectorAll('[is="' + n.toLocaleLowerCase() + s + '"]'));
              for (let e = 0; e < i.length; e++) t.push(i[e]);
            }
            if (t.length > 0) {
              const e = (e) => {
                let t = [],
                  n = e.parentNode;
                for (; n && 9 !== n.nodeType; ) n instanceof HTMLElement == 1 && t.push(n), (n = n.parentNode);
                return t;
              };
              t.sort(function (t, n) {
                let r = e(t).length,
                  o = e(n).length;
                return r < o ? 1 : r > o ? -1 : 0;
              });
              for (let e = 0; e < t.length; e++) {
                const n = t[e],
                  r = n.getAttribute("is");
                let o;
                (o = "smartItem" === r ? new window.smartListItem(n) : new window[r](n)), o.removeAttribute("is");
              }
            }
          });
        const L = function () {
          if ("complete" === document.readyState && "manual" !== window[n].RenderMode) {
            x.sort(function (e, t) {
              let n = e.element.parents.length,
                r = t.element.parents.length;
              return n < r ? -1 : n > r ? 1 : 0;
            });
            for (let e = 0; e < x.length; e++) (window[n].RenderMode = ""), (x[e].element.isLoading = !1), x[e].callback(), (window[n].RenderMode = "");
            (x = []), document.removeEventListener("readystatechange", L);
          }
        };
        Object.assign(window[n], {
          Elements: T,
          Modules: [],
          BaseElement: class extends _ {
            static get observedAttributes() {
              let e = this,
                t = ["external-style"];
              for (let n in e.prototype.extendedProperties) {
                const r = e.prototype.extendedProperties[n];
                t.push(r.attributeName);
              }
              return t;
            }
            static get styleUrls() {
              return [];
            }
            static get styles() {
              return "";
            }
            get styleUrl() {
              return this._styleUrl;
            }
            set styleUrl(e) {
              this._styleUrl = e;
            }
            get isInShadowDOM() {
              const e = this,
                t = e.getRootNode();
              return !e.hasAttribute("smart-blazor") && t !== document && t !== e;
            }
            getShadowRootOrBody() {
              const e = this;
              return e.isInShadowDOM && e.getRootNode().host ? e.getRootNode().host.shadowRoot : document.body;
            }
            get enableShadowDOM() {
              return window[n].EnableShadowDOM;
            }
            importStyle(e, t) {
              this._importStyle(e, t);
            }
            _importStyle(e, t) {
              const n = this;
              if (!n.shadowRoot || !e) return;
              const r = (e) => {
                  const r = n.shadowRoot.children;
                  for (let n = 0; n < r.length; n++) {
                    const o = r[n];
                    if (o instanceof HTMLLinkElement && o.href === e) return t && t(), null;
                  }
                  const o = document.createElement("link");
                  return (o.rel = "stylesheet"), (o.type = "text/css"), (o.href = e), (o.onload = t), o;
                },
                o = (() => {
                  const e = n.shadowRoot.children;
                  let t = null;
                  for (let n = 0; n < e.length; n++) {
                    const r = e[n];
                    r instanceof HTMLLinkElement && (t = r);
                  }
                  return t;
                })(),
                i = (e, t) => {
                  t.parentNode.insertBefore(e, t.nextSibling);
                };
              if (Array.isArray(e)) {
                const t = document.createDocumentFragment();
                for (let n = 0; n < e.length; n++) {
                  const o = r(e[n]);
                  o && t.appendChild(o);
                }
                o ? i(t, o) : n.shadowRoot.insertBefore(t, n.shadowRoot.firstChild);
              } else {
                const t = r(e);
                if (!t) return;
                o ? i(t, o) : n.shadowRoot.insertBefore(t, n.shadowRoot.firstChild);
              }
            }
            attributeChanged(e, t, n) {
              "style-url" === e && (this.styleUrl = n);
            }
            attributeChangedCallback(e, t, n) {
              this.isReady && super.attributeChangedCallback(e, t, n);
            }
            constructor(e, t) {
              super();
              const n = this;
              if (e) {
                t && (n._initProperties = t);
                const r = (e) => {
                  if ("string" == typeof e ? document.querySelector(e) : e) {
                    const r = "string" == typeof e ? document.querySelector(e) : e;
                    if (r instanceof HTMLDivElement) {
                      const o = document.createElement(n.tagName);
                      for (let e of r.attributes) o.setAttribute(e.name, r.getAttribute(e.name));
                      for (; r.childNodes.length; ) o.appendChild(r.firstChild);
                      return "string" == typeof e && (o.id = e.substring(1)), (o._initProperties = t), r.parentNode && r.parentNode.replaceChild(o, r), o;
                    }
                    if (t) {
                      const e = r.context;
                      if (((r._initProperties = t), r.isReady)) {
                        r.context = r;
                        const n = {},
                          o = {};
                        for (let e in t) (n[e] = r[e]), (o[e] = t[e]);
                        Object.getOwnPropertyNames(t).length > 0 && (r.initProperties(), r.propertyChangedHandler(t, n, o)), (r.context = e);
                      }
                    }
                    return r;
                  }
                };
                if ("string" == typeof e) {
                  const t = document.querySelectorAll(e),
                    n = [];
                  if (t.length > 1) {
                    for (let e = 0; e < t.length; e++) {
                      const o = r(t[e]);
                      n.push(o);
                    }
                    return n;
                  }
                } else if (e && e.length > 0) {
                  const t = e;
                  if (t.length > 1) {
                    for (let e = 0; e < t.length; e++) {
                      const n = r(t[e]);
                      C.push(n);
                    }
                    return C;
                  }
                }
                return r(e);
              }
              (n._styleUrl = ""), n.isUtilityElement || n.created();
            }
            _getRootShadowParent() {
              let e = this.shadowParent;
              for (; e; ) {
                if (!e.shadowParent) return e;
                e = e.shadowParent;
              }
              return e || this.shadowParent;
            }
            _getStyleUrl(e) {
              let t = y.Core.getScriptLocation() + window[n].StyleBaseUrl + e;
              return this.shadowParent && (t = t.replace("scoped/", "")), t;
            }
            _getStyleUrls() {
              const e = this;
              e.nodeName.startsWith(n);
              const t = e.getStaticMember("styleUrls", "array"),
                r = [];
              for (let n = 0; n < t.length; n++) {
                const o = t[n],
                  i = e._getStyleUrl(o);
                r.push(i);
              }
              return r;
            }
            _setupShadowRoot() {
              const e = this;
              e.classList.add("smart-element-init");
              const t = (t) => {
                t.$.root && (t.$.root.classList.add(n.toLowerCase() + "-element"), t.$.root.classList.add(e.nodeName.toLowerCase())), t.setup(), t.classList.remove("smart-element-init");
              };
              if (document.adoptedStyleSheets)
                if (window[n].AdoptedStyleSheets) window[n].AdoptedStyleSheetsLoaded ? ((e.shadowRoot.adoptedStyleSheets = window[n].AdoptedStyleSheets), t(e)) : ((e.shadowRoot.adoptedStyleSheets = window[n].AdoptedStyleSheets), window[n].AdoptedStyleSheetsLoadedQueue || (window[n].AdoptedStyleSheetsLoadedQueue = []), window[n].AdoptedStyleSheetsLoadedQueue.push(e));
                else {
                  const r = new CSSStyleSheet();
                  let o = y.Core.getScriptLocation() + "/styles/smart.default.css";
                  r
                    .replace('@import url("' + o + '")')
                    .then(() => {
                      if ((t(e), (window[n].AdoptedStyleSheetsLoaded = !0), window[n].AdoptedStyleSheetsLoadedQueue)) {
                        const e = window[n].AdoptedStyleSheetsLoadedQueue;
                        for (let n = 0; n < e.length; n++) {
                          const r = e[n];
                          t(r);
                        }
                        delete window[n].AdoptedStyleSheetsLoadedQueue;
                      }
                    })
                    .catch((e) => {
                      console.error("Failed to load:", e);
                    }),
                    (window[n].AdoptedStyleSheets = [r]),
                    (document.adoptedStyleSheets = [r]),
                    (e.shadowRoot.adoptedStyleSheets = window[n].AdoptedStyleSheets);
                }
            }
            connect() {
              const e = this;
              window[n].EnableShadowDOM && !e.shadowRoot && !0 !== e.isInShadowDOM && (e.attachShadow({ mode: "open" }), e.shadowRoot && e.$.root && (e.shadowRoot.appendChild(e.$.root), e.$.root.classList.add(e.nodeName.toLowerCase()))), e.shadowRoot || e.shadowParent ? (e.shadowRoot ? e._setupShadowRoot() : (e.shadowParent && window[n].EnableShadowDOM, e.setup())) : e.setup();
            }
            connectedCallback() {
              const e = this;
              if (e.isLoading || e.isUtilityElement) return;
              e.classList.add("smart-element-init");
              const t = function () {
                e.classList.remove("smart-element-init");
              };
              if ("complete" === document.readyState && (void 0 === window[n].isAngular && (window[n].isAngular = null !== document.body.querySelector("[ng-version]")), window[n].isAngular))
                for (let t = 0; t < e.parents.length && !e.parents[t].nodeName.toLowerCase().startsWith(n.toLowerCase() + "-"); t++)
                  if (e.parents[t].hasAttribute("ng-version") && !e.classList.contains("smart-angular")) {
                    window[n].RenderMode = "manual";
                    break;
                  }
              if ("complete" === document.readyState && "manual" !== window[n].RenderMode) {
                const n = e.parents;
                (n.length && "HTML" === n[n.length - 1].nodeName) || e.getRootNode().host
                  ? (e.checkIsInDomTimer && clearInterval(e.checkIsInDomTimer), t(), e.connect())
                  : (e.checkIsInDomTimer && clearInterval(e.checkIsInDomTimer),
                    n.length > 0 &&
                      (e.checkIsInDomTimer = setInterval(() => {
                        const n = e.parents;
                        0 === n.length && clearInterval(e.checkIsInDomTimer), n.length > 0 && "HTML" === n[n.length - 1].nodeName && (clearInterval(e.checkIsInDomTimer), t(), e.connect());
                      }, 100)));
              } else
                (e.isLoading = !0),
                  x.push({
                    element: this,
                    callback: function () {
                      this.isReady || (t(), this.connect());
                    }.bind(e),
                  });
            }
            disconnectedCallback() {
              const e = this;
              e.isAttached ? ((e.shadowParent = null), e.detached()) : e._resetShadowParent();
            }
            adoptedCallback() {
              this.setup();
            }
            appendTemplate(e) {
              const t = this;
              t.shadowRoot ? t.shadowRoot.appendChild(e) : t.appendChild(e);
            }
            _resetShadowParent() {
              const e = this;
              if (!window[n].EnableShadowDOM || null === e.shadowParent) return;
              const t = [];
              let r = e.parentNode;
              for (; r && 9 !== r.nodeType; ) {
                if (r instanceof HTMLElement == 1) t.push(r);
                else if (11 === r.nodeType && r.host) {
                  r = r.host;
                  continue;
                }
                r = r.parentNode;
              }
              for (let n = 0; n < t.length; n++) if (t[n] === e.shadowParent) return;
              t.length > 0 && "HTML" === t[t.length - 1].nodeName && (e.shadowParent = null);
            }
          },
          Utilities: y,
          Import: function (e, t) {
            let n = 0;
            const r = function (e, t) {
              return new Promise((n) => {
                const r = document.createElement("script");
                (r.src = e), (r.onload = n);
                for (let e = 0; e < document.head.children.length; e++) {
                  const r = document.head.children[e];
                  if (r.src && r.src.toString().indexOf(t) >= 0) return void n();
                }
                document.head.appendChild(r);
              });
            };
            return new Promise((o) => {
              const i = y.Core.getScriptLocation(),
                s = function (t) {
                  if (!e[t]) return;
                  const a = i + "/" + e[t];
                  r(a, e[t]).then(function () {
                    n++, n === e.length && o(), s(t + 1);
                  });
                };
              if (t)
                for (let t = 0; t < e.length; t++) {
                  const s = i + "/" + e[t];
                  r(s, e[t]).then(function () {
                    n++, n === e.length && o();
                  });
                }
              else s(0);
            });
          },
          ObservableArray: P,
          Observable: class {
            constructor(e, t) {
              const n = this;
              var r;
              return (
                (this.name = "observable"),
                e && Object.assign(n, e),
                (r = e),
                Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach((e) => "constructor" === e || !!e.startsWith("_") || void (n[e] = r[e])),
                new Proxy(n, {
                  deleteProperty: function (e, t) {
                    return delete e[t], !0;
                  },
                  get: function (e, t) {
                    return e[t];
                  },
                  set: function (e, r, o) {
                    const i = e[r];
                    return i === o || ((e[r] = o), !("notifyFn" !== r && !r.startsWith("_") && "canNotify" !== r && (!t || -1 !== t.indexOf(r)) && n.canNotify && (n._notify({ target: e, propertyName: r, oldValue: i, newValue: o }), 0)));
                  },
                })
              );
            }
            get canNotify() {
              const e = this;
              return void 0 === e._canNotify && (e._canNotify = !0), e._canNotify;
            }
            set canNotify(e) {
              this._canNotify = e;
            }
            _notify(e) {
              const t = this;
              if (t.canNotify && t.notifyFn) for (let n = 0; n < t.notifyFn.length; n++) t.notifyFn[n](e);
            }
            notify(e) {
              const t = this;
              e && (t.notifyFn || (t.notifyFn = []), t.notifyFn.push(e));
            }
          },
          Component: class {
            constructor(e, t) {
              const n = this.name;
              let r = null;
              return e ? (r = new window[n](e, t)) : ((r = new window[n]()), (r._initProperties = t)), (this._element = r), r;
            }
            get name() {
              return "Component";
            }
            get element() {
              return this._element;
            }
          },
          Theme: D.Theme || "",
          EnableShadowDOM: D.ShadowDom || !1,
          BaseUrl: "./",
          StyleBaseUrl: "/styles/default/",
          Version: e,
          Templates: t,
          RenderMode: D.RenderMode || "auto",
          Render: function () {
            const e = () => {
              (window[n].RenderMode = ""), L();
            };
            "complete" === document.readyState ? e() : (window.removeEventListener("load", e), window.addEventListener("load", e));
          },
          Data: u,
          Mode: D.Mode || "production",
          License: "Evaluation",
        });
        let O = window[n].Theme;
        "manual" !== window[n].RenderMode && document.addEventListener("readystatechange", L),
          Object.defineProperty(window[n], "Theme", {
            configurable: !1,
            enumerable: !0,
            get: () => O,
            set(e) {
              const t = O;
              (O = e), w.fireEvent("theme-changed", { oldValue: t, newValue: e }, { bubbles: !0, cancelable: !0 });
            },
          }),
          window[n]("smart-base-element", window[n].BaseElement),
          window[n](
            "smart-content-element",
            class extends window[n].BaseElement {
              static get properties() {
                return { content: { type: "any", reflectToAttribute: !1 }, innerHTML: { type: "string", reflectToAttribute: !1 } };
              }
              template() {
                return "<div inner-h-t-m-l='[[innerHTML]]'></div>";
              }
              ready() {
                super.ready(), this.applyContent();
              }
              refresh() {}
              clearContent() {
                const e = this;
                for (; e.$.content.firstChild; ) e.$.content.removeChild(e.$.content.firstChild);
              }
              applyContent() {
                const e = this;
                if (void 0 === e.content) return void (e.content = e.$.content);
                if ("" === e.content || null === e.content) return void e.clearContent();
                if (e.content instanceof HTMLElement) return e.clearContent(), void e.$.content.appendChild(e.content);
                const t = document.createDocumentFragment();
                let n = document.createElement("div");
                t.appendChild(n), e.content instanceof HTMLElement ? n.appendChild(e.content) : (n.innerHTML = e.content);
                let r = Array.from(n.childNodes);
                n.parentNode.removeChild(n);
                for (let e = 0; e < r.length; e++) t.appendChild(r[e]);
                e.clearContent(), e.$.content.appendChild(t);
              }
              propertyChangedHandler(e, t, n) {
                super.propertyChangedHandler(e, t, n);
                const r = this;
                t !== n && ("innerHTML" === e && ((r.content = n), r.applyContent(), (r.innerHTML = r.content = y.Core.html(r.$.content))), "content" === e && r.applyContent());
              }
            }
          ),
          window[n](
            "smart-scroll-viewer",
            class extends window[n].ContentElement {
              static get properties() {
                return { autoRefresh: { type: "boolean", value: !1 }, horizontalScrollBarVisibility: { type: "string", value: "auto", allowedValues: ["auto", "disabled", "hidden", "visible"] }, touchScrollRatio: { type: "any", value: null }, touchVelocityCoefficient: { type: "number", value: 50 }, verticalScrollBarVisibility: { type: "string", value: "auto", allowedValues: ["auto", "disabled", "hidden", "visible"] } };
              }
              static get listeners() {
                return { touchmove: "_touchmoveHandler", touchstart: "_touchstartHandler", wheel: "_mouseWheelHandler", "document.up": "_upHandler" };
              }
              static get styleUrls() {
                return ["smart.scrollviewer.css"];
              }
              template() {
                return '<div id="container" class="smart-container" role="presentation">\n                        <div id="scrollViewerContainer" class="smart-scroll-viewer-container" role="presentation">\n                            <div id="scrollViewerContentContainer" inner-h-t-m-l=\'[[innerHTML]]\' class="smart-scroll-viewer-content-container" role="presentation">\n                                <content></content>\n                            </div>\n                        </div>\n                        <smart-scroll-bar id="verticalScrollBar" theme="[[theme]]"  animation="[[animation]]" disabled="[[disabled]]" right-to-left="[[rightToLeft]]" orientation="vertical"></smart-scroll-bar>\n                        <smart-scroll-bar id="horizontalScrollBar" theme="[[theme]]" disabled="[[disabled]]" right-to-left="[[rightToLeft]]"></smart-scroll-bar>\n                    </div>';
              }
              appendChild(e) {
                const t = this;
                if (e) {
                  if (!t.isCompleted || (e.classList && e.classList.contains("smart-resize-trigger-container"))) {
                    const e = Array.prototype.slice.call(arguments, 2);
                    return HTMLElement.prototype.appendChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
                  }
                  t.$.scrollViewerContentContainer.appendChild(e);
                }
              }
              removeChild(e) {
                const t = this;
                if (e) {
                  if (!t.isCompleted || (e.classList && e.classList.contains("smart-resize-trigger-container"))) {
                    const e = Array.prototype.slice.call(arguments, 2);
                    return HTMLElement.prototype.removeChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
                  }
                  t.$.scrollViewerContentContainer.removeChild(e);
                }
              }
              removeAll() {
                const e = this;
                e.isCompleted && (e.$.scrollViewerContentContainer.innerHTML = "");
              }
              _horizontalScrollbarHandler(e) {
                const t = this;
                (t.$.scrollViewerContentContainer.style.left = (t.rightToLeft ? 1 : -1) * t.scrollLeft + "px"), e.stopPropagation && e.stopPropagation(), t.onHorizontalChange && t.onHorizontalChange(e);
              }
              _verticalScrollbarHandler(e) {
                const t = this;
                (t.$.scrollViewerContentContainer.style.top = -t.scrollTop + "px"), e.stopPropagation && e.stopPropagation(), t.onVerticalChange && t.onVerticalChange(e);
              }
              _touchmoveHandler(e) {
                const t = this;
                if (t._touchmoveInside && e.cancelable) return e.preventDefault(), void e.stopPropagation();
                const n = t.scrollHeight > 0,
                  r = t.scrollWidth > 0,
                  o = t._touchCoords;
                if ((!n && !r) || !o) return;
                const i = e.touches[0];
                let s, a, l, d;
                (t._touchCoords = [i.pageX, i.pageY]), n ? ((s = t.scrollTop), (a = t.scrollHeight), (l = i.pageY), (d = o[1])) : ((s = t.scrollLeft), (a = t.scrollWidth), (l = i.pageX), (d = o[0]));
                const c = parseFloat(l.toFixed(5)),
                  u = parseFloat(d.toFixed(5));
                (0 === s && c >= u) || (s === a && c <= u) || (l !== d && (t._touchmoveInside = !0), e.cancelable && (e.preventDefault(), e.stopPropagation()));
              }
              _touchstartHandler(e) {
                const t = e.touches[0];
                this._touchCoords = [t.pageX, t.pageY];
              }
              _mouseWheelHandler(e) {
                const t = this;
                if (!t.disabled && (t.computedHorizontalScrollBarVisibility || t.computedVerticalScrollBarVisibility)) {
                  if (e.shiftKey && t.computedHorizontalScrollBarVisibility) {
                    const n = t.scrollLeft;
                    if ((0 === n && e.deltaX < 0) || (n === t.scrollHeight && e.deltaX > 0)) return;
                    return e.stopPropagation(), e.preventDefault(), void (t.scrollWidth > 0 && t.scrollTo(void 0, t.scrollLeft + t._getScrollCoefficient(e, t.offsetWidth)));
                  }
                  if (t.computedVerticalScrollBarVisibility) {
                    const n = t.scrollTop;
                    if ((0 === n && e.deltaY < 0) || (n === t.scrollHeight && e.deltaY > 0)) return;
                    e.stopPropagation(), e.preventDefault(), t.scrollHeight > 0 && t.scrollTo(t.scrollTop + t._getScrollCoefficient(e, t.offsetHeight));
                  }
                }
              }
              _overriddenHandler() {}
              _upHandler() {
                delete this._touchCoords, delete this._touchmoveInside;
              }
              _getScrollCoefficient(e, t) {
                const n = e.deltaMode,
                  r = Math.abs(e.deltaY);
                let o;
                return 0 === n ? (o = r < 100 / 3 ? r : t) : 1 === n ? (o = r < 1 ? r * (100 / 3) : t) : 2 === n && (o = t), e.deltaY < 0 ? -o : o;
              }
              applyContent() {
                super.applyContent(), this.refresh();
              }
              get computedHorizontalScrollBarVisibility() {
                const e = this;
                return e._scrollView && e._scrollView.hScrollBar ? !e._scrollView.hScrollBar.$.hasClass("smart-hidden") : null;
              }
              get computedVerticalScrollBarVisibility() {
                const e = this;
                return e._scrollView && e._scrollView.vScrollBar ? !e._scrollView.vScrollBar.$.hasClass("smart-hidden") : null;
              }
              scrollTo(e, t) {
                const n = this;
                n._scrollView && (void 0 !== e && n._scrollView.scrollTo(e), void 0 !== t && n._scrollView.scrollTo(t, !1));
              }
              refreshScrollBarsVisibility() {
                const e = this;
                e._scrollView && ((e._scrollView.hScrollBar.disabled = e.disabled), (e._scrollView.vScrollBar.disabled = e.disabled), "disabled" === e.horizontalScrollBarVisibility && (e._scrollView.hScrollBar.disabled = !0), "disabled" === e.verticalScrollBarVisibility && (e._scrollView.vScrollBar.disabled = !0), e.scrollWidth > 0 ? e._scrollView.hScrollBar.$.removeClass("smart-hidden") : "visible" !== e.horizontalScrollBarVisibility && e._scrollView.hScrollBar.$.addClass("smart-hidden"), e.scrollHeight > 0 ? e._scrollView.vScrollBar.$.removeClass("smart-hidden") : "visible" !== e.verticalScrollBarVisibility && e._scrollView.vScrollBar.$.addClass("smart-hidden"), "hidden" === e.horizontalScrollBarVisibility && e._scrollView.hScrollBar.$.addClass("smart-hidden"), "hidden" === e.verticalScrollBarVisibility && e._scrollView.vScrollBar.$.addClass("smart-hidden"), "visible" === e.horizontalScrollBarVisibility && e._scrollView.hScrollBar.$.removeClass("smart-hidden"), "visible" === e.verticalScrollBarVisibility && (e._scrollView.vScrollBar.$.removeClass("smart-hidden"), e.disabled || (e._scrollView.vScrollBar.disabled = e.scrollHeight <= 0)), e.computedHorizontalScrollBarVisibility && e.computedVerticalScrollBarVisibility ? (e._scrollView.hScrollBar.$.addClass("bottom-corner"), e._scrollView.vScrollBar.$.addClass("bottom-corner")) : (e._scrollView.hScrollBar.$.removeClass("bottom-corner"), e._scrollView.vScrollBar.$.removeClass("bottom-corner")));
              }
              ready() {
                super.ready();
                const e = this;
                (e.$.verticalScrollBar.onChange = (t) => {
                  (t.detail = t), e._verticalScrollbarHandler(t);
                }),
                  (e.$.horizontalScrollBar.onChange = (t) => {
                    (t.detail = t), e._horizontalScrollbarHandler(t);
                  }),
                  e.$.verticalScrollBar.setAttribute("aria-controls", e.id),
                  e.$.horizontalScrollBar.setAttribute("aria-controls", e.id),
                  e._customScrollView || (e._scrollView = new Smart.Utilities.Scroll(e, e.$.horizontalScrollBar, e.$.verticalScrollBar)),
                  e.refresh();
              }
              refresh() {
                const e = this;
                function t() {
                  const t = e.$.scrollViewerContainer.classList.contains("vscroll");
                  e.$.scrollViewerContainer.classList.remove("vscroll");
                  const n = e.$.scrollViewerContentContainer.offsetWidth - e.$.scrollViewerContainer.offsetWidth;
                  return (n > 0 && "hidden" !== e.horizontalScrollBarVisibility) || "visible" === e.horizontalScrollBarVisibility ? e.$.scrollViewerContainer.classList.add("hscroll") : e.$.scrollViewerContainer.classList.remove("hscroll"), t && e.$.scrollViewerContainer.classList.add("vscroll"), n;
                }
                function n() {
                  let t;
                  const n = e.$.scrollViewerContainer.classList.contains("hscroll");
                  if ((e.$.scrollViewerContainer.classList.remove("hscroll"), Smart.Utilities.Core.Browser.Safari)) {
                    const n = e.$.scrollViewerContentContainer.getBoundingClientRect().height,
                      r = e.$.scrollViewerContainer.getBoundingClientRect().height;
                    t = n && r ? parseInt(n) - parseInt(r) : e.$.scrollViewerContentContainer.offsetHeight - e.$.scrollViewerContainer.offsetHeight;
                  } else t = e.$.scrollViewerContentContainer.offsetHeight - e.$.scrollViewerContainer.offsetHeight;
                  return e.virtualScrollHeight && (t = e.virtualScrollHeight), (t > 0 && "hidden" !== e.verticalScrollBarVisibility) || "visible" === e.verticalScrollBarVisibility ? e.$.scrollViewerContainer.classList.add("vscroll") : e.$.scrollViewerContainer.classList.remove("vscroll"), n && e.$.scrollViewerContainer.classList.add("hscroll"), t;
                }
                if (!e.$.scrollViewerContentContainer) return;
                "hidden" === e.verticalScrollBarVisibility && e.$.scrollViewerContentContainer.setAttribute("disable-vertical", ""), "hidden" === e.horizontalScrollBarVisibility && e.$.scrollViewerContentContainer.setAttribute("disable-horizontal", "");
                let r = e.scrollWidth,
                  o = e.scrollHeight;
                (e.scrollWidth = t()), (e.scrollHeight = n()), (e.scrollHeight && o === e.scrollHeight) || (e.scrollWidth = t()), (e.scrollWidth && r === e.scrollWidth) || (e.scrollHeight = n()), e.computedVerticalScrollBarVisibility && (e.scrollHeight += e._scrollView.hScrollBar.offsetHeight), e.computedHorizontalScrollBarVisibility && (e.scrollWidth += e._scrollView.vScrollBar.offsetWidth), 0 === e.scrollHeight && e.scrollWidth > 0 && e.$.container.offsetHeight - e.$.content.offsetHeight < 5 && (e.$.container.style.paddingBottom = e._scrollView.hScrollBar.offsetHeight + "px"), e.autoRefresh && ((e.$.scrollViewerContainer.scrollLeft = 0), (e.$.scrollViewerContainer.scrollTop = 0));
              }
              attached() {
                const e = this;
                super.attached(), e._scrollView || e._customScrollView || (e._scrollView = new Smart.Utilities.Scroll(e, e.$.horizontalScrollBar, e.$.verticalScrollBar));
              }
              detached() {
                const e = this;
                super.detached(), e._scrollView && (e._scrollView.unlisten(), delete e._scrollView);
              }
              get scrollWidth() {
                const e = this;
                return e._scrollView && e._scrollView.hScrollBar ? (1 === e._scrollView.hScrollBar.max && "visible" === e.horizontalScrollBarVisibility ? 0 : e._scrollView.hScrollBar.max) : -1;
              }
              set scrollWidth(e) {
                const t = this;
                e < 0 && (e = 0), t._scrollView && t._scrollView.hScrollBar && (0 === e && "visible" === t.horizontalScrollBarVisibility ? (t._scrollView.hScrollBar.max = 0) : (t._scrollView.hScrollBar.max = e), t.refreshScrollBarsVisibility());
              }
              get scrollHeight() {
                const e = this;
                return e._scrollView && e._scrollView.vScrollBar ? (1 === e._scrollView.vScrollBar.max && "visible" === e.verticalScrollBarVisibility ? 0 : e._scrollView.vScrollBar.max) : 0;
              }
              set scrollHeight(e) {
                const t = this;
                e < 0 && (e = 0), t._scrollView && t._scrollView.vScrollBar && (0 === e && "visible" === t.verticalScrollBarVisibility ? (t._scrollView.vScrollBar.max = 1) : (t._scrollView.vScrollBar.max = e), t.refreshScrollBarsVisibility());
              }
              get scrollLeft() {
                const e = this;
                return e._scrollView && e._scrollView.hScrollBar ? e._scrollView.hScrollBar.value : 0;
              }
              set scrollLeft(e) {
                const t = this;
                e < 0 && (e = 0), t._scrollView && t._scrollView.hScrollBar && (t._scrollView.hScrollBar.value = e);
              }
              get scrollTop() {
                const e = this;
                return e._scrollView && e._scrollView.vScrollBar ? e._scrollView.vScrollBar.value : 0;
              }
              set scrollTop(e) {
                const t = this;
                e < 0 && (e = 0), t._scrollView && t._scrollView.vScrollBar && (t._scrollView.vScrollBar.value = e);
              }
              propertyChangedHandler(e, t, n) {
                const r = this;
                super.propertyChangedHandler(e, t, n), "animation" !== e && "theme" !== e && r.refresh();
              }
            }
          ),
          window[n].Utilities.Assign(
            "PositionDetection",
            class {
              constructor(e, t, n, r) {
                const o = this;
                if (t) {
                  const n =
                    "dropDown" +
                    Math.floor(65536 * (1 + Math.random()))
                      .toString(16)
                      .substring(1);
                  (t.id = n), e.setAttribute("aria-owns", n);
                }
                (o.context = e), (o.dropDown = t), (o.defaultParent = n), (o.closeMethod = r);
              }
              handleAutoPositioning() {
                const e = this,
                  t = e.context;
                if ("auto" !== t.dropDownPosition || t.disabled || t.isHidden) return;
                const n = window.requestAnimationFrame;
                let r,
                  o = Date.now();
                return (r = n(function i() {
                  t.isHidden || document.hidden || ((r = n(i)), ("auto" === t.dropDownPosition && !t.disabled && (t.isInShadowDOM ? document.body.contains(t.shadowParent) : document.body.contains(t))) || cancelAnimationFrame(r), t.isHidden && cancelAnimationFrame(r), Date.now() - o >= 200 && (e.scrollHandler(), (o = Date.now())));
                }));
              }
              checkBrowserBounds(e) {
                const t = this.context;
                if ("auto" === t.dropDownPosition && !t.disabled)
                  switch (e) {
                    case "vertically":
                      this.checkBrowserBoundsVertically();
                      break;
                    case "horizontally":
                      this.checkBrowserBoundsHorizontally();
                      break;
                    default:
                      this.checkBrowserBoundsVertically(), this.checkBrowserBoundsHorizontally();
                  }
              }
              checkBrowserBoundsHorizontally() {
                const e = this.context,
                  t = this.dropDown;
                let n,
                  r = 0;
                a.isMobile || window.innerWidth === document.documentElement.clientWidth || (r = window.innerWidth - document.documentElement.clientWidth), null !== e._dropDownParent ? (n = !0) : (t.style.left = "");
                const o = window.innerWidth - r;
                let i = e.getBoundingClientRect().left;
                if ((i < 0 && ((t.style.left = (n ? 0 : Math.abs(i)) + "px"), (i = parseFloat(t.style.left))), i + t.offsetWidth > o)) {
                  let e = i - Math.abs(o - i - t.offsetWidth);
                  n && (e += window.pageXOffset), (t.style.left = (n ? e : e - i) + "px"), window.innerWidth === document.documentElement.clientWidth && (t.style.left = parseFloat(t.style.left) + r + "px"), n && window.innerHeight === document.documentElement.clientHeight && this.positionDropDown(!0);
                }
              }
              checkBrowserBoundsVertically(e) {
                const t = this.context,
                  n = this.dropDown,
                  r = t._dropDownListPosition;
                e || (e = t.getBoundingClientRect()), 0 !== e.height && (document.documentElement.clientHeight - Math.abs(e.top + e.height + n.offsetHeight) >= 0 ? (t._dropDownListPosition = "bottom") : e.top - n.offsetHeight >= 0 ? (t._dropDownListPosition = "top") : (t._dropDownListPosition = "overlay-center"), this.updatePositionAttribute(r, t._dropDownListPosition));
              }
              scrollHandler() {
                const e = this.context;
                if (!e.parentElement) return;
                const t = e.getBoundingClientRect();
                if (t.top === e._positionTop) return;
                const n = e._dropDownListPosition;
                this.checkBrowserBoundsVertically(t), e._dropDownListPosition !== n && this.positionDropDown(), (e._positionTop = t.top);
              }
              getDropDownParent(e) {
                const t = this.context,
                  n = this.dropDown;
                let r = t.dropDownAppendTo;
                (t._positionedParent = null), null === r ? (t._dropDownParent = null) : "body" === r || r === document.body ? (t.getRootNode().host ? (t._dropDownParent = t.getRootNode().host.shadowRoot) : (t._dropDownParent = document.body)) : r instanceof HTMLElement ? (t._dropDownParent = r) : "string" == typeof r ? ((r = document.getElementById(r)), r instanceof HTMLElement ? (t._dropDownParent = r) : ((t.dropDownAppendTo = null), (t._dropDownParent = null))) : ((t.dropDownAppendTo = null), (t._dropDownParent = null));
                let o = t._dropDownParent;
                if (null !== o) {
                  for (; o && o instanceof HTMLElement && "static" === window.getComputedStyle(o).position && o !== t.getShadowRootOrBody(); ) o = o.parentElement;
                  o === document.body ? (t._positionedParent = null) : (t._positionedParent = o), n && (n.setAttribute("animation", t.animation), "" !== t.theme && n.$.addClass(t.theme), e && (t._dropDownParent.appendChild(n), n.$.addClass("smart-drop-down-repositioned")), -1 === t.detachedChildren.indexOf(n) && t.detachedChildren.push(n));
                }
              }
              dropDownAppendToChangedHandler() {
                const e = this.context,
                  t = this.dropDown,
                  n = e._dropDownParent;
                this.getDropDownParent(), e._dropDownParent !== n && (e[this.closeMethod](), ["left", "top", "font-size", "font-family", "font-style", "font-weight"].forEach((e) => (t.style[e] = null)), null === e._dropDownParent ? (this.defaultParent.appendChild(t), t.$.removeClass("smart-drop-down-repositioned")) : (e._dropDownParent.appendChild(t), t.$.addClass("smart-drop-down-repositioned")));
              }
              dropDownPositionChangedHandler() {
                const e = this;
                (e.dropDown.style.transition = "none"), e.context[e.closeMethod](), e.setDropDownPosition(), e.handleAutoPositioning();
              }
              dropDownAttached(e) {
                const t = this.context;
                null !== t._dropDownParent && (t._dropDownParent.appendChild(this.dropDown), this.handleAutoPositioning(), e && t[e]());
              }
              dropDownDetached() {
                const e = this.context;
                null !== e._dropDownParent && document.body.contains(this.dropDown) && document.body.contains(e._dropDownParent) && e._dropDownParent.removeChild(this.dropDown);
              }
              setDropDownPosition() {
                const e = this.context,
                  t = e.dropDownPosition,
                  n = e._dropDownListPosition;
                "auto" === t ? this.checkBrowserBounds() : (e._dropDownListPosition = t), this.updatePositionAttribute(n, e._dropDownListPosition);
              }
              updatePositionAttribute(e, t) {
                const n = this.context,
                  r = this.dropDown;
                n.$.dropDownButton && !n.$.dropDownButton.hasAttribute(t) && (n.$.dropDownButton.removeAttribute(e), n.$.dropDownButton.setAttribute(t, "")),
                  r.hasAttribute(t) ||
                    ((r.style.transition = "none"),
                    r.removeAttribute(e),
                    r.setAttribute(t, ""),
                    requestAnimationFrame(function () {
                      r.style.transition = null;
                    }));
              }
              positionDropDown(e) {
                const t = this.context,
                  n = this.dropDown;
                if (!t.opened || null === t._dropDownParent) return;
                const r = t.getBoundingClientRect();
                let o, i;
                if (this.customPositionDropDown) {
                  const e = this.customPositionDropDown(r);
                  (o = e.left), (i = e.top);
                } else
                  switch (((o = r.left), (i = r.top), t._dropDownListPosition)) {
                    case "bottom":
                      i += t.$.container.offsetHeight - 1;
                      break;
                    case "center-bottom":
                      (i += t.$.container.offsetHeight - 1), (o += t.offsetWidth - n.offsetWidth / 2);
                      break;
                    case "center-top":
                      (i -= n.offsetHeight - 1), (o += t.offsetWidth - n.offsetWidth / 2);
                      break;
                    case "top":
                      i -= n.offsetHeight - 1;
                      break;
                    case "overlay-bottom":
                      break;
                    case "overlay-center":
                      i -= n.offsetHeight / 2 - t.offsetHeight / 2;
                      break;
                    case "overlay-top":
                      i -= n.offsetHeight - t.offsetHeight;
                  }
                const s = this.getDropDownOffset();
                (n.style.top = i + s.y + "px"), e || (n.style.left = o + s.x + "px");
              }
              getDropDownOffset() {
                const e = this.context._positionedParent;
                let t, n;
                if (e && "#document-fragment" !== e.nodeName) {
                  const r = e.getBoundingClientRect();
                  (t = -r.left), (n = -r.top);
                } else (t = window.pageXOffset), (n = window.pageYOffset);
                return { x: t, y: n };
              }
              placeOverlay() {
                const e = this.context;
                if (!e.dropDownOverlay || e._overlay) return;
                const t = document.createElement("div");
                t.classList.add("smart-drop-down-overlay"), (t.style.width = document.documentElement.scrollWidth + "px"), (t.style.height = document.documentElement.scrollHeight + "px"), document.body.appendChild(t), (e._overlay = t);
              }
              removeOverlay(e) {
                const t = this,
                  n = t.context;
                n._overlay &&
                  (n.hasAnimation && e
                    ? requestAnimationFrame(function e() {
                        t.dropDown.getBoundingClientRect().height > 0 ? requestAnimationFrame(e) : (document.body.removeChild(n._overlay), delete n._overlay);
                      })
                    : (document.body.removeChild(n._overlay), delete n._overlay));
              }
            }
          ),
          (window.Smart.Color = class {
            constructor(e) {
              if ((window.Smart._colors || (window.Smart._colors = []), window.Smart._colors[e])) {
                const t = window.Smart._colors[e];
                return (this.hex = t.hex), (this.r = t.r), (this.g = t.g), void (this.b = t.b);
              }
              (this.r = this.g = this.b = 0), (this.hex = "");
              const t = this.getStandardizedColor(e);
              t && (this.setHex(t.substring(1)), (window.Smart._colors[e] = { hex: this.hex, r: this.r, g: this.g, b: this.b }));
            }
            getStandardizedColor(e) {
              const t = document.createElement("canvas").getContext("2d");
              return (t.fillStyle = e), t.fillStyle;
            }
            getInvertedColor() {
              return "" === this.hex ? "transparent" : 255 - (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) < 105 ? "Black" : "White";
            }
            hexToRgb(e) {
              let t = "00",
                n = "00",
                r = "00";
              return 6 === (e = this.validateHex(e)).length ? ((t = e.substring(0, 2)), (n = e.substring(2, 4)), (r = e.substring(4, 6))) : (e.length > 4 && ((t = e.substring(4, e.length)), (e = e.substring(0, 4))), e.length > 2 && ((n = e.substring(2, e.length)), (e = e.substring(0, 2))), e.length > 0 && (r = e.substring(0, e.length))), { r: this.hexToInt(t), g: this.hexToInt(n), b: this.hexToInt(r) };
            }
            validateHex(e) {
              return (e = (e = new String(e).toUpperCase()).replace(/[^A-F0-9]/g, "0")).length > 6 && (e = e.substring(0, 6)), e;
            }
            webSafeDec(e) {
              return (e = Math.round(e / 51)), (e *= 51);
            }
            hexToWebSafe(e) {
              let t, n, r;
              return 3 === e.length ? ((t = e.substring(0, 1)), (n = e.substring(1, 1)), (r = e.substring(2, 1))) : ((t = e.substring(0, 2)), (n = e.substring(2, 4)), (r = e.substring(4, 6))), this.intToHex(this.webSafeDec(this.hexToInt(t))) + this.intToHex(this.webSafeDec(this.hexToInt(n))) + this.intToHex(this.webSafeDec(this.hexToInt(r)));
            }
            rgbToWebSafe(e) {
              return { r: this.webSafeDec(e.r), g: this.webSafeDec(e.g), b: this.webSafeDec(e.b) };
            }
            rgbToHex(e) {
              return this.intToHex(e.r) + this.intToHex(e.g) + this.intToHex(e.b);
            }
            intToHex(e) {
              let t = parseInt(e).toString(16);
              return 1 === t.length && (t = "0" + t), t.toUpperCase();
            }
            hexToInt(e) {
              return parseInt(e, 16);
            }
            setRgb(e, t, n) {
              let r = function (e) {
                return e < 0 || e > 255 || isNaN(parseInt(e)) ? 0 : e;
              };
              (this.r = r(e)), (this.g = r(t)), (this.b = r(n)), (this.hex = this.rgbToHex(this));
            }
            setHex(e) {
              this.hex = e;
              let t = this.hexToRgb(this.hex);
              (this.r = t.r), (this.g = t.g), (this.b = t.b);
            }
          });
      })();

      /***/
    },

    /***/ 9135: /***/ () => {
      Smart(
        "smart-scroll-bar",
        class extends Smart.BaseElement {
          static get properties() {
            return { clickRepeatDelay: { type: "integer", value: 50 }, largeStep: { type: "integer", value: 100 }, min: { type: "integer", value: 0 }, max: { type: "integer", value: 1e3 }, mechanicalAction: { value: "switchWhileDragging", allowedValues: ["switchUntilReleased", "switchWhenReleased", "switchWhileDragging"], type: "string" }, orientation: { type: "string", value: "horizontal", allowedValues: ["horizontal", "vertical"] }, step: { type: "integer", value: 10 }, showButtons: { type: "boolean", value: !0, defaultReflectToAttribute: !0 }, value: { type: "integer", value: 0 } };
          }
          static get styleUrls() {
            return ["smart.scrollbar.css"];
          }
          template() {
            return '<div id="container" class="smart-container" role="presentation">\n                    <div id="nearButton" class="smart-scroll-button smart-arrow-left" role="presentation" aria-hidden="true"></div>\n                    <div  id="track" class="smart-track" role="presentation">\n                        <div id="thumb" class="smart-thumb" role="presentation"></div>\n                    </div>\n                    <div id="farButton" class="smart-scroll-button smart-arrow-right" role="presentation" aria-hidden="true"></div>\n            </div>';
          }
          static get listeners() {
            return { "nearButton.click": "_nearButtonClickHandler", "nearButton.down": "_startRepeat", "nearButton.up": "_stopRepeat", "nearButton.pointerenter": "_updateInBoundsFlag", "nearButton.pointerleave": "_updateInBoundsFlag", "farButton.click": "_farButtonClickHandler", "farButton.down": "_startRepeat", "farButton.up": "_stopRepeat", "farButton.pointerenter": "_updateInBoundsFlag", "farButton.pointerleave": "_updateInBoundsFlag", "track.down": "_trackDownHandler", "track.click": "_trackClickHandler", "track.move": "_trackMoveHandler", "thumb.down": "_dragStartHandler", "document.move": "_dragHandler", "document.up": "_dragEndHandler", up: "_dragEndHandler", "document.selectstart": "_selectStartHandler", resize: "_resizeHandler" };
          }
          _updateInBoundsFlag(t) {
            const e = this,
              a = t.target;
            (a._isPointerInBounds = !0), -1 !== t.type.indexOf("leave") && (a._isPointerInBounds = !1), 1 !== ("buttons" in t ? t.buttons : t.which) && e._stopRepeat(t);
          }
          _startRepeat(t) {
            const e = this;
            if (e.disabled) return;
            const a = t.target;
            a._initialTimer ||
              (a._initialTimer = setTimeout(function () {
                a._repeatTimer = setInterval(() => {
                  if (a._isPointerInBounds) {
                    const e = "buttons" in t ? t.buttons : t.which;
                    a.$.fireEvent("click", { buttons: e, clientX: t.clientX, clientY: t.clientY, pageX: t.pageX, pageY: t.pageY, screenX: t.screenX, screenY: t.screenY });
                  }
                }, e.clickRepeatDelay);
              }, 3 * e.clickRepeatDelay));
          }
          _stopRepeat(t) {
            if (this.disabled) return;
            const e = t.target;
            e._repeatTimer && (clearInterval(e._repeatTimer), (e._repeatTimer = null)), e._initialTimer && (clearTimeout(e._initialTimer), (e._initialTimer = null));
          }
          _calculateThumbSize(t) {
            const e = this,
              a = e.max - e.min,
              r = "horizontal" === e.orientation ? e.$.track.offsetWidth > 10 : e.$.track.offsetHeight > 10;
            let n = 0;
            return a >= 1 && r ? ((n = (t / (a + t)) * t), e.$.thumb.className.indexOf("smart-hidden") >= 0 && e.$thumb.removeClass("smart-hidden")) : e.$thumb.addClass("smart-hidden"), Math.max(10, Math.min(n, t));
          }
          _dragStartHandler(t) {
            const e = this;
            e.disabled || ((e.thumbCapture = !0), (e.dragStartX = t.clientX), (e.dragStartY = t.clientY), (e.dragStartValue = e.value), t.stopPropagation(), t.preventDefault());
          }
          _dragHandler(t) {
            const e = this;
            if (!0 !== e.thumbCapture) return;
            e._isThumbDragged = !0;
            const a = (e.max - e.min) / (e.scrollBarSize - e.thumbSize),
              r = "horizontal" === e.orientation ? (t.clientX - e.dragStartX) * a : (t.clientY - e.dragStartY) * a;
            let n = r;
            e.rightToLeft && "horizontal" === e.orientation && (n = -r), e._updateValue(e.dragStartValue + n), t.stopPropagation(), t.preventDefault(), t.originalEvent && (t.originalEvent.stopPropagation(), t.originalEvent.preventDefault());
          }
          _dragEndHandler(t) {
            const e = this;
            e._trackDownTimer && (clearInterval(e._trackDownTimer), (e._trackDownTimer = null)), e.thumbCapture && ((e.thumbCapture = !1), (e._isThumbDragged = !1), "switchWhenReleased" === e.mechanicalAction ? e._updateValue(e.dragStartValue, e.value) : "switchUntilReleased" === this.mechanicalAction && e._updateValue(e.dragStartValue), t.preventDefault(), t.stopPropagation(), t.originalEvent.preventDefault(), t.originalEvent.stopPropagation());
          }
          _farButtonClickHandler() {
            const t = this;
            if (t.disabled) return;
            const e = t.value;
            t._updateValue(t.value + ("horizontal" === t.orientation && t.rightToLeft ? -1 : 1) * t.step), "switchUntilReleased" === t.mechanicalAction && t._updateValue(e);
          }
          _nearButtonClickHandler() {
            const t = this;
            if (t.disabled) return;
            const e = t.value;
            t._updateValue(t.value - ("horizontal" === t.orientation && t.rightToLeft ? -1 : 1) * t.step), "switchUntilReleased" === t.mechanicalAction && t._updateValue(e);
          }
          propertyChangedHandler(t, e, a) {
            super.propertyChangedHandler(t, e, a);
            const r = this;
            switch (t) {
              case "min":
              case "max":
              case "orientation":
              case "showButtons":
                r._layout(), "min" === t ? r.setAttribute("aria-valuemin", a) : "max" === t ? r.setAttribute("aria-valuemax", a) : "orientation" === t && r.setAttribute("aria-orientation", a);
                break;
              case "value":
                r._updateValue(e, a);
                break;
              default:
                r._layout();
            }
          }
          render() {
            const t = this;
            t.setAttribute("role", "scrollbar"), t.setAttribute("aria-orientation", t.orientation), t.setAttribute("aria-valuemin", t.min), t.setAttribute("aria-valuemax", t.max), t.setAttribute("aria-valuenow", t.value), t._layout(), super.render();
          }
          _resizeHandler() {
            this._layout();
          }
          refresh() {
            this._layout();
          }
          beginUpdate() {
            this._isUpdating = !0;
          }
          endUpdate() {
            (this._isUpdating = !1), this.refreshValue();
          }
          refreshValue() {
            const t = this;
            t._layout(), t._updateValue(t.value);
          }
          _layout() {
            const t = this;
            t._isUpdating || ((t.scrollBarSize = "horizontal" === t.orientation ? t.$.track.offsetWidth : t.$.track.offsetHeight), (t.thumbSize = t._calculateThumbSize(t.scrollBarSize)), "horizontal" === t.orientation && t.$.thumb.style.width !== t.thumbSize + "px" ? (t.$.thumb.style.width = t.thumbSize + "px") : "vertical" === t.orientation && t.$.thumb.style.height !== t.thumbSize + "px" && (t.$.thumb.style.height = t.thumbSize + "px"), "horizontal" === t.orientation ? (t.$.nearButton.classList.contains("smart-arrow-up") && t.$.nearButton.classList.remove("smart-arrow-up"), t.$.farButton.classList.contains("smart-arrow-down") && t.$.farButton.classList.remove("smart-arrow-down"), t.$.nearButton.classList.contains("smart-arrow-left") || t.$.nearButton.classList.add("smart-arrow-left"), t.$.farButton.classList.contains("smart-arrow-right") || t.$.farButton.classList.add("smart-arrow-right")) : (t.$.nearButton.classList.contains("smart-arrow-left") && t.$.nearButton.classList.remove("smart-arrow-left"), t.$.farButton.classList.contains("smart-arrow-right") && t.$.farButton.classList.remove("smart-arrow-right"), t.$.nearButton.classList.contains("smart-arrow-up") || t.$.nearButton.classList.add("smart-arrow-up"), t.$.farButton.classList.contains("smart-arrow-down") || t.$.farButton.classList.add("smart-arrow-down")), t._updateThumbPosition(), (t.value > t.max || t.value < t.min) && t._updateValue(t.value, t.value > t.max ? t.max : t.min));
          }
          _selectStartHandler(t) {
            this.thumbCapture && t.preventDefault();
          }
          _trackDownHandler(t) {
            const e = this;
            t.target === e.$.track &&
              (e._trackDownTimer && clearInterval(e._trackDownTimer),
              e.thumbCapture ||
                ((e._trackDownTimer = setInterval(function () {
                  e._trackClickHandler(t);
                }, e.clickRepeatDelay)),
                t.stopPropagation(),
                t.preventDefault()));
          }
          _trackClickHandler(t) {
            const e = this;
            if (e.disabled) return;
            if (e._isThumbDragged) return clearInterval(e._trackDownTimer), void (e._trackDownTimer = null);
            const a = e.$.thumb.getBoundingClientRect(),
              r = t.pageX - window.pageXOffset,
              n = t.pageY - window.pageYOffset,
              i = (e.rightToLeft ? -1 : 1) * e.value;
            "horizontal" === e.orientation ? (r > (e._isThumbDragged ? e.dragStartX : a.right) ? e._updateValue(e.value + (e.rightToLeft ? -1 : 1) * e.largeStep) : r < (e._isThumbDragged ? e.dragStartX : a.left) && e._updateValue(e.value - (e.rightToLeft ? -1 : 1) * e.largeStep)) : n > (e._isThumbDragged ? e.dragStartY : a.bottom) ? e._updateValue(e.value + e.largeStep) : n < (e._isThumbDragged ? e.dragStartY : a.top) && e._updateValue(e.value - e.largeStep), "switchUntilReleased" === e.mechanicalAction && e._updateValue(i);
          }
          _trackMoveHandler(t) {
            "touchmove" === t.originalEvent.type && t.originalEvent.preventDefault();
          }
          _updateValue(t, e) {
            const a = this;
            if (!a._isUpdating && (1 === arguments.length && ((e = t), (t = a.value)), (void 0 === e || isNaN(e)) && (e = a.min), e > a.max && (e = a.max), e < a.min && (e = a.min), (a.value = e), t !== e)) {
              if ((a.setAttribute("aria-valuenow", e), a._updateThumbPosition(), a.thumbCapture && "switchWhenReleased" === a.mechanicalAction)) return;
              if (a.onChange) return void a.onChange({ value: a.value, oldValue: t, min: a.min, max: a.max, context: a });
              a.$.fireEvent("change", { value: a.value, oldValue: t, min: a.min, max: a.max });
            }
          }
          _updateThumbPosition() {
            const t = this,
              e = "horizontal" === t.orientation ? t.$.track.offsetWidth : t.$.track.offsetHeight,
              a = t._calculateThumbSize(e),
              r = e - a;
            let n = ((e - a) / (t.max - t.min)) * (t.value - t.min);
            t.rightToLeft && "horizontal" === t.orientation && (n = ((e - a) / (t.max - t.min)) * (t.max - t.value - t.min)), (n = Math.min(r, Math.max(0, n))), "vertical" === t.orientation && t.$.thumb.style.top !== n + "px" ? (t.$.thumb.style.top = n + "px") : "horizontal" === t.orientation && t.$.thumb.style.left !== n + "px" && (t.$.thumb.style.left = n + "px");
          }
        }
      );

      /***/
    },

    /***/ 1066: /***/ () => {
      Smart(
        "smart-splitter-item",
        class extends Smart.ContentElement {
          static get properties() {
            return { collapsed: { value: !1, type: "boolean" }, collapsible: { value: !1, type: "boolean" }, locked: { value: !1, type: "boolean" }, max: { value: "", type: "any", validator: "_propertyValidator" }, min: { value: "", type: "any", validator: "_propertyValidator" }, size: { value: "", type: "any", validator: "_propertyValidator" } };
          }
          get enableShadowDOM() {
            return !1;
          }
          template() {
            return '<div id="container" role="presentation">\n                    <div class="smart-content" id="content" inner-h-t-m-l="[[innerHTML]]" role="presentation">\n                        <content></content>\n                    </div>\n                </div>';
          }
          static get listeners() {
            return { mouseenter: "_mouseEventsHandler", mouseleave: "_mouseEventsHandler", styleChanged: "_styleChangedEventHandler" };
          }
          propertyChangedHandler(e, t, i) {
            const s = this;
            switch (e) {
              case "collapsed":
                (s._ignorePropertyValue = !0), i ? s.collapse() : s.expand();
                break;
              case "collapsible":
                s._updateNearSplitterBars();
                break;
              case "size":
              case "min":
              case "max":
                s._setSize(e, i);
                break;
              default:
                super.propertyChangedHandler(e, t, i);
            }
          }
          attached() {
            super.attached();
            const e = this;
            e._sizeLimits || (e._sizeLimits = {});
            const t = getComputedStyle(e);
            e.min || ((e._sizeLimits.minWidth = parseFloat(t.getPropertyValue("min-width")) || 0), (e._sizeLimits.minHeight = parseFloat(t.getPropertyValue("min-height")) || 0)), e.max || ((e._sizeLimits.maxWidth = parseFloat(t.getPropertyValue("max-width")) || 0), (e._sizeLimits.maxHeight = parseFloat(t.getPropertyValue("max-height")) || 0));
          }
          detached() {
            super.detached(), this.$.removeClass("animate");
          }
          appendChild(e) {
            const t = this;
            if (e) {
              if (!t.isCompleted || (e instanceof HTMLElement && e.classList.contains("smart-resize-trigger-container"))) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.appendChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
              }
              t.$.content.appendChild(e);
            } else t.error(t.localize("invalidNode", { elementType: t.nodeName.toLowerCase(), method: "appendChild", node: "node" }));
          }
          collapse(e) {
            const t = this;
            if (t.collapsible) {
              if (t._ignorePropertyValue || !t.collapsed) {
                const i = t.closest("smart-splitter") || (t.getRootNode() && t.getRootNode().host ? t.getRootNode().host.closest("smart-splitter") : void 0);
                if (!i) return;
                const s = i._items.indexOf(t);
                s === i._items.length - 1 ? (e = !0) : 0 === s && (e = !1);
                const n = e ? -1 : 1;
                let a,
                  r = s + n,
                  o = i._items[r];
                for (; o && o.collapsed; ) (r += n), (o = i._items[r]);
                if (!o) return void (t.collapsed = !1);
                delete t._ignorePropertyValue, t._sizeBeforeCollapse || (t._sizeBeforeCollapse = t[i._measurements.size]), o._sizeBeforeCollapse || (o._sizeBeforeCollapse = o[i._measurements.size]), t.previousElementSibling instanceof Smart.SplitterBar ? (a = t.previousElementSibling) : t.nextElementSibling instanceof Smart.SplitterBar && (a = t.nextElementSibling);
                const l = o[i._measurements.size] + t[i._measurements.size],
                  m = a ? a[i._measurements.size] : t._sizeLimits[i._measurements.minDimension],
                  d = l - m;
                if (l && d < m) return void (t.collapsed = !1);
                if ((i.hasAnimation && !i._isInitializing && (t.style[i._measurements.dimension] || (t.style[i._measurements.dimension] = t[i._measurements.size] + "px"), t.$.addClass("animate"), o.$.addClass("animate"), t.addEventListener("transitionend", t._transitionEndHandler, { once: !0 }), t.addEventListener("transitioncancel", t._transitionEndHandler, { once: !0 }), o.addEventListener("transitionend", t._transitionEndHandler, { once: !0 }), o.addEventListener("transitioncancel", t._transitionEndHandler, { once: !0 })), !t._paddings)) {
                  const e = getComputedStyle(t);
                  t._paddings = (parseFloat(e.getPropertyValue("padding-" + i._measurements.position)) || 0) + (parseFloat(e.getPropertyValue("padding-" + i._measurements.position2)) || 0);
                }
                void 0 !== o._sizeBeforeCollapse && (o._sizeBeforeCollapse = o._sizeBeforeCollapse + t._sizeBeforeCollapse), o._sizeLimits && o._sizeLimits[i._measurements.maxDimension] && l > o._sizeLimits[i._measurements.maxDimension] && ((o._sizeLimits.ignoreUpdate = !0), o._sizeBeforeCollapse ? (o.style[i._measurements.maxDimension] = o._sizeBeforeCollapse + "px") : (o.style[i._measurements.maxDimension] = "")), o.set("size", ""), o._sizeBeforeCollapse && (o.style[i._measurements.dimension] = o._sizeBeforeCollapse + "px"), (t.style[i._measurements.dimension] = t.style[i._measurements.minDimension] = "0"), (t.style.padding = "0"), (t._neighbourItem = o), (t.collapsed = !0), i.$.fireEvent("collapse", { itemIndex: i._items.indexOf(t) }), e ? ((t.previousElementSibling.itemCollapsed = !0), (t.previousElementSibling.showFarButton = !(t.previousElementSibling.showNearButton = !1))) : ((t.nextElementSibling.itemCollapsed = !0), (t.nextElementSibling.showNearButton = !(t.nextElementSibling.showFarButton = !1)));
              }
            } else t.collapsed = !1;
          }
          expand() {
            const e = this;
            if (e._ignorePropertyValue || e.collapsed) {
              const t = e.closest("smart-splitter") || (e.getRootNode() && e.getRootNode().host ? e.getRootNode().host.closest("smart-splitter") : void 0);
              if (!t) return void (e.collapsed = !0);
              if (!e._neighbourItem) return void (e.collapsed = !0);
              if ((delete e._ignorePropertyValue, !e._neighbourItem._ignorePropertyValue && e._neighbourItem.collapsed)) {
                let i = t._items.indexOf(e._neighbourItem);
                const s = t._items.indexOf(e) > t._items.indexOf(e._neighbourItem) ? -1 : 1;
                for (e._neighbourItem = t._items[i]; e._neighbourItem && e._neighbourItem.collapsed; ) (i += s), (e._neighbourItem = t._items[i]);
              }
              if (!e._neighbourItem) return void (e.collapsed = !0);
              e.min && e._setSize("min", e.min, !0);
              const i = e._neighbourItem._sizeBeforeCollapse,
                s = e._sizeLimits[t._measurements.minDimension],
                n = e._neighbourItem._sizeLimits[t._measurements.minDimension],
                a = i - s;
              if (i && a < n) return void (e.collapsed = !0);
              if (!e._neighbourItem._paddings) {
                const i = getComputedStyle(e._neighbourItem);
                e._neighbourItem._paddings = (parseFloat(i.getPropertyValue("padding-" + t._measurements.position)) || 0) + (parseFloat(i.getPropertyValue("padding-" + t._measurements.position2)) || 0);
              }
              if (!e._paddings) {
                const i = getComputedStyle(e);
                e._paddings = (parseFloat(i.getPropertyValue("padding-" + t._measurements.position)) || 0) + (parseFloat(i.getPropertyValue("padding-" + t._measurements.position2)) || 0);
              }
              if ((e.size + "").indexOf("%") > -1 && (!e._sizeBeforeCollapse || 0 === e._sizeBeforeCollapse) && e._neighbourItem._sizeBeforeCollapse) {
                let i = 0;
                t._items.map((e) => (i += e.collapsed ? 0 : e.style[t._measurements.dimension] && e.style[t._measurements.dimension].indexOf("%") < -1 && e._sizeBeforeCollapse ? e._sizeBeforeCollapse : e.getBoundingClientRect()[t._measurements.dimension])), (e._sizeBeforeCollapse = (i * parseFloat(e.size)) / 100);
              }
              const r = Math.min(Math.max(s, e._sizeBeforeCollapse), i - e._neighbourItem._paddings - e._paddings - n);
              if (r < 0) return void (e.collapsed = !0);
              e.min && (e.style[t._measurements.minDimension] = 0), e.hasAnimation && !t._isInitializing && (e.$.addClass("animate"), e._neighbourItem.$.addClass("animate"), e.addEventListener("transitionend", e._transitionEndHandler, { once: !0 }), e.addEventListener("transitioncancel", e._transitionEndHandler, { once: !0 }), e._neighbourItem.addEventListener("transitionend", e._transitionEndHandler, { once: !0 }), e._neighbourItem.addEventListener("transitioncancel", e._transitionEndHandler, { once: !0 })), (e.style.padding = ""), e.min && (e.style[t._measurements.minDimension] = e._sizeLimits[t._measurements.minDimension] + "px"), (e.style[t._measurements.dimension] = (e._sizeBeforeCollapse = r) + "px"), (e._neighbourItem.style[t._measurements.dimension] = (e._neighbourItem._sizeBeforeCollapse = Math.max(e._neighbourItem._sizeLimits[t._measurements.minDimension], i - r)) + "px"), e._neighbourItem._sizeLimits[t._measurements.maxDimension] && (e._neighbourItem.style[t._measurements.maxDimension] = e._neighbourItem._sizeLimits[t._measurements.maxDimension] + "px"), (e.collapsed = !1), t.$.fireEvent("expand", { itemIndex: t._items.indexOf(e) }), t._items.indexOf(e) > t._items.indexOf(e._neighbourItem) ? ((e.previousElementSibling.itemCollapsed = !1), (e.previousElementSibling.showNearButton = e._neighbourItem.collapsible)) : ((e.nextElementSibling.itemCollapsed = !1), (e.nextElementSibling.showFarButton = e._neighbourItem.collapsible));
              const o = t._items[t._items.indexOf(e) - 1],
                l = t._items[t._items.indexOf(e) + 1];
              if (o) {
                const t = o.nextElementSibling;
                t && t instanceof Smart.SplitterBar && (o.collapsed ? (t.showNearButton = e.collapsible) : ((t.itemCollapsed = !1), (t.showNearButton = o.collapsible), (t.showFarButton = e.collapsible)));
              }
              if (l) {
                const t = l.previousElementSibling;
                t && t instanceof Smart.SplitterBar && (l.collapsed ? (t.showFarButton = l.collapsed) : ((t.itemCollapsed = !1), (t.showNearButton = e.collapsible), (t.showFarButton = l.collapsible)));
              }
              delete e._neighbourItem;
            }
          }
          insertBefore(e, t) {
            const i = this;
            if (e) {
              if (!i.isCompleted || (e instanceof HTMLElement && e.classList.contains("smart-resize-trigger-container"))) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.insertBefore.apply(i, e.concat(Array.prototype.slice.call(arguments)));
              }
              i.$.content.insertBefore(e, t || null);
            } else i.error(i.localize("invalidNode", { elementType: i.nodeName.toLowerCase(), method: "insertBefore", node: "node" }));
          }
          lock() {
            this.locked = !0;
          }
          unlock() {
            this.locked = !1;
          }
          ready() {
            super.ready();
          }
          render() {
            const e = this,
              t = e.closest("smart-splitter"),
              i = t && t.isCompleted;
            e.setAttribute("role", "region"), (e._sizeLimits = {});
            let s = "string" == typeof e.min && e.min.indexOf("%") > -1;
            const n = isNaN(parseFloat(e.min)) ? 0 : parseFloat(e.min),
              a = isNaN(parseFloat(e.max)) ? 0 : parseFloat(e.max);
            if (((e._sizeLimits.minWidth = e._sizeLimits.minHeight = s && i ? (n * t[t._measurements.size]) / 100 : n), (s = "string" == typeof e.max && e.max.indexOf("%") > -1), (e._sizeLimits.maxWidth = e._sizeLimits.maxHeight = s && i ? (a * t[t._measurements.size]) / 100 : a), e.size)) {
              s = "string" == typeof e.size && e.size.indexOf("%") > -1;
              const n = "auto" === e.size ? e.size : isNaN(parseFloat(e.size)) ? 0 : parseFloat(e.size) + (s ? "%" : "px");
              i ? (e.style[t._measurements.dimension] = n) : (e.style.width = e.style.height = n);
            }
            e.min && e._setSize("min", e.min), e.max && e._setSize("max", e.max), e._updateNearSplitterBars(), e.checkLicense(), super.render();
          }
          removeChild(e) {
            const t = this;
            if (e) {
              if (!t.isCompleted || (e instanceof HTMLElement && e.classList.contains("smart-resize-trigger-container"))) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.appendChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
              }
              t.$.content.removeChild(e);
            } else t.error(t.localize("invalidNode", { elementType: t.nodeName.toLowerCase(), method: "removeChild", node: "node" }));
          }
          _expand() {
            const e = this;
            if (e._neighbourItem && e._neighbourItem.parentElement) return void e.expand();
            const t = e.closest("smart-splitter");
            t && (delete e._neighbourItem, (e.collapsed = !1), t.$.fireEvent("expand", { itemIndex: t._items.indexOf(e) }), (e.style[t._measurements.minDimension] = e.min ? e._sizeLimits[t._measurements.minDimension] + "px" : ""), (e.style[t._measurements.dimension] = e._sizeBeforeCollapse + "px"), t._items.length < 2 || (e.previousElementSibling instanceof Smart.SplitterBar && ((e.previousElementSibling.itemCollapsed = !1), (e.previousElementSibling.showNearButton = t._items[t._items.indexOf(e) - 1].collapsible))));
          }
          _mouseEventsHandler(e) {
            const t = this.closest("smart-splitter") || this.getRootNode().host;
            ((t && !t.disabled) || Smart.Utilities.Core.isMobile) && ("mouseenter" === e.type ? this.setAttribute("hover", "") : this.removeAttribute("hover"));
          }
          _propertyValidator(e, t) {
            return "number" != typeof t && "string" != typeof t ? e : t;
          }
          _setSize(e, t, i) {
            const s = this;
            if (s.isCompleted && s.locked) return;
            const n = s.closest("smart-splitter");
            if (!n) return;
            if (!n.isCompleted) return void n.whenReady(() => s._setSize(e, t));
            const a = "string" == typeof t && t.indexOf("%") > -1,
              r = (function () {
                const e = n.bars;
                let t = 0;
                for (let i = 0; i < e.length; i++) t += e[i][n._measurements.size];
                return n.$.container[n._measurements.size] - t;
              })(),
              o = (e) => (100 * e) / r;
            switch (((t = isNaN(parseFloat(t)) ? "" : parseFloat(t)), s._sizeLimits || (s._sizeLimits = {}), e)) {
              case "size": {
                const e = s[n._measurements.size];
                "auto" !== arguments[1] && arguments[1] ? (a ? ((s.style[n._measurements.dimension] = t + "%"), (s._sizeBeforeCollapse = (t * r) / 100)) : (s.style[n._measurements.dimension] = (s._sizeBeforeCollapse = t || 0) + "px")) : ((s.style[n._measurements.dimension] = arguments[1]), (s._sizeBeforeCollapse = s[n._measurements.size])), s._validateSize();
                const i = e - s._sizeBeforeCollapse;
                if ((s._originalSize && (s._originalSize = a ? t + "%" : s._sizeBeforeCollapse), n.hasAttribute("orientation-change"))) break;
                const o = n._items[n._items.length - 1];
                if (s === o) {
                  let e = n._items.find((e) => e !== s && !e.collapsed && !e.locked && !e.size);
                  if (!e)
                    for (let t = Math.max(0, n._items.length - 2); t >= 0; t--)
                      if (!n._items[t].collapsed && !n._items[t].locked && n._items[t] !== s) {
                        e = n._items[t];
                        break;
                      }
                  e && (e.style[n._measurements.dimension] = (e._sizeBeforeCollapse = Math.max(0, e[n._measurements.size] + i)) + "px");
                }
                break;
              }
              case "min":
                if (((t = a ? (t * r) / 100 : t), (s._sizeLimits.minWidth = s._sizeLimits.minHeight = t), (s.style[n._measurements.minDimension] = s.collapsed || !t ? "" : a ? o(t) + "%" : t + "px"), (s.style["min" + n._measurements.restricredDimension] = ""), s._validateSize(), t || n._noNeighbourValidation || n._validateNeighbourSizeLimits(s), s.size)) return void s._setSize("size", s.size, i);
                break;
              case "max":
                if (((s._sizeLimits.maxWidth = s._sizeLimits.maxHeight = a ? (t * r) / 100 : t), (s.style[n._measurements.maxDimension] = t ? (a ? o(t) + "%" : t + "px") : ""), (s.style["max" + n._measurements.restricredDimension] = ""), s._validateSize(), t || n._noNeighbourValidation || n._validateNeighbourSizeLimits(s), s.size)) return void s._setSize("size", s.size, i);
            }
            i || n._noItemSizeValidation || n._validateItemSize(!0);
          }
          _validateSize() {
            const e = this,
              t = e.closest("smart-splitter");
            if (e.collapsed && !t) return;
            const i = t._measurements,
              s = e._sizeBeforeCollapse ? e._sizeBeforeCollapse : e.getBoundingClientRect()[i.dimension];
            function n(t) {
              const n = t + "Dimension",
                a = e.style[i[n]],
                r = e._sizeLimits[i[n]];
              var o;
              (("min" === t && s < r) || ("max" === t && s > r)) && ((e.style[i.dimension] = "string" == typeof (o = a) && o.indexOf("%") > -1 ? a : r + "px"), (e._sizeBeforeCollapse = r));
            }
            e.min && n("min"), e.max && n("max");
          }
          _styleChangedEventHandler(e) {
            const t = this;
            if (t.locked) return;
            if (t._sizeLimits.ignoreUpdate) return void delete t._sizeLimits.ignoreUpdate;
            if (t.collapsed) return;
            const i = t.closest("smart-splitter");
            let s;
            e.detail.styleProperties["min-width"] ? ((s = e.detail.styleProperties["min-width"][i && "horizontal" === i.orientation ? "oldValue" : "value"]), (t._sizeLimits.minWidth = (parseFloat(s) || 0) * (s && s.indexOf("%") > -1 ? i[i._measurements.size] / 100 : 1))) : e.detail.styleProperties["max-width"] ? ((s = e.detail.styleProperties["max-width"][i && "horizontal" === i.orientation ? "oldValue" : "value"]), (t._sizeLimits.maxWidth = (parseFloat(s) || 0) * (s && s.indexOf("%") > -1 ? i[i._measurements.size] / 100 : 1))) : e.detail.styleProperties["min-height"] ? ((s = e.detail.styleProperties["min-height"][i && "horizontal" === i.orientation ? "value" : "oldValue"]), (t._sizeLimits.minHeight = (parseFloat(s) || 0) * (s && s.indexOf("%") > -1 ? i[i._measurements.size] / 100 : 1))) : e.detail.styleProperties["max-height"] && ((s = e.detail.styleProperties["max-height"][i && "horizontal" === i.orientation ? "value" : "oldValue"]), (t._sizeLimits.maxHeight = (parseFloat(s) || 0) * (s && s.indexOf("%") > -1 ? i[i._measurements.size] / 100 : 1)));
          }
          _transitionEndHandler() {
            const e = this;
            (e.isCompleted || !e.$.hasClass("animate")) && (e.$.removeClass("animate"), e._neighbourItem && e._neighbourItem.$.hasClass("animate") && e._neighbourItem.$.removeClass("animate"), (e.size + "").indexOf("%") > -1 || (e._neighbourItem && (e._neighbourItem.size + "").indexOf("%") > -1)) && ((e.shadowRoot && e.getRootNode() ? e.getRootNode().host : null) || e.closest("smart-splitter"))._validateItemSize();
          }
          _updateNearSplitterBars() {
            const e = this;
            e.previousElementSibling instanceof Smart.SplitterBar && (e.previousElementSibling.showFarButton = e.collapsible), e.nextElementSibling instanceof Smart.SplitterBar && (e.nextElementSibling.showNearButton = e.collapsible);
          }
        }
      ),
        Smart(
          "smart-splitter-bar",
          class extends Smart.BaseElement {
            static get properties() {
              return { showNearButton: { value: !1, type: "boolean" }, showFarButton: { value: !1, type: "boolean" }, itemCollapsed: { value: !1, type: "boolean" }, locked: { value: !1, type: "boolean" } };
            }
            get enableShadowDOM() {
              return !1;
            }
            template() {
              return '<div id="container" role="presentation">\n                    <div class="smart-splitter-far-collapse-button" id="farCollapseButton" role="button" aria-label="Collapse next">\n                        <span id="arrowNear" class="smart-arrow" aria-hidden="true"></span>\n                    </div>\n                    <div class="smart-splitter-resize-button" id="resizeButton" aria-hidden="true">\n                        <span></span>\n                    </div>\n                    <div class="smart-splitter-near-collapse-button" id="nearCollapseButton" role="button" aria-label="Collapse previous">\n                        <span id="arrowFar" class="smart-arrow" aria-hidden="true"></span>\n                    </div>\n                </div>';
            }
            static get listeners() {
              return { mouseenter: "_mouseEventsHandler", mouseleave: "_mouseEventsHandler", mouseover: "_mouseEventsHandler", mouseout: "_mouseEventsHandler", focus: "_focusEventHandler", blur: "_focusEventHandler" };
            }
            propertyChangedHandler(e, t, i) {
              const s = this;
              switch (e) {
                case "unfocusable":
                  s._setFocusable();
                  break;
                default:
                  super.propertyChangedHandler(e, t, i);
              }
            }
            ready() {
              super.ready();
              const e = this;
              e.setAttribute("role", "separator"), e.setAttribute("aria-label", "Resize"), e._setFocusable();
            }
            hide() {
              const e = this,
                t = e.closest("smart-splitter");
              if ((e.$.addClass("smart-hidden"), t)) {
                const i = t.items;
                if (t.hasAnimation) {
                  let t;
                  for (let s = 0; s < i.length; s++)
                    i[s].$.hasClass("animate") &&
                      ((t = !0),
                      i[s].addEventListener(
                        "transitionend",
                        function () {
                          e.closest("smart-splitter")._autoFitItems();
                        },
                        { once: !0 }
                      ));
                  if (t) return;
                }
                t._autoFitItems();
              }
            }
            show() {
              const e = this,
                t = e.closest("smart-splitter");
              if ((e.$.removeClass("smart-hidden"), t)) {
                const i = t.items;
                if (t.hasAnimation) {
                  let t;
                  for (let s = 0; s < i.length; s++)
                    i[s].$.hasClass("animate") &&
                      ((t = !0),
                      i[s].addEventListener(
                        "transitionend",
                        function () {
                          e.closest("smart-splitter")._validateItemSize();
                        },
                        { once: !0 }
                      ));
                  if (t) return;
                }
                t._validateItemSize();
              }
            }
            lock() {
              const e = this;
              (e.locked = e.unfocusable = !0), e.showNearButton || e.showFarButton || e._setFocusable();
            }
            unlock() {
              const e = this;
              (e.locked = e.unfocusable = !1), e._setFocusable();
            }
            _focusEventHandler(e) {
              "focus" === e.type ? this.setAttribute("focus", "") : this.removeAttribute("focus");
            }
            _setFocusable() {
              const e = this;
              e.disabled || e.unfocusable ? e.removeAttribute("tabindex") : (e.tabIndex = e.tabIndex > 0 ? e.tabIndex : 0);
            }
            _handleHoveredState(e, t) {
              const i = this;
              switch (t) {
                case "mouseenter":
                  if (!e._getTargetItem(i, "previousElementSibling") || !("adjacent" === e.resizeMode ? e._getTargetItem(i, "nextElementSibling") : e._getTargetItem(i, "previousElementSibling", !0))) return;
                  i.setAttribute("hover", "");
                  break;
                case "mouseleave":
                  i.removeAttribute("hover");
              }
            }
            _mouseEventsHandler(e) {
              const t = this,
                i = t.closest("smart-splitter") || t.getRootNode().host;
              (i && i.disabled) || Smart.Utilities.Core.isMobile || ("mouseenter" !== e.type && "mouseleave" !== e.type ? (e.target.closest(".smart-splitter-far-collapse-button") !== t.$.farCollapseButton ? (e.target.closest(".smart-splitter-near-collapse-button") !== t.$.nearCollapseButton ? e.target.closest(".smart-splitter-resize-button") === t.$.resizeButton && ("mouseover" === e.type ? t.$.resizeButton.setAttribute("hover", "") : t.$.resizeButton.removeAttribute("hover")) : "mouseover" === e.type ? t.$.nearCollapseButton.setAttribute("hover", "") : t.$.nearCollapseButton.removeAttribute("hover")) : "mouseover" === e.type ? t.$.farCollapseButton.setAttribute("hover", "") : t.$.farCollapseButton.removeAttribute("hover")) : t._handleHoveredState(i, e.type));
            }
          }
        ),
        Smart(
          "smart-splitter",
          class extends Smart.ContentElement {
            static get properties() {
              return { autoFitMode: { allowedValues: ["end", "proportional", "overflow"], value: "proportional", type: "string" }, dataSource: { value: null, type: "object?", reflectToAttribute: !1 }, orientation: { allowedValues: ["horizontal", "vertical"], value: "vertical", type: "string" }, keepProportionsOnResize: { value: !1, type: "boolean" }, resizeMode: { allowedValues: ["none", "adjacent", "end", "proportional"], value: "adjacent", type: "string" }, resizeStep: { value: 5, type: "number" }, liveResize: { value: !1, type: "boolean" }, messages: { extend: !0, value: { en: { invalidIndex: '{{elementType}}: "{{method}}" method accepts an index of type number.', indexOutOfBound: '{{elementType}}: Out of bound index/indexes in "{{method}}" method.', invalidNode: '{{elementType}}: "{{method}}" method accepts an object or an array of objects as it\'s second parameter.', invalidSettings: '{{elementType}}: "{{method}}" method accepts a string or an object as it\'s second parameter.', invalidType: '{{elementType}}: "{{propertyName}}" must be of type string or number.' } }, type: "object" } };
            }
            static get listeners() {
              return { focus: "_focusHandler", blur: "_focusHandler", down: "_downHandler", move: "_moveHandler", "document.dragstart": "_dragStartHandler", "document.move": "_documentMoveHandler", "document.up": "_documentUpHandler", keydown: "_keyDownHandler", resize: "_resizeEventHandler" };
            }
            get enableShadowDOM() {
              const e = this,
                t = Smart.EnableShadowDOM;
              return e._isInShadowDOM ? !e._isInShadowDOM : e.isCompleted ? null !== e.shadowRoot : t;
            }
            static get styleUrls() {
              return ["smart.button.css", "smart.splitter.css"];
            }
            template() {
              return '<div id="container" role="presentation">\n                    <content></content>\n                </div>';
            }
            propertyChangedHandler(e, t, i) {
              const s = this;
              switch (e) {
                case "autoFitMode":
                  s._validateItemSize();
                  break;
                case "dataSource":
                  s._createLayout();
                  break;
                case "resizeMode":
                  delete s._dragDetails;
                  break;
                case "orientation":
                  s.bars.forEach((e) => e.setAttribute("aria-orientation", i)), s._setMeasurements(), s.setAttribute("orientation-change", "");
                  for (let e = 0; e < s._items.length; e++) {
                    const t = s._items[e];
                    t.collapsed ? ((t.style[s._measurements.dimension] = ""), (t.style[s._measurements.restricredDimension.toLowerCase()] = "100%")) : (t.size ? ((t.style[s._measurements.dimension] = ""), t._setSize("size", t.size, !0)) : (t.style[s._measurements.dimension] = t["offset" + s._measurements.restricredDimension] + "px"), (t.style[s._measurements.restricredDimension.toLowerCase()] = "100%"), t._setSize("min", t.min, !0), t._setSize("max", t.max, !0));
                  }
                  s._validateItemSize(), s.removeAttribute("orientation-change");
                  break;
                case "unfocusable":
                  s._setFocusable();
                  break;
                default:
                  super.propertyChangedHandler(e, t, i);
              }
            }
            appendChild(e) {
              const t = this;
              if (!t.isCompleted || (e instanceof HTMLElement && e.classList.contains("smart-resize-trigger-container"))) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.appendChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
              }
              e && e instanceof Smart.SplitterItem ? t.insertBefore(e, null) : t.error(t.localize("invalidNode", { elementType: t.nodeName.toLowerCase(), method: "appendChild", node: "node" }));
            }
            attached() {
              super.attached();
              const e = this;
              e.isRendered && e._validateItemSize();
            }
            collapse(e, t) {
              const i = this;
              if (("number" == typeof e && (e = i._items[e]), !e)) return;
              const s = i.closest("smart-splitter") || (i.getRootNode() && i.getRootNode().host ? i.getRootNode().host.closest("smart-splitter") : void 0);
              (e instanceof Smart.SplitterItem && s === i) || ("number" == typeof e && i._items[e]) ? e.collapse(t) : i.error(i.localize("invalidIndex", { elementType: i.nodeName.toLowerCase(), method: "collapse" }));
            }
            expand(e) {
              const t = this;
              if (("number" == typeof e && (e = t._items[e]), !e)) return;
              const i = t.closest("smart-splitter") || (t.getRootNode() && t.getRootNode().host ? t.getRootNode().host.closest("smart-splitter") : void 0);
              (e instanceof Smart.SplitterItem && i === t) || ("number" == typeof e && t._items[e]) ? e.expand() : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "expand" }));
            }
            hideBar(e) {
              const t = this;
              "number" == typeof e && (e = t.bars[e]), e instanceof Smart.SplitterBar ? e instanceof Smart.SplitterBar && (t.enableShadowDOM ? e.getRootNode().host : e.closest("smart-splitter")) === t && e.hide() : t.error(t.localize("indexOutOfBound", { elementType: t.nodeName.toLowerCase(), method: "hideBar" }));
            }
            get items() {
              if (!this.isReady) return [];
              const e = this.$.container.children;
              let t = [];
              for (let i = 0; i < e.length; i++) (e[i] instanceof Smart.SplitterItem || "smart-splitter-item" === e[i].tagName.toLowerCase()) && t.push(e[i]);
              return t;
            }
            insert(e, t) {
              const i = this;
              if (("string" == typeof t && (t = { content: t }), !t || "object" != typeof t)) return void i.error(i.localize("invalidSettings", { elementType: i.nodeName.toLowerCase(), method: "insert" }));
              if ("number" != typeof e) return void i.error(i.localize("invalidIndex", { elementType: i.nodeName.toLowerCase(), method: "insert" }));
              const s = t instanceof Smart.SplitterItem ? t : i._createItem(t);
              if (i.contains(s)) {
                if (i._items.indexOf(s) === e) return;
                i.removeChild(s);
              }
              e >= i._items.length || 0 === i._items.length ? i.appendChild(s) : i.insertBefore(s, i._items[e]);
            }
            insertBefore(e, t) {
              const i = this;
              function s() {
                const s = (function () {
                    let t = e.previousElementSibling;
                    for (; t; ) {
                      if (t instanceof Smart.SplitterItem) return t;
                      t = t.previousElementSibling;
                    }
                  })(),
                  a = i._items[0];
                if ("overflow" !== i.autoFitMode && 1 === i._items.length) {
                  const e = a.locked;
                  (a.locked = !1), a._setSize("size", a.size || "", !0), (a.locked = e);
                }
                i._resizeHostItemOnInsert(s, e, n), i._items && i._items.splice(t ? i._items.indexOf(t) : i._items.length, 0, e), s && (s.max && s._setSize("max", s.max, !0), s.min && s._setSize("min", s.min, !0)), i._validateItemSize();
              }
              if (!i.isCompleted) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.insertBefore.apply(i, e.concat(Array.prototype.slice.call(arguments)));
              }
              if (!(e && e instanceof Smart.SplitterItem)) return void i.error(i.localize("invalidNode", { elementType: i.nodeName.toLowerCase(), method: "insertBefore", node: "newNode/referenceNode" }));
              if (t && !(t instanceof Smart.SplitterItem)) return void i.error(i.localize("invalidNode", { elementType: i.nodeName.toLowerCase(), method: "insertBefore", node: "newNode/referenceNode" }));
              if (((e.style[i._measurements.restricredDimension.toLowerCase()] = "100%"), e.size)) {
                const t = "string" == typeof e.size && e.size.indexOf("%") > -1 ? "%" : "px";
                (e.style[i._measurements.dimension] = "auto" === e.size ? e.size : isNaN(parseFloat(e.size)) ? "" : parseFloat(e.size) + t), "overflow" !== i.autoFitMode && 1 === i._items.length && (i._items[0].size = "");
              } else e.style[i._measurements.dimension] = "";
              if (e._sizeBeforeCollapse)
                if (e.size) {
                  const t = "string" == typeof e.size && e.size.indexOf("%") > -1 ? "%" : "px";
                  (e.style[i._measurements.dimension] = "auto" === e.size ? e.size : isNaN(parseFloat(e.size)) ? 0 : parseFloat(e.size) + t), (e._sizeBeforeCollapse = e[i._measurements.size]);
                } else delete e._sizeBeforeCollapse;
              (e.style["max" + i._measurements.restricredDimension] = "none"), (e.style[i._measurements.maxDimension] = e._sizeLimits && e.max ? e._sizeLimits[i._measurements.maxDimension] + "px" : ""), e.collapsed ? ((e.style.minWidth = e.style.minHeight = ""), (e.style[i._measurements.minDimension] = e.style[i._measurements.dimension] = "0")) : (e.style[i._measurements.minDimension] = e._sizeLimits && e.min ? e._sizeLimits[i._measurements.minDimension] + "px" : "");
              for (let e = 0; e < i._items.length; e++) i._items[e]._sizeBeforeCollapse || (i._items[e]._sizeBeforeCollapse = i._items[e][i._measurements.size]);
              let n;
              i.$.container.insertBefore(e, t || null);
              const a = i.bars;
              e.previousElementSibling instanceof Smart.SplitterItem ? ((n = i._createBar(e, e.previousElementSibling)), i.$.container.insertBefore(n, e)) : e.nextElementSibling instanceof Smart.SplitterItem && ((n = i._createBar(e, e.nextElementSibling)), i.$.container.insertBefore(n, e.nextElementSibling)),
                n && a.length > 0 && (n.style[i._measurements.restricredDimension.toLowerCase()] = a[0].style[i._measurements.restricredDimension.toLowerCase()]),
                e.isCompleted
                  ? s()
                  : ((e.__onCompleted = e._onCompleted),
                    (e._onCompleted = function () {
                      e.__onCompleted && (e.__onCompleted(), delete e.__onCompleted), s();
                    }));
            }
            lockItem(e) {
              const t = this;
              e instanceof Smart.SplitterItem ? e.lock() : "number" == typeof e && t._items[e] ? (e = t._items[e]) && e.lock() : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "lockItem" }));
            }
            lockBar(e) {
              const t = this;
              e instanceof Smart.SplitterBar ? e.lock() : "number" == typeof e ? (e = t.bars[e]) && e.lock() : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "lockBar" }));
            }
            get hasStyleObserver() {
              return "resize";
            }
            ready() {
              super.ready();
            }
            render() {
              const e = this;
              e.setAttribute("role", "group"), (e._isInitializing = !0), e._createLayout(), delete e._isInitializing, e._setFocusable(), super.render();
            }
            refresh() {
              this._resizeEventHandler();
            }
            removeAt(e) {
              const t = this;
              e instanceof Smart.SplitterItem && e.closest("smart-splitter") === t ? t.removeChild(e) : "number" == typeof e ? (e > t._items.length || e < 0 ? t.error(t.localize("indexOutOfBound", { elementType: t.nodeName.toLowerCase(), method: "remove" })) : t.removeChild(t._items[e])) : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "remove" }));
            }
            removeAll() {
              (this._items = []), (this.$.container.innerHTML = "");
            }
            removeChild(e) {
              const t = this;
              function i(e, i, s) {
                let n = e,
                  a = t._items[n];
                for (; a && a.collapsed; ) a = t._items[(n += s)];
                return a;
              }
              if (!t.isCompleted || (e instanceof HTMLElement && e.classList.contains("smart-resize-trigger-container"))) {
                const e = Array.prototype.slice.call(arguments, 2);
                return HTMLElement.prototype.removeChild.apply(t, e.concat(Array.prototype.slice.call(arguments)));
              }
              if (!(e && e instanceof Smart.SplitterItem)) return void t.error(t.localize("invalidNode", { elementType: t.nodeName.toLowerCase(), method: "removeChild", node: "node" }));
              if (!t._items) return;
              let s = t._items.indexOf(e);
              e.collapsed ? t.$.container.removeChild(t._items.indexOf(e._neighbourItem) > s ? e.nextElementSibling : e.previousElementSibling) : e.previousElementSibling instanceof Smart.SplitterBar ? t.$.container.removeChild(e.previousElementSibling) : e.nextElementSibling instanceof Smart.SplitterBar && t.$.container.removeChild(e.nextElementSibling), t._items.splice(s, 1), (s = Math.max(0, s - 1));
              let n = 0;
              const a = t._items.filter((e) => !e.collapsed && !e.locked),
                r = e._sizeBeforeCollapse || e[t._measurements.size];
              if ((a.map((e) => (n += (e.style[t._measurements.dimension] ? e._sizeBeforeCollapse : 0) || e[t._measurements.size])), t.$.content.removeChild(e), (1 === t._items.length && t._items[0].collapsed) || (t._items.length > 0 && t._items.map((e) => e.collapsed).indexOf(!1) < 0))) {
                const e = t._items[t._items.length - 1];
                let i = e.context;
                (e.context = e), e._expand(), (e.context = i);
              }
              for (let n = 0; n < t._items.length; n++)
                if (t._items[n].collapsed && t._items[n]._neighbourItem === e) {
                  let e, a;
                  (t._items[n]._neighbourItem = i(s, t._items[n], 1)), t._items[n]._neighbourItem ? ((e = t._items[n].nextElementSibling), e && ((a = e.context), (e.context = e), (e.itemCollapsed = !0), (e.showNearButton = !(e.showFarButton = !1)), (e.context = a))) : ((t._items[n]._neighbourItem = i(s, t._items[n], -1)), (e = t._items[n].previousElementSibling), e && ((a = e.context), (e.context = e), (e.itemCollapsed = !0), (e.showFarButton = !(e.showNearButton = !1)), (e.context = a)));
                }
              if ("proportional" === t.autoFitMode) {
                let e, i, s;
                for (let o = 0; o < a.length; o++) (e = a[o]._sizeBeforeCollapse || a[o][t._measurements.size]), (i = e + r * (e / n)), (s = a[o]._sizeLimits[t._measurements.minDimension] || 0), (a[o].style[t._measurements.dimension] = (a[o]._sizeBeforeCollapse = Math.max(0, i)) + "px"), s > e && (a[o][t._measurements.minDimension] = i + "px");
              }
              t._autoFitItems();
            }
            showBar(e) {
              const t = this;
              e instanceof Smart.SplitterBar ? e.show() : "number" == typeof e ? ((e = t.bars[e]) instanceof Smart.SplitterBar ? e.show() : t.error(t.localize("indexOutOfBound", { elementType: t.nodeName.toLowerCase(), method: "showBar" }))) : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "showBar" }));
            }
            get bars() {
              if (!this.isReady) return [];
              const e = this.$.container.children;
              let t = [];
              for (let i = 0; i < e.length; i++) (e[i] instanceof Smart.SplitterBar || "smart-splitter-bar" === e[i].tagName.toLowerCase()) && t.push(e[i]);
              return t;
            }
            unlockItem(e) {
              const t = this;
              e instanceof Smart.SplitterItem ? e.unlock() : "number" == typeof e && t._items[e] ? (e = t._items[e]) && e.unlock() : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "unlockItem" }));
            }
            unlockBar(e) {
              const t = this;
              e instanceof Smart.SplitterBar ? e.unlock() : "number" == typeof e ? (e = t.bars[e]) && e.unlock() : t.error(t.localize("invalidIndex", { elementType: t.nodeName.toLowerCase(), method: "unlockBar" }));
            }
            update(e, t) {
              const i = this;
              if ("number" != typeof e || (e = i._items[e])) {
                if (e instanceof Smart.SplitterItem && t && (i.enableShadowDOM ? e.getRootNode().host : i.closest("smart-splitter")) === i) for (let i in t) void 0 !== e[i] && (e[i] = t[i]);
              } else i.error(i.localize("invalidIndex", { elementType: i.nodeName.toLowerCase(), method: "update" }));
            }
            _autoFitItems() {
              const e = this,
                t = e._items.length;
              if (0 === t || "overflow" === e.autoFitMode) return;
              let i,
                s = [],
                n = [],
                a = [];
              for (let r = t - 1; r >= 0; r--) e._items[r].collapsed ? n.push(e._items[r]) : e._items[r].locked ? s.push(e._items[r]) : i ? e._items[r].size || a.push(e._items[r]) : (i = e._items[r]);
              i && i.size && a.length > 0 && (i = a.filter((t) => !t.max && !t._sizeLimits[e._measurements.maxDimension])[0] || i), n.length === t && ((i = n[0]), i.expand(), i.unlock()), e._autoFitLastItem(i, n, s);
            }
            _autoFitLastItem(e, t, i) {
              const s = this,
                n = s._items.length;
              let a;
              if ((1 === n && s._items[0].locked && ((a = s._items[0]), (a.locked = !1)), i.length === n && i[0].unlock(), e || (e = i[0]).unlock(), 1 === s._items.length)) e._setSize("size", "100%", !0), delete e._originalSize;
              else {
                const t = "offset" + ("width" === s._measurements.dimension ? "Width" : "Height");
                let i = 0,
                  n = 0;
                s._items.map((e) => (i += e.collapsed ? 0 : e.style[s._measurements.dimension] && e.style[s._measurements.dimension].indexOf("%") < -1 && e._sizeBeforeCollapse ? e._sizeBeforeCollapse : e[t])), s.bars.map((e) => (n += e[s._measurements.size]));
                const a = i + n,
                  r = s.$.container[t];
                if (a !== r) {
                  let i;
                  i = e.style[s._measurements.dimension].indexOf("%") < -1 && e._sizeBeforeCollapse ? e._sizeBeforeCollapse : e[t];
                  let n = Math.abs(r - a),
                    o = a < r ? 1 : -1;
                  const l = Math.max(0, i + o * n);
                  (e.style[s._measurements.dimension] = (e._sizeBeforeCollapse = l) + "px"), delete e._originalSize, s._validateItemLimits(e, l);
                }
              }
              a && (a.locked = !0);
            }
            _validateItemLimits(e, t) {
              const i = this,
                s = i.$.container.getBoundingClientRect()[i._measurements.dimension];
              let n, a, r;
              (r = e._min || e.min), r && ((n = "string" == typeof r && r.indexOf("%") > -1), (a = n ? (parseFloat(r) * s) / 100 : parseFloat(r)), a > t ? ((e.style[i._measurements.minDimension] = n ? (100 * t) / s + "%" : t + "px"), (e._sizeLimits[i._measurements.minDimension] = t), (e._min = r), e.set("min", e.style[i._measurements.minDimension])) : a < t && ((e.style[i._measurements.minDimension] = n ? (100 * a) / s + "%" : a + "px"), (e._sizeLimits[i._measurements.minDimension] = a), e.set("min", r), delete e._min)), (r = e._max || e.max), r && ((n = "string" == typeof r && r.indexOf("%") > -1), (a = n ? (parseFloat(r) * s) / 100 : parseFloat(r)), a < t ? ((e.style[i._measurements.maxDimension] = n ? (100 * t) / s + "%" : t + "px"), (e._sizeLimits[i._measurements.maxDimension] = t), (e._max = r), e.set("max", e.style[i._measurements.maxDimension])) : a > t && ((e.style[i._measurements.maxDimension] = n ? (100 * a) / s + "%" : a + "px"), (e._sizeLimits[i._measurements.maxDimension] = a), e.set("max", r), delete e._max));
            }
            _autoFitItemsProportionally(e, t) {
              const i = this,
                s = i._items.filter((e) => !e.collapsed && !e.locked);
              let n,
                a,
                r,
                o = e[i._measurements.size],
                l = 0;
              if ((s.map((e) => (l += e._sizeBeforeCollapse || e[i._measurements.size])), t && (l -= t[i._measurements.size]), e.size && !e.isCompleted && (e._setSize("size", o), (o = e._sizeBeforeCollapse)), (o = Math.min(i.$.container[i._measurements.size] / 2, e[i._measurements.size])), "string" == typeof e.size && e.size.indexOf("%") > -1)) {
                const t = i.$.container.getBoundingClientRect()[i._measurements.dimension];
                (e._sizeBeforeCollapse = o), (e.style[i._measurements.dimension] = (100 * o) / t + "%");
              } else e.style[i._measurements.dimension] = (e._sizeBeforeCollapse = o) + "px";
              for (let e = 0; e < s.length; e++) (n = s[e]._sizeBeforeCollapse || s[e][i._measurements.size]), (a = (n / l) * (l - o)), (r = s[e]._sizeLimits[i._measurements.minDimension] || 0), (s[e].style[i._measurements.dimension] = (s[e]._sizeBeforeCollapse = Math.max(r, a)) + "px"), delete s[e]._originalSize;
            }
            _createLayout() {
              const e = this;
              if (((e._items = []), "string" == typeof e.dataSource && (e.dataSource = JSON.parse(e.dataSource)), null !== e.dataSource && Array.isArray(e.dataSource))) {
                e.$.container.innerHTML = "";
                let t,
                  i = document.createDocumentFragment();
                for (let s = 0; s < e.dataSource.length; s++) (t = e._createItem(e.dataSource[s])), i.appendChild(t);
                e._handleSplitterBars(i);
              } else e._handleSplitterBars(e.$.container);
            }
            _createBar(e, t) {
              const i = this,
                s = document.createElement("smart-splitter-bar");
              return e.collapsed ? ((s.itemCollapsed = !0), i._items.indexOf(e) === i._items.length - 1 ? (s.showNearButton = !0) : (s.showFarButton = !0)) : (e.collapsible && (s.showNearButton = !0), t && t instanceof Smart.SplitterItem && t.collapsible && (t === e.nextElementSibling ? (s.showFarButton = !0) : (s.showNearButton = !0))), s.setAttribute("aria-controls", e.id + (t ? " " + t.id : "")), s.setAttribute("aria-orientation", i.orientation), s;
            }
            _createItem(e) {
              const t = document.createElement("smart-splitter-item");
              return e.id && (t.id = e.id), (t.innerHTML = e.content || ""), (t.collapsible = e.collapsible || !1), (t.collapsed = e.collapsed || !1), (t.locked = e.locked || !1), e.max && (t.max = e.max), e.min && (t.min = e.min), e.size && (t.size = e.size), t;
            }
            _completeResizing(e) {
              const t = this;
              if (t._dragDetails) {
                if (t._splitBarDummy && t._splitBarDummy.parentElement) {
                  if (!e)
                    if (((t._dragDetails.firstItem.style[t._measurements.dimension] = (t._dragDetails.firstItem._sizeBeforeCollapse = t._dragDetails.firstItem.currentSize + t._dragDetails.firstItem._paddings) + "px"), delete t._dragDetails.firstItem._originalSize, "proportional" !== t.resizeMode)) (t._dragDetails.secondItem.style[t._measurements.dimension] = (t._dragDetails.secondItem._sizeBeforeCollapse = t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize + t._dragDetails.secondItem._paddings) + "px"), delete t._dragDetails.secondItem._originalSize;
                    else {
                      const e = t._dragDetails.itemProportions.length;
                      if (e > 1) for (let i = 0; i < e; i++) (t._dragDetails.itemProportions[i].item.style[t._measurements.dimension] = (t._dragDetails.itemProportions[i].item._sizeBeforeCollapse = t._dragDetails.itemProportions[i].currentSize + t._dragDetails.itemProportions[i].item._paddings) + "px"), delete t._dragDetails.itemProportions[i]._originalSize;
                      else (t._dragDetails.secondItem[0].style[t._measurements.dimension] = (t._dragDetails.secondItem[0]._sizeBeforeCollapse = Math.floor(t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize + t._dragDetails.firstItem._paddings)) + "px"), delete t._dragDetails.secondItem[0]._originalSize;
                    }
                  t._validateBarsSize(), t.$.fireEvent("resizeEnd", { firstItem: { index: t._items.indexOf(t._dragDetails.firstItem), oldSize: t._dragDetails.firstItem.originalSize, newSize: t._dragDetails.firstItem[t._measurements.size] }, secondItem: Array.isArray(t._dragDetails.secondItem) ? { index: t._dragDetails.secondItem.map((e) => t._items.indexOf(e)), oldSize: t._dragDetails.secondItem.map((e) => e.originalSize), newSize: t._dragDetails.secondItem.map((e) => e[t._measurements.size]) } : { index: t._items.indexOf(t._dragDetails.secondItem), oldSize: t._dragDetails.secondItem.originalSize, newSize: t._dragDetails.secondItem[t._measurements.size] } }), t._splitBarDummy.classList.remove("limit-reached"), t._splitBarDummy.parentElement.removeChild(t._splitBarDummy);
                }
                t.removeAttribute("dragged"), delete t._dragDetails, delete t._keyboardResizing;
              }
            }
            _dragStartHandler(e) {
              this._dragDetails && e.preventDefault();
            }
            _downHandler(e) {
              const t = this;
              if ((e.stopPropagation(), t.disabled)) return;
              if (t._keyboardResizing) return void t._completeResizing();
              const i = t.shadowRoot || t.isInShadowDOM ? e.originalEvent.composedPath()[0] : e.originalEvent.target;
              let s = i.closest("smart-splitter");
              s || (s = i.getRootNode() && i.getRootNode().host ? i.getRootNode().host.closest("smart-splitter") : void 0);
              const n = i && i.closest ? i.closest("smart-splitter-bar") : null;
              if (n && s === t) {
                if (i.closest(".smart-splitter-near-collapse-button") === n.$.nearCollapseButton) return void (t._collapseButtonPressed = { splitBar: n, item: n.previousElementSibling, target: n.$.nearCollapseButton, farCollapse: !1 });
                if (i.closest(".smart-splitter-far-collapse-button") === n.$.farCollapseButton) return void (t._collapseButtonPressed = { splitBar: n, item: n.nextElementSibling, target: n.$.farCollapseButton, farCollapse: !0 });
                n.itemCollapsed || n.locked || "none" === t.resizeMode || t._setDragDetails(n, e);
              }
            }
            _moveHandler() {
				try {this.hasAttribute("dragged") && Smart.Utilities.Core.isMobile && event.originalEvent.preventDefault();} catch {}
              
            }
            _documentMoveHandler(e) {
              const t = this;
              t._keyboardResizing || t.disabled || t._resize(e);
            }
            _documentUpHandler(e) {
              const t = this;
              if ((t.removeAttribute("dragging-not-allowed"), t.removeAttribute("show-locked-items"), t.disabled)) return delete t._dragDetails, void delete t._collapseButtonPressed;
              const i = t.shadowRoot || t.isInShadowDOM ? e.originalEvent.composedPath()[0] : e.originalEvent.target;
              return t._completeResizing(), t._collapseButtonPressed && i.closest("." + t._collapseButtonPressed.target.classList[0]) === t._collapseButtonPressed.target ? (t._collapseButtonPressed.item.collapsed ? t.expand(t._collapseButtonPressed.item) : t.collapse(t._collapseButtonPressed.item, t._collapseButtonPressed.farCollapse), void delete t._collapseButtonPressed) : void 0;
            }
            _ensureItemsReady(e, t) {
              const i = this,
                s = function () {
                  const i = function (t) {
                    for (let i = 0; i < e.length; i++) e[i].context = "node" === t ? e[i] : document;
                  };
                  i("node"), t(), i();
                };
              if (0 === e.length) s();
              else {
                i._nodesReadyListeners = 0;
                for (let t = 0; t < e.length; t++) {
                  const n = e[t],
                    a = function () {
                      i._nodesReadyListeners--, 0 === i._nodesReadyListeners && (s(), delete i._nodesReadyListeners);
                    }.bind(i);
                  n.isCompleted || (i._nodesReadyListeners++, (n._onCompleted = a));
                }
                0 === i._nodesReadyListeners && s();
              }
            }
            _focusHandler(e) {
              "focus" === e.type ? this.setAttribute("focus", "") : this.removeAttribute("focus");
            }
            _getTargetItem(e, t, i) {
              const s = this;
              let n = i ? s._items[s._items.length - 1] : e[t];
              for (; n; ) {
                if (n instanceof Smart.SplitterItem && !n.collapsed) {
                  if (!n.locked) return n;
                  s._dragDetails && !s._dragDetails.firstItem && (s._dragDetails.lockedItemsSize += n[s._measurements.size] + (n.previousElementSibling instanceof Smart.SplitterBar ? n.previousElementSibling[s._measurements.size] : 0));
                }
                n = n[t];
              }
            }
            _handleSplitterBars(e) {
              const t = this;
              if ((t._items.length < 1 && (t._items = e.parentElement ? t.items : Array.from(e.children)), t._measurements || t._setMeasurements(), t._items.length < 2)) {
                const i = t.bars;
                for (let t = 0; t < i.length; t++) e.removeChild(i[t]);
              }
              let i;
              (t._noItemSizeValidation = !0), e.parentElement || e === t.$.container || (t.$.container.appendChild(e), (e = t.$.container)), (t._noItemSizeValidation = !1);
              for (let s = 0; s < t._items.length; s++) {
                if (((i = t._items[s]), 0 === s)) for (; e.firstElementChild && e.firstElementChild !== i; ) e.removeChild(e.firstElementChild);
                (i.style[t._measurements.restricredDimension.toLowerCase()] = "100%"), (i.style["max" + t._measurements.restricredDimension] = "none"), i.size || (i.style[t._measurements.dimension] = i._sizeBeforeCollapse ? i._sizeBeforeCollapse + "px" : "");
                const n = i.min,
                  a = i.max;
                if (("string" == typeof n && n.indexOf("%") > -1 && i._setSize("min", n), "string" == typeof a && a.indexOf("%") > -1 && i._setSize("max", a), (i.style[t._measurements.maxDimension] = i.max ? i._sizeLimits[t._measurements.maxDimension] + "px" : ""), i.nextElementSibling)) {
                  let e = i.nextElementSibling;
                  if (e instanceof Smart.SplitterItem || "smart-splitter-item" === e.tagName.toLowerCase()) i.parentNode.insertBefore(t._createBar(i, i.nextElementSibling), i.nextElementSibling);
                  else for ((e instanceof Smart.SplitterBar || "smart-splitter-bar" === e.tagName.toLowerCase()) && (e = e.nextElementSibling); e && (!(e instanceof Smart.SplitterItem) || "smart-splitter-item" !== e.tagName.toLowerCase()); ) e.parentNode.removeChild(e), (e = e.nextElementSibling);
                }
                if (i.collapsed) {
                  const e = i.collapsible;
                  (i.style.minWidth = i.style.minHeight = ""), (i.style[t._measurements.minDimension] = "0"), (i._ignorePropertyValue = !0), (i.collapsible = !0), i.collapse(), (i.collapsible = e);
                } else i.style[t._measurements.minDimension] = i._sizeLimits && i.min ? i._sizeLimits[t._measurements.minDimension] + "px" : "";
              }
              if (i) for (; e.lastElementChild !== i; ) e.removeChild(e.lastElementChild);
              t._ensureItemsReady(t._items, t._validateItemSize.bind(t));
            }
            _keyDownHandler(e) {
              const t = this;
              if (t.disabled) return;
              let i = t.enableShadowDOM ? t.shadowRoot.activeElement : document.activeElement;
              if ("w" === e.key && e.altKey) {
                e.preventDefault();
                const s = t.enableShadowDOM ? t.shadowRoot.querySelector("smart-splitter-bar") : t.querySelector("smart-splitter-bar");
                return i !== s && t._completeResizing(!0), void s.focus();
              }
              if (!e.ctrlKey && t._splitBarDummy && t._splitBarDummy.parentElement) i = t._splitBarDummy;
              else if (!(i instanceof Smart.SplitterBar)) return;
              if ((t.enableShadowDOM ? i.getRootNode().host : i.closest("smart-splitter")) === t)
                switch (e.key) {
                  case "ArrowLeft":
                  case "ArrowRight":
                  case "ArrowUp":
                  case "ArrowDown": {
                    if (("ArrowUp" === e.key || "ArrowDown" === e.key) && "vertical" === t.orientation) return;
                    if (("ArrowLeft" === e.key || "ArrowRight" === e.key) && "horizontal" === t.orientation) return;
                    e.preventDefault();
                    const s = "ArrowLeft" === e.key || "ArrowUp" === e.key ? -1 : 1;
                    if (e.ctrlKey) {
                      let e, n;
                      return t._completeResizing(!0), s < 0 ? ((n = i.previousElementSibling), (e = i.nextElementSibling)) : ((e = i.previousElementSibling), (n = i.nextElementSibling)), void (e.collapsed ? e.expand() : n.collapse(s > 0));
                    }
                    if (i.locked) return;
                    if ("none" === t.resizeMode) return;
                    let n;
                    (t._keyboardResizing = !0), t._dragDetails ? (n = t._dragDetails.position + s * t.resizeStep) : (t._setDragDetails(i), (n = i[t._measurements.offset] + s * t.resizeStep)), t._resize({ pageX: n, pageY: n });
                    break;
                  }
                  case "Enter":
                    t._completeResizing();
                    break;
                  case "Escape":
                  case "Tab":
                    t._completeResizing(!0);
                }
            }
            _mouseEventsHandler(e) {
              "mouseenter" !== e.type || Smart.Utilities.Core.isMobile ? this.removeAttribute("hover") : this.setAttribute("hover", "");
            }
            _recalcItemSize(e, t, i) {
              const s = this;
              let n, a;
              if ((i || (i = t), e > 0)) for (let r = 0; r < t; r++) (a = s._dragDetails.itemProportions[r].item._sizeLimits[s._measurements.minDimension]), s._dragDetails.itemProportions[r].currentSize > a && ((n = s._dragDetails.itemProportions[r].currentSize - a < e / i ? s._dragDetails.itemProportions[r].currentSize - a : e / i), (e -= n), (s._dragDetails.itemProportions[r].currentSize = Math.max(a, s._dragDetails.itemProportions[r].currentSize - n)), delete s._dragDetails.itemProportions[r]._originalSize), (i = Math.max(1, i - 1));
              else {
                const a = s._dragDetails.splitAreaSize - s._dragDetails.firstItem.currentSize - (t > 1 ? s._dragDetails.secondItemTotalMinSize - s._dragDetails.itemProportions[0].item._sizeLimits[s._measurements.minDimension] : 0);
                let r;
                for (let o = 0; o < t; o++) (r = s._dragDetails.itemProportions[o].item._sizeLimits[s._measurements.maxDimension] ? Math.min(s._dragDetails.itemProportions[o].item._sizeLimits[s._measurements.maxDimension], a) : a), s._dragDetails.itemProportions[o].currentSize < r && ((n = s._dragDetails.itemProportions[o].currentSize - e / i > r ? -1 * (r - s._dragDetails.itemProportions[o].currentSize) : e / i), (e -= n), (s._dragDetails.itemProportions[o].currentSize = Math.min(r, s._dragDetails.itemProportions[o].currentSize - n)), delete s._dragDetails.itemProportions[o]._originalSize), (i = Math.max(1, i - 1));
              }
              Math.abs(e) > 0.1 && s._recalcItemSize(e, t, i);
            }
            _resize(e) {
              const t = this;
              if (!t._dragDetails) return;
              let i,
                s = e[t._measurements.pagePosition] - t._dragDetails.position;
              const n = Math.sign(s),
                a = t._dragDetails.firstItem._sizeLimits[t._measurements.minDimension],
                r = t._dragDetails.firstItem._sizeLimits[t._measurements.maxDimension];
              let o, l;
              if ((t.hasAttribute("dragged") || t.$.fireEvent("resizeStart", { firstItem: { index: t._items.indexOf(t._dragDetails.firstItem), size: t._dragDetails.firstItem[t._measurements.size] }, secondItem: Array.isArray(t._dragDetails.secondItem) ? { index: t._dragDetails.secondItem.map((e) => t._items.indexOf(e)), size: t._dragDetails.secondItem.map((e) => e[t._measurements.size]) } : { index: t._items.indexOf(t._dragDetails.secondItem), size: t._dragDetails.secondItem[t._measurements.size] } }), t.setAttribute("dragged", ""), Math.abs(s) < t.resizeStep)) return;
              let m = Math.max(t.resizeStep, Math.floor(Math.abs(s) / t.resizeStep) * t.resizeStep);
              const d = s - n * m;
              switch (t.resizeMode) {
                case "adjacent":
                case "end":
                  for (n > 0 ? ((o = t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize), (l = () => o - t._dragDetails.secondItemTotalMinSize >= m || (r && t._dragDetails.firstItem.currentSize + t.resizeStep <= r)), (i = () => (r && t._dragDetails.firstItem.currentSize === r) || o - t.resizeStep <= t._dragDetails.secondItemTotalMinSize)) : ((o = t._dragDetails.firstItem.currentSize), (l = () => o - a >= m || (t._dragDetails.secondItemTotalMaxSize && t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize + t.resizeStep <= t._dragDetails.secondItemTotalMaxSize)), (i = () => (t._dragDetails.secondItemTotalMaxSize && t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize === t._dragDetails.secondItemTotalMaxSize) || o - t.resizeStep <= a)), s = 0; m > 0; ) l() && (s += n * t.resizeStep), (m -= t.resizeStep);
                  t._resizeItem(e, s, d);
                  break;
                case "proportional": {
                  const s = t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize;
                  let _, p;
                  for (n > 0 ? ((o = Math.abs(s - t._dragDetails.secondItemTotalMinSize)), (l = () => o >= m || (r && t._dragDetails.firstItem.currentSize + t.resizeStep <= r)), (i = () => (r && t._dragDetails.firstItem.currentSize === r) || t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize - t.resizeStep < t._dragDetails.secondItemTotalMinSize)) : ((o = t._dragDetails.firstItem.currentSize), (l = () => o - a >= m && (!t._dragDetails.secondItemTotalMaxSize || t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize + t.resizeStep <= t._dragDetails.secondItemTotalMaxSize)), (i = () => (t._dragDetails.secondItemTotalMaxSize && t._dragDetails.splitAreaSize + t.resizeStep - t._dragDetails.firstItem.currentSize >= t._dragDetails.secondItemTotalMaxSize) || t._dragDetails.firstItem.currentSize - t.resizeStep < a)); m > 0; ) l() && ((p = !0), (_ = Math.min(r ? Math.min(r, t._dragDetails.splitAreaSize - t._dragDetails.secondItemTotalMinSize) : t._dragDetails.splitAreaSize - t._dragDetails.secondItemTotalMinSize, Math.max(a, t._dragDetails.firstItem.currentSize + n * t.resizeStep))), (t._dragDetails.firstItem.currentSize = t._dragDetails.firstItem._sizeBeforeCollapse = Math.floor(_))), (m -= t.resizeStep);
                  if (!p) break;
                  const c = t._dragDetails.splitAreaSize - t._dragDetails.firstItem.currentSize,
                    u = t._dragDetails.itemProportions.length;
                  if ((t._recalcItemSize(s - c, u), t.liveResize))
                    if (((t._dragDetails.firstItem.style[t._measurements.dimension] = t._dragDetails.firstItem.currentSize + t._dragDetails.firstItem._paddings + "px"), u > 1)) for (let e = 0; e < u; e++) t._dragDetails.itemProportions[e].item.style[t._measurements.dimension] = t._dragDetails.itemProportions[e].item._sizeBeforeCollapse = t._dragDetails.itemProportions[e].currentSize + t._dragDetails.itemProportions[e].item._paddings + "px";
                    else t._dragDetails.secondItem[0].style[t._measurements.dimension] = (t._dragDetails.secondItem[0]._sizeBeforeCollapse = Math.floor(c + t._dragDetails.itemProportions[0].item._paddings)) + "px";
                  else t._splitBarDummy.style[t._measurements.position] = t._dragDetails.firstItem[t._measurements.offset] + t._dragDetails.firstItem.currentSize + t._dragDetails.lockedItemsSize + t._dragDetails.firstItem._paddings + "px";
                  const g = t._dragDetails.firstItem.getBoundingClientRect()["vertical" === t.orientation ? "left" : "top"] + t._dragDetails.splitBarOffset,
                    f = r && t._dragDetails.splitAreaSize - r > t._dragDetails.secondItemTotalMinSize ? r : t._dragDetails.splitAreaSize - t._dragDetails.secondItemTotalMinSize;
                  t._dragDetails.position = Math.max(g + (t._dragDetails.secondItemTotalMaxSize ? Math.max(t._dragDetails.splitAreaSize - t._dragDetails.secondItemTotalMaxSize, a) : a) + t._dragDetails.lockedItemsSize + t._dragDetails.firstItem._paddings, Math.min(g + f + t._dragDetails.lockedItemsSize + t._dragDetails.firstItem._paddings, e[t._measurements.pagePosition] - d));
                  break;
                }
              }
              t.liveResize || (i() ? t._splitBarDummy.classList.add("limit-reached") : t._splitBarDummy.classList.remove("limit-reached")), t._validateBarsSize();
            }
            _resizeEventHandler(e) {
              const t = this;
              if (t._items) {
                if (e && (t.enableShadowDOM ? e.composedPath()[0] : e.target) !== t) return;
                (t._resizeEventFired = !0), t._validateItemSize(), (t._resizeEventFired = !1);
              }
            }
            _resizeHostItemOnInsert(e, t, i) {
              const s = this;
              if ("proportional" === s.autoFitMode) return void s._autoFitItemsProportionally(t, i);
              if (!e || e.locked || "overflow" === s.autoFitMode) return;
              t.size &&
                (e =
                  (function () {
                    let e = t.previousElementSibling;
                    for (; e; ) {
                      if (e instanceof Smart.SplitterItem && !e.size) return e;
                      e = e.previousElementSibling;
                    }
                  })() || e);
              const n = e[s._measurements.size] - t[s._measurements.size] - i[s._measurements.size],
                a = Math.max(e._sizeLimits[s._measurements.minDimension], n);
              e.style[s._measurements.maxDimension] = e.max ? (isNaN(parseFloat(e.max)) ? "" : parseFloat(e.max) + typeof e.max == "string" && e.max.indexOf("%") > -1 ? "%" : "px") : "";
              const r = e.style[s._measurements.maxDimension] ? parseFloat(e.style[s._measurements.maxDimension]) : 0;
              t.size ? (e.style[s._measurements.dimension] = (e._sizeBeforeCollapse = r ? Math.min(r, a) : a) + "px") : ((e.style[s._measurements.dimension] = e.size ? ("auto" === e.size ? e.size : isNaN(parseFloat(e.size)) ? 0 : parseFloat(e.size) + ("string" == typeof e.size && e.size.indexOf("%") > -1 ? "%" : "px")) : ""), (e._sizeBeforeCollapse = e[s._measurements.size]));
            }
            _resizeItem(e, t, i) {
              const s = this;
              let n = Math.max(s._dragDetails.firstItem._sizeLimits[s._measurements.minDimension] || 0, Math.min(s._dragDetails.splitAreaSize - s._dragDetails.secondItem._sizeLimits[s._measurements.minDimension], s._dragDetails.firstItem._sizeLimits[s._measurements.maxDimension] ? Math.min(s._dragDetails.firstItem._sizeLimits[s._measurements.maxDimension], s._dragDetails.firstItem.currentSize + t) : s._dragDetails.firstItem.currentSize + t)),
                a = s._dragDetails.firstItem._sizeLimits[s._measurements.minDimension] || 0;
              s._dragDetails.secondItem._sizeLimits[s._measurements.maxDimension] && s._dragDetails.splitAreaSize - n > s._dragDetails.secondItem._sizeLimits[s._measurements.maxDimension] && (a = n = s._dragDetails.splitAreaSize - (s._dragDetails.secondItem._sizeLimits[s._measurements.maxDimension] || 0)), (s._dragDetails.firstItem.currentSize = n), s.liveResize ? ((s._dragDetails.firstItem.style[s._measurements.dimension] = (s._dragDetails.firstItem._sizeBeforeCollapse = n + s._dragDetails.firstItem._paddings) + "px"), (s._dragDetails.secondItem.style[s._measurements.dimension] = (s._dragDetails.secondItem._sizeBeforeCollapse = s._dragDetails.splitAreaSize - n + s._dragDetails.firstItem._paddings) + "px"), delete s._dragDetails.firstItem._originalSize, delete s._dragDetails._originalSize) : (s._splitBarDummy.style[s._measurements.position] = s._dragDetails.firstItem[s._measurements.offset] + n + s._dragDetails.lockedItemsSize + s._dragDetails.firstItem._paddings + "px");
              const r = s._dragDetails.firstItem.getBoundingClientRect()["vertical" === s.orientation ? "left" : "top"] + s._dragDetails.splitBarOffset;
              (s._dragDetails.position = Math.max(r + a + s._dragDetails.firstItem._paddings, Math.min(r + s._dragDetails.splitAreaSize - (s._dragDetails.secondItem._sizeLimits[s._measurements.minDimension] || 0) + s._dragDetails.lockedItemsSize + s._dragDetails.firstItem._paddings, e[s._measurements.pagePosition] - i))), s._dragDetails.firstItem._sizeLimits[s._measurements.maxDimension] && (s._dragDetails.position = Math.min(r + s._dragDetails.firstItem._sizeLimits[s._measurements.maxDimension], s._dragDetails.position));
            }
            _setFocusable() {
              const e = this;
              e.disabled || e.unfocusable ? e.removeAttribute("tabindex") : (e.tabIndex = e.tabIndex > 0 ? e.tabIndex : 0);
            }
            _setDragDetails(e, t) {
              const i = this;
              if (((i._dragDetails = {}), i._measurements || i._setMeasurements(), (i._dragDetails.scrollAmount = e.parentElement[i._measurements.scroll]), (i._dragDetails.lockedItemsSize = 0), i.setAttribute("show-locked-items", ""), !(i._dragDetails.firstItem = i._getTargetItem(e, "previousElementSibling")))) return delete i._dragDetails, void i.setAttribute("dragging-not-allowed", "");
              i._dragDetails.firstItem.set("size", ""), (i._dragDetails.firstItem.currentSize = i._dragDetails.firstItem[i._measurements.size]), (i._dragDetails.firstItem.originalSize = i._dragDetails.firstItem.currentSize);
              let s,
                n = getComputedStyle(i._dragDetails.firstItem);
              if (((i._dragDetails.firstItem._paddings = (parseFloat(n.getPropertyValue("padding-" + i._measurements.position)) || 0) + (parseFloat(n.getPropertyValue("padding-" + i._measurements.position2)) || 0)), (i._dragDetails.firstItem.currentSize -= i._dragDetails.firstItem._paddings), (i._dragDetails.splitAreaSize = 0), (i._dragDetails.secondItemTotalMaxSize = 0), (i._dragDetails.secondItemTotalMinSize = 0), "proportional" === i.resizeMode)) {
                if (i._setProportionalDetails()) return;
              } else if (i._setAdjacentOrEndDetails(e)) return;
              t && "object" == typeof t ? (s = e.getBoundingClientRect()[i._measurements.position]) : ((t = { pageX: e[i._measurements.offset], pageY: e[i._measurements.offset] }), (s = e[i._measurements.offset])), (i._dragDetails.position = t[i._measurements.pagePosition]), (i._dragDetails.splitBarOffset = i._dragDetails.position - s), i.liveResize || (i._splitBarDummy || ((i._splitBarDummy = document.createElement("div")), i._splitBarDummy.classList.add("smart-splitter-bar-feedback"), i._splitBarDummy.setAttribute(i.orientation, "")), (i._splitBarDummy.style.width = e.offsetWidth + "px"), (i._splitBarDummy.style.height = e.offsetHeight + "px"), (i._splitBarDummy.style.top = e.offsetTop + "px"), (i._splitBarDummy.style.left = e.offsetLeft + "px"), i._splitBarDummy.setAttribute(i.orientation, ""), e.parentElement.appendChild(i._splitBarDummy));
            }
            _setAdjacentOrEndDetails(e) {
              const t = this;
              if (!(t._dragDetails.secondItem = "adjacent" === t.resizeMode ? t._getTargetItem(e, "nextElementSibling") : t._getTargetItem(e, "previousElementSibling", !0))) return delete t._dragDetails, t.setAttribute("dragging-not-allowed", ""), !0;
              t._dragDetails.secondItem.set("size", ""), (t._dragDetails.secondItem.currentSize = t._dragDetails.secondItem[t._measurements.size]), (t._dragDetails.secondItem.originalSize = t._dragDetails.secondItem.currentSize);
              const i = getComputedStyle(t._dragDetails.secondItem);
              (t._dragDetails.secondItem._paddings = (parseFloat(i.getPropertyValue("padding-" + t._measurements.position)) || 0) + (parseFloat(i.getPropertyValue("padding-" + t._measurements.position2)) || 0)), (t._dragDetails.secondItem.currentSize -= t._dragDetails.secondItem._paddings), (t._dragDetails.splitAreaSize = t._dragDetails.firstItem.currentSize + t._dragDetails.secondItem.currentSize), (t._dragDetails.secondItemTotalMaxSize = t._dragDetails.secondItem._sizeLimits[t._measurements.maxDimension]), (t._dragDetails.secondItemTotalMinSize = t._dragDetails.secondItem._sizeLimits[t._measurements.minDimension]);
            }
            _setMeasurements() {
              const e = this;
              (e._measurements = {}), "horizontal" === e.orientation ? ((e._measurements.dimension = "height"), (e._measurements.minDimension = "minHeight"), (e._measurements.maxDimension = "maxHeight"), (e._measurements.restricredDimension = "Width"), (e._measurements.size = "offsetHeight"), (e._measurements.offset = "offsetTop"), (e._measurements.position = "top"), (e._measurements.position2 = "bottom"), (e._measurements.pagePosition = "pageY"), (e._measurements.scroll = "scrollTop")) : ((e._measurements.dimension = "width"), (e._measurements.minDimension = "minWidth"), (e._measurements.maxDimension = "maxWidth"), (e._measurements.restricredDimension = "Height"), (e._measurements.size = "offsetWidth"), (e._measurements.offset = "offsetLeft"), (e._measurements.position = "left"), (e._measurements.position2 = "right"), (e._measurements.pagePosition = "pageX"), (e._measurements.scroll = "scrollLeft")), (e._measurements.overflow = getComputedStyle(e).getPropertyValue("overflow"));
            }
            _setProportionalDetails() {
              const e = this;
              if (((e._dragDetails.secondItem = e._items.slice(e._items.indexOf(e._dragDetails.firstItem) + 1).filter((e) => !e.collapsed && !e.locked)), 0 === e._dragDetails.secondItem.length)) return delete e._dragDetails, !0;
              let t;
              (e._dragDetails.splitAreaSize += e._dragDetails.firstItem.currentSize), (e._dragDetails.itemProportions = []);
              for (let i = 0; i < e._dragDetails.secondItem.length; i++) {
                e._dragDetails.secondItem[i].set("size", ""), (e._dragDetails.secondItem[i].currentSize = e._dragDetails.secondItem[i][e._measurements.size]), (e._dragDetails.secondItem[i].originalSize = e._dragDetails.secondItem[i].currentSize);
                const s = getComputedStyle(e._dragDetails.secondItem[i]);
                (e._dragDetails.secondItem[i]._paddings = (parseFloat(s.getPropertyValue("padding-" + e._measurements.position)) || 0) + (parseFloat(s.getPropertyValue("padding-" + e._measurements.position2)) || 0)), (e._dragDetails.secondItem[i].currentSize -= e._dragDetails.secondItem[i]._paddings), (e._dragDetails.splitAreaSize += e._dragDetails.secondItem[i].currentSize), e._dragDetails.itemProportions.push({ item: e._dragDetails.secondItem[i], currentSize: e._dragDetails.secondItem[i].currentSize }), e._dragDetails.secondItem[i]._sizeLimits[e._measurements.maxDimension] || (t = !0), (e._dragDetails.secondItemTotalMinSize += e._dragDetails.secondItem[i]._sizeLimits[e._measurements.minDimension]), (e._dragDetails.secondItemTotalMaxSize += e._dragDetails.secondItem[i]._sizeLimits[e._measurements.maxDimension]);
              }
              t && (e._dragDetails.secondItemTotalMaxSize = 0);
            }
            _validateBarsSize() {
              const e = this;
              if ("100%" !== (getComputedStyle(e).getPropertyValue("--smart-splitter-bar-fit-size") + "").trim()) return void e.bars.forEach((t) => (t.style[e._measurements.restricredDimension.toLowerCase()] = null));
              if (!e._dragDetails && "vertical" === e.orientation && e.resizeTrigger) {
                const t = e.offsetHeight;
                if (((e.resizeTrigger.style.display = "none"), e.offsetHeight === t)) return (e.resizeTrigger.style.display = null), void e.bars.forEach((t) => (t.style[e._measurements.restricredDimension.toLowerCase()] = null));
                e.resizeTrigger.style.display = null;
              }
              let t = e._items[0];
              const i = "offset" + e._measurements.restricredDimension,
                s = e.bars;
              if (0 !== s.length) {
                for (let s = 0; s < e._items.length; s++) e._items[s][i] > t[i] && (t = e._items[s]);
                t && t[i] !== s[0][i] && s.forEach((s) => (s.style[e._measurements.restricredDimension.toLowerCase()] = t[i] + "px"));
              }
            }
            _validateItemSize(e) {
              const t = this;
              if ("overflow" === t.autoFitMode) return void t._validateBarsSize();
              const i = t._items,
                s = t._measurements.dimension,
                n = "offset" + ("width" === s ? "Width" : "Height"),
                a = t.$.container[n],
                r = (e) => "string" == typeof e && e.indexOf("%") > -1;
              let o = 0;
              for (let e = 0; e < i.length; e++) {
                const l = i[e];
                if ((l.min && r(l.min) && (l._sizeLimits[t._measurements.minDimension] = (parseFloat(l.min) * a) / 100), l.max && r(l.max) && (l._sizeLimits[t._measurements.maxDimension] = (parseFloat(l.max) * a) / 100), !l.collapsed)) {
                  const e = l.style[s];
                  o += e && e.indexOf("%") < -1 && l._sizeBeforeCollapse ? l._sizeBeforeCollapse : l[n];
                }
              }
              if (t.keepProportionsOnResize && t._resizeEventFired) t._keepItemProportionsOnResize();
              else {
                if ("horizontal" === t.orientation && t.resizeTrigger) {
                  const e = t.offsetHeight;
                  if (((t.resizeTrigger.style.display = "none"), t.offsetHeight !== e)) return void (t.resizeTrigger.style.display = null);
                  t.resizeTrigger.style.display = null;
                }
                let i = o + t.bars.reduce((e, i) => e + i[t._measurements.size], 0) - a;
                i > 0 ? t._validateItemsSizeOverflowing(i, e) : i < 0 && t._validateItemsSizeUnderflowing(i, e);
              }
              if ((t._autoFitItems(), t._validateBarsSize(), (t._splitterSize = a), t.enableShadowDOM)) {
                const e = t.getRootNode().host;
                e && e.enableShadowDOM && e.isCompleted && e._validateItemSize && e._validateItemSize();
              }
            }
            _validateNeighbourSizeLimits(e) {
              const t = this;
              function i(e) {
                e && (e.min && e._setSize("min", e.min, !0), e.max && e._setSize("max", e.max, !0));
              }
              if (!t._items || !t._items.length) return;
              t._noNeighbourValidation = !0;
              const s = t._items.indexOf(e);
              i(t._items[s - 1]), i(t._items[s + 1]), delete t._noNeighbourValidation;
            }
            _keepItemProportionsOnResize() {
              const e = this;
              let t = 0,
                i = [];
              for (let s = 0; s < e._items.length; s++) e._items[s].collapsed || (i.push(e._items[s]), (t += e._items[s]._sizeBeforeCollapse || e._items[s][e._measurements.size]));
              if ((e._splitterSize && (t = e._splitterSize), 1 === e._items.length)) return;
              const s = e.$.container.getBoundingClientRect()[e._measurements.dimension];
              for (let n = 0; n < i.length; n++) {
                const a = i[n],
                  r = a.style[e._measurements.dimension],
                  o = a.style[e._measurements.minDimension];
                if (r.indexOf("%") > -1 || o.indexOf("%") > -1) {
                  e._validateItemLimits(a, (a[e._measurements.size] / t) * s);
                  continue;
                }
                const l = a._sizeBeforeCollapse || a[e._measurements.size],
                  m = (l / t) * s;
                if (l !== m) {
                  if (((a.style[e._measurements.dimension] = m + "px"), s !== e.$.container.getBoundingClientRect()[e._measurements.dimension])) return void (a.style[e._measurements.dimension] = l + "px");
                  (a.style[e._measurements.dimension] = (a._sizeBeforeCollapse = m) + "px"), e._validateItemLimits(a, m);
                }
              }
            }
            _validateItemsSizeOverflowing(e, t) {
              const i = this,
                s = i._items.length;
              let n,
                a,
                r,
                o,
                l = 0,
                m = [],
                d = "offset" + ("width" === i._measurements.dimension ? "Width" : "Height"),
                _ = i.$.container;
              for (let e = 0; e < i._items.length; e++) {
                const t = i._items[e];
                (r = t.style[i._measurements.dimension]), r || (r = window.getComputedStyle(i).getPropertyValue("--smart-splitter-item-size") || ""), (a = r.indexOf("%") > -1 ? r : t[i._measurements.size]), r || t.size || 0 === t.size || delete t._originalSize;
                const s = ("auto" === a && t.size && isNaN(parseFloat(t.size))) || "auto" === t.size;
                (t._originalSize = t._originalSize && !s ? t._originalSize : a), m.push(t.locked);
              }
              m.indexOf(!1) < 0 && ((o = i._items[i._items.length - 1]), (o.locked = !1));
              for (let t = s - 1; t >= 0; t--) {
                const s = i._items[t];
                s.collapsed || s.locked || 0 === e || ((s._originalSize + "").indexOf("%") > -1 ? ((n = s.style[i._measurements.dimension] || s[i._measurements.size]), "string" == typeof n && n.indexOf("%") > -1 && (n = (parseFloat(n) / 100) * _[d]), (s.style[i._measurements.dimension] = s._originalSize), (s._sizeBeforeCollapse = (_[d] * parseFloat(s._originalSize)) / 100), (e -= parseFloat(n) - s._sizeBeforeCollapse)) : ((n = s[d]), (l = n - e), (s.style[i._measurements.dimension] = (s._sizeBeforeCollapse = Math.max(s._sizeLimits ? s._sizeLimits[i._measurements.minDimension] : 0, l)) + "px"), (e -= n - s._sizeBeforeCollapse)));
              }
              if (e > 0)
                for (let a = s - 1; a >= 0; a--) {
                  const s = i._items[a];
                  if (s.collapsed || s.locked) continue;
                  (n = s[d]), (l = n - e);
                  let r = s._sizeLimits[i._measurements.minDimension] || s.min;
                  r && ((r = (r + "").indexOf("%") > -1 ? (parseFloat(r) / 100) * s.parentElement[i._measurements.size] : parseFloat(r)), r > l && ((s._sizeLimits.ignoreUpdate = !t), (s.style[i._measurements.minDimension] = Math.max(0, l) + "px"))), (0 === e && s._originalSize && (s._originalSize + "").indexOf("%") > -1) || ((s._sizeLimits.ignoreUpdate = !t), (s.style[i._measurements.dimension] = (s._sizeBeforeCollapse = Math.max(0, l)) + "px"), (e -= n - s._sizeBeforeCollapse));
                }
              o && (o.locked = !0);
            }
            _validateItemsSizeUnderflowing(e, t) {
              const i = this,
                s = i._items.length;
              let n,
                a,
                r = 0;
              (e = Math.abs(e)), i._items.length > 0 && i._items.map((e) => e.locked).indexOf(!1) < 0 && ((a = i._items[i._items.length - 1]), (a.locked = !1));
              for (let a = 0; a < s; a++) {
                const s = i._items[a];
                if (!(s.collapsed || s[i._measurements.size] >= (s._sizeLimits ? s._sizeLimits[i._measurements.minDimension] : 0)) && ((n = s[i._measurements.size]), (r = s[i._measurements.size] + e), s[i._measurements.size] < s._sizeLimits[i._measurements.minDimension] && ((s._sizeLimits.ignoreUpdate = !t), (s.style[i._measurements.minDimension] = (s._sizeBeforeCollapse = Math.max(0, Math.min(s._sizeLimits[i._measurements.minDimension], r))) + "px")), (e -= (s._sizeBeforeCollapse || s[i._measurements.size]) - n) <= 0)) break;
              }
              const o = i.$.container["offset" + ("width" === i._measurements.dimension ? "Width" : "Height")];
              if (e > 0)
                for (let t = 0; t < s; t++) {
                  const s = i._items[t];
                  let n;
                  if (!s.collapsed && !s.locked && void 0 !== s._originalSize) {
                    if ((s._originalSize + "").indexOf("%") > -1) {
                      const t = (parseFloat(s._originalSize) * o) / 100;
                      (r = Math.min(t, s[i._measurements.size] + e)), (n = r - s[i._measurements.size]), s[i._measurements.minDimension] < s._sizeLimits[i._measurements.minDimension] && (s.style[i._measurements.minDimension] = Math.min(s._sizeLimits[i._measurements.minDimension], r) + "px"), (s.style[i._measurements.dimension] = t === r ? s._originalSize : r + "px"), (s._sizeBeforeCollapse = Math.max(0, r)), (e -= n);
                    } else s[i._measurements.size] >= s._originalSize ? ((e += s[i._measurements.size] - s._originalSize), (s.style[i._measurements.dimension] = (s._sizeBeforeCollapse = s._originalSize) + "px")) : ((r = Math.min(s._originalSize, s[i._measurements.size] + e)), (n = r - s[i._measurements.size]), s[i._measurements.minDimension] < s._sizeLimits[i._measurements.minDimension] && (s.style[i._measurements.minDimension] = Math.min(s._sizeLimits[i._measurements.minDimension], r) + "px"), (s.style[i._measurements.dimension] = (s._sizeBeforeCollapse = Math.max(0, Math.min(r, s._originalSize))) + "px"), (e -= n));
                    if (e <= 0) break;
                  }
                }
              a && (a.locked = !0);
            }
          }
        );

      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter = module && module.__esModule ? /******/ () => module["default"] : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /* unused harmony exports smartSplitter, smartSplitterItem, smartSplitterBar */
    /* harmony import */ var _smart_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6321);
    /* harmony import */ var _smart_element_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_smart_element_js__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _smart_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2612);
    /* harmony import */ var _smart_button_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(_smart_button_js__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _smart_scrollbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9135);
    /* harmony import */ var _smart_scrollbar_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(_smart_scrollbar_js__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _smart_splitter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1066);
    /* harmony import */ var _smart_splitter_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(_smart_splitter_js__WEBPACK_IMPORTED_MODULE_3__);

    /* Smart UI v14.4.4 (2022-09-29) 
Copyright (c) 2011-2022 jQWidgets. 
License: https://htmlelements.com/license/ */ //

    class smartSplitter extends Smart.Component {
      get name() {
        return "smartSplitter";
      }
    }

    class smartSplitterItem extends Smart.Component {
      get name() {
        return "smartSplitterItem";
      }
    }

    class smartSplitterBar extends Smart.Component {
      get name() {
        return "smartSplitterBar";
      }
    }
  })();

  /******/
})();
