/*
 * jQuery FlexSlider v2.7.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */ !(function (u) {
  var a = !0;
  (u.flexslider = function (p, e) {
    var t,
      m = u(p),
      r =
        (void 0 === e.rtl && "rtl" == u("html").attr("dir") && (e.rtl = !0),
        (m.vars = u.extend({}, u.flexslider.defaults, e)),
        m.vars.namespace),
      f =
        window.navigator &&
        window.navigator.msPointerEnabled &&
        window.MSGesture,
      o =
        ("ontouchstart" in window ||
          f ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        m.vars.touch,
      s = "click touchend MSPointerUp keyup",
      l = "",
      g = "vertical" === m.vars.direction,
      h = m.vars.reverse,
      x = 0 < m.vars.itemWidth,
      S = "fade" === m.vars.animation,
      c = "" !== m.vars.asNavFor,
      d = {};
    u.data(p, "flexslider", m),
      (d = {
        init: function () {
          (m.animating = !1),
            (m.currentSlide = parseInt(m.vars.startAt || 0, 10)),
            isNaN(m.currentSlide) && (m.currentSlide = 0),
            (m.animatingTo = m.currentSlide),
            (m.atEnd = 0 === m.currentSlide || m.currentSlide === m.last),
            (m.containerSelector = m.vars.selector.substr(
              0,
              m.vars.selector.search(" ")
            )),
            (m.slides = u(m.vars.selector, m)),
            (m.container = u(m.containerSelector, m)),
            (m.count = m.slides.length),
            (m.syncExists = 0 < u(m.vars.sync).length),
            "slide" === m.vars.animation && (m.vars.animation = "swing"),
            (m.prop = g ? "top" : m.vars.rtl ? "marginRight" : "marginLeft"),
            (m.args = {}),
            (m.manualPause = !1),
            (m.stopped = !1),
            (m.started = !1),
            (m.startTimeout = null),
            (m.transitions =
              !m.vars.video &&
              !S &&
              m.vars.useCSS &&
              (function () {
                var e,
                  t = document.createElement("div"),
                  a = [
                    "perspectiveProperty",
                    "WebkitPerspective",
                    "MozPerspective",
                    "OPerspective",
                    "msPerspective",
                  ];
                for (e in a)
                  if (void 0 !== t.style[a[e]])
                    return (
                      (m.pfx = a[e].replace("Perspective", "").toLowerCase()),
                      (m.prop = "-" + m.pfx + "-transform"),
                      !0
                    );
                return !1;
              })()),
            (m.isFirefox =
              -1 < navigator.userAgent.toLowerCase().indexOf("firefox")),
            (m.ensureAnimationEnd = "") !== m.vars.controlsContainer &&
              (m.controlsContainer =
                0 < u(m.vars.controlsContainer).length &&
                u(m.vars.controlsContainer)),
            "" !== m.vars.manualControls &&
              (m.manualControls =
                0 < u(m.vars.manualControls).length &&
                u(m.vars.manualControls)),
            "" !== m.vars.customDirectionNav &&
              (m.customDirectionNav =
                2 === u(m.vars.customDirectionNav).length &&
                u(m.vars.customDirectionNav)),
            m.vars.randomize &&
              (m.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              m.container.empty().append(m.slides)),
            m.doMath(),
            m.setup("init"),
            m.vars.controlNav && d.controlNav.setup(),
            m.vars.directionNav && d.directionNav.setup(),
            m.vars.keyboard &&
              (1 === u(m.containerSelector).length ||
                m.vars.multipleKeyboard) &&
              u(document).bind("keyup", function (e) {
                e = e.keyCode;
                m.animating ||
                  (39 !== e && 37 !== e) ||
                  ((e = m.vars.rtl
                    ? 37 === e
                      ? m.getTarget("next")
                      : 39 === e && m.getTarget("prev")
                    : 39 === e
                    ? m.getTarget("next")
                    : 37 === e && m.getTarget("prev")),
                  m.flexAnimate(e, m.vars.pauseOnAction));
              }),
            m.vars.mousewheel &&
              m.bind("mousewheel", function (e, t, a, n) {
                e.preventDefault(),
                  (e = t < 0 ? m.getTarget("next") : m.getTarget("prev")),
                  m.flexAnimate(e, m.vars.pauseOnAction);
              }),
            m.vars.pausePlay && d.pausePlay.setup(),
            m.vars.slideshow &&
              m.vars.pauseInvisible &&
              d.pauseInvisible.init(),
            m.vars.slideshow &&
              (m.vars.pauseOnHover &&
                m.hover(
                  function () {
                    m.manualPlay || m.manualPause || m.pause();
                  },
                  function () {
                    m.manualPause || m.manualPlay || m.stopped || m.play();
                  }
                ),
              (m.vars.pauseInvisible && d.pauseInvisible.isHidden()) ||
                (0 < m.vars.initDelay
                  ? (m.startTimeout = setTimeout(m.play, m.vars.initDelay))
                  : m.play())),
            c && d.asNav.setup(),
            o && m.vars.touch && d.touch(),
            (S && !m.vars.smoothHeight) ||
              u(window).bind("resize orientationchange focus", d.resize),
            m.find("img").attr("draggable", "false"),
            setTimeout(function () {
              m.vars.start(m);
            }, 200);
        },
        asNav: {
          setup: function () {
            (m.asNav = !0),
              (m.animatingTo = Math.floor(m.currentSlide / m.move)),
              (m.currentItem = m.currentSlide),
              m.slides
                .removeClass(r + "active-slide")
                .eq(m.currentItem)
                .addClass(r + "active-slide"),
              f
                ? (p._slider = m).slides.each(function () {
                    var e = this;
                    (e._gesture = new MSGesture()),
                      (e._gesture.target = e).addEventListener(
                        "MSPointerDown",
                        function (e) {
                          e.preventDefault(),
                            e.currentTarget._gesture &&
                              e.currentTarget._gesture.addPointer(e.pointerId);
                        },
                        !1
                      ),
                      e.addEventListener("MSGestureTap", function (e) {
                        e.preventDefault();
                        var t = (e = u(this)).index();
                        u(m.vars.asNavFor).data("flexslider").animating ||
                          e.hasClass("active") ||
                          ((m.direction = m.currentItem < t ? "next" : "prev"),
                          m.flexAnimate(t, m.vars.pauseOnAction, !1, !0, !0));
                      });
                  })
                : m.slides.on(s, function (e) {
                    e.preventDefault();
                    var t = (e = u(this)).index();
                    (m.vars.rtl
                      ? -1 * (e.offset().right - u(m).scrollLeft())
                      : e.offset().left - u(m).scrollLeft()) <= 0 &&
                    e.hasClass(r + "active-slide")
                      ? m.flexAnimate(m.getTarget("prev"), !0)
                      : u(m.vars.asNavFor).data("flexslider").animating ||
                        e.hasClass(r + "active-slide") ||
                        ((m.direction = m.currentItem < t ? "next" : "prev"),
                        m.flexAnimate(t, m.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            m.manualControls
              ? d.controlNav.setupManual()
              : d.controlNav.setupPaging();
          },
          setupPaging: function () {
            var e,
              t =
                "thumbnails" === m.vars.controlNav
                  ? "control-thumbs"
                  : "control-paging",
              a = 1;
            if (
              ((m.controlNavScaffold = u(
                '<ol class="' + r + "control-nav " + r + t + '"></ol>'
              )),
              1 < m.pagingCount)
            )
              for (var n = 0; n < m.pagingCount; n++) {
                void 0 === (i = m.slides.eq(n)).attr("data-thumb-alt") &&
                  i.attr("data-thumb-alt", ""),
                  (e = u("<a></a>").attr("href", "#").text(a)),
                  "thumbnails" === m.vars.controlNav &&
                    (e = u("<img/>").attr("src", i.attr("data-thumb"))),
                  "" !== i.attr("data-thumb-alt") &&
                    e.attr("alt", i.attr("data-thumb-alt")),
                  "thumbnails" === m.vars.controlNav &&
                    !0 === m.vars.thumbCaptions &&
                    "" !== (i = i.attr("data-thumbcaption")) &&
                    void 0 !== i &&
                    ((i = u("<span></span>")
                      .addClass(r + "caption")
                      .text(i)),
                    e.append(i));
                var i = u("<li>");
                e.appendTo(i),
                  i.append("</li>"),
                  m.controlNavScaffold.append(i),
                  a++;
              }
            (m.controlsContainer ? u(m.controlsContainer) : m).append(
              m.controlNavScaffold
            ),
              d.controlNav.set(),
              d.controlNav.active(),
              m.controlNavScaffold.delegate("a, img", s, function (e) {
                var t, a;
                e.preventDefault(),
                  ("" !== l && l !== e.type) ||
                    ((t = u(this)),
                    (a = m.controlNav.index(t)),
                    t.hasClass(r + "active")) ||
                    ((m.direction = a > m.currentSlide ? "next" : "prev"),
                    m.flexAnimate(a, m.vars.pauseOnAction)),
                  "" === l && (l = e.type),
                  d.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (m.controlNav = m.manualControls),
              d.controlNav.active(),
              m.controlNav.bind(s, function (e) {
                var t, a;
                e.preventDefault(),
                  ("" !== l && l !== e.type) ||
                    ((t = u(this)),
                    (a = m.controlNav.index(t)),
                    t.hasClass(r + "active")) ||
                    (a > m.currentSlide
                      ? (m.direction = "next")
                      : (m.direction = "prev"),
                    m.flexAnimate(a, m.vars.pauseOnAction)),
                  "" === l && (l = e.type),
                  d.setToClearWatchedEvent();
              });
          },
          set: function () {
            var e = "thumbnails" === m.vars.controlNav ? "img" : "a";
            m.controlNav = u(
              "." + r + "control-nav li " + e,
              m.controlsContainer || m
            );
          },
          active: function () {
            m.controlNav
              .removeClass(r + "active")
              .eq(m.animatingTo)
              .addClass(r + "active");
          },
          update: function (e, t) {
            1 < m.pagingCount && "add" === e
              ? m.controlNavScaffold.append(
                  u('<li><a href="#">' + m.count + "</a></li>")
                )
              : (1 === m.pagingCount
                  ? m.controlNavScaffold.find("li")
                  : m.controlNav.eq(t).closest("li")
                ).remove(),
              d.controlNav.set(),
              1 < m.pagingCount && m.pagingCount !== m.controlNav.length
                ? m.update(t, e)
                : d.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var e = u(
              '<ul class="' +
                r +
                'direction-nav"><li class="' +
                r +
                'nav-prev"><a class="' +
                r +
                'prev" href="#">' +
                m.vars.prevText +
                '</a></li><li class="' +
                r +
                'nav-next"><a class="' +
                r +
                'next" href="#">' +
                m.vars.nextText +
                "</a></li></ul>"
            );
            m.customDirectionNav
              ? (m.directionNav = m.customDirectionNav)
              : m.controlsContainer
              ? (u(m.controlsContainer).append(e),
                (m.directionNav = u(
                  "." + r + "direction-nav li a",
                  m.controlsContainer
                )))
              : (m.append(e),
                (m.directionNav = u("." + r + "direction-nav li a", m))),
              d.directionNav.update(),
              m.directionNav.bind(s, function (e) {
                var t;
                e.preventDefault(),
                  ("" !== l && l !== e.type) ||
                    ((t = u(this).hasClass(r + "next")
                      ? m.getTarget("next")
                      : m.getTarget("prev")),
                    m.flexAnimate(t, m.vars.pauseOnAction)),
                  "" === l && (l = e.type),
                  d.setToClearWatchedEvent();
              });
          },
          update: function () {
            var e = r + "disabled";
            1 === m.pagingCount
              ? m.directionNav.addClass(e).attr("tabindex", "-1")
              : m.vars.animationLoop
              ? m.directionNav.removeClass(e).removeAttr("tabindex")
              : 0 === m.animatingTo
              ? m.directionNav
                  .removeClass(e)
                  .filter("." + r + "prev")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : m.animatingTo === m.last
              ? m.directionNav
                  .removeClass(e)
                  .filter("." + r + "next")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : m.directionNav.removeClass(e).removeAttr("tabindex");
          },
        },
        pausePlay: {
          setup: function () {
            var e = u('<div class="' + r + 'pauseplay"><a href="#"></a></div>');
            m.controlsContainer
              ? (m.controlsContainer.append(e),
                (m.pausePlay = u("." + r + "pauseplay a", m.controlsContainer)))
              : (m.append(e), (m.pausePlay = u("." + r + "pauseplay a", m))),
              d.pausePlay.update(m.vars.slideshow ? r + "pause" : r + "play"),
              m.pausePlay.bind(s, function (e) {
                e.preventDefault(),
                  ("" !== l && l !== e.type) ||
                    (u(this).hasClass(r + "pause")
                      ? ((m.manualPause = !0), (m.manualPlay = !1), m.pause())
                      : ((m.manualPause = !1), (m.manualPlay = !0), m.play())),
                  "" === l && (l = e.type),
                  d.setToClearWatchedEvent();
              });
          },
          update: function (e) {
            "play" === e
              ? m.pausePlay
                  .removeClass(r + "pause")
                  .addClass(r + "play")
                  .html(m.vars.playText)
              : m.pausePlay
                  .removeClass(r + "play")
                  .addClass(r + "pause")
                  .html(m.vars.pauseText);
          },
        },
        touch: function () {
          var n,
            i,
            s,
            r,
            o,
            l,
            c,
            d,
            u = !1,
            t = 0,
            a = 0,
            v = 0;
          f
            ? ((p.style.msTouchAction = "none"),
              (p._gesture = new MSGesture()),
              (p._gesture.target = p).addEventListener(
                "MSPointerDown",
                function (e) {
                  e.stopPropagation(),
                    m.animating
                      ? e.preventDefault()
                      : (m.pause(),
                        p._gesture.addPointer(e.pointerId),
                        (v = 0),
                        (r = g ? m.h : m.w),
                        (l = Number(new Date())),
                        (s =
                          x && h && m.animatingTo === m.last
                            ? 0
                            : x && h
                            ? m.limit -
                              (m.itemW + m.vars.itemMargin) *
                                m.move *
                                m.animatingTo
                            : x && m.currentSlide === m.last
                            ? m.limit
                            : x
                            ? (m.itemW + m.vars.itemMargin) *
                              m.move *
                              m.currentSlide
                            : h
                            ? (m.last - m.currentSlide + m.cloneOffset) * r
                            : (m.currentSlide + m.cloneOffset) * r));
                },
                !1
              ),
              (p._slider = m),
              p.addEventListener(
                "MSGestureChange",
                function (e) {
                  e.stopPropagation();
                  var t,
                    a,
                    n = e.target._slider;
                  n &&
                    ((t = -e.translationX),
                    (a = -e.translationY),
                    (v += g ? a : t),
                    (o = (n.vars.rtl ? -1 : 1) * v),
                    (u = g
                      ? Math.abs(v) < Math.abs(-t)
                      : Math.abs(v) < Math.abs(-a)),
                    e.detail === e.MSGESTURE_FLAG_INERTIA
                      ? setImmediate(function () {
                          p._gesture.stop();
                        })
                      : (!u || 500 < Number(new Date()) - l) &&
                        !S &&
                        n.transitions &&
                        (n.vars.animationLoop ||
                          (o =
                            v /
                            ((0 === n.currentSlide && v < 0) ||
                            (n.currentSlide === n.last && 0 < v)
                              ? Math.abs(v) / r + 2
                              : 1)),
                        n.setProps(s + o, "setTouch")));
                },
                !1
              ),
              p.addEventListener(
                "MSGestureEnd",
                function (e) {
                  var t, a;
                  e.stopPropagation(),
                    (e = e.target._slider) &&
                      (e.animatingTo !== e.currentSlide ||
                        u ||
                        null === o ||
                        ((a =
                          0 < (t = h ? -o : o)
                            ? e.getTarget("next")
                            : e.getTarget("prev")),
                        e.canAdvance(a) &&
                        ((Number(new Date()) - l < 550 && 50 < Math.abs(t)) ||
                          Math.abs(t) > r / 2)
                          ? e.flexAnimate(a, e.vars.pauseOnAction)
                          : S ||
                            e.flexAnimate(
                              e.currentSlide,
                              e.vars.pauseOnAction,
                              !0
                            )),
                      (s = o = i = n = null),
                      (v = 0));
                },
                !1
              ))
            : ((c = function (e) {
                (t = e.touches[0].pageX),
                  (a = e.touches[0].pageY),
                  (o = g ? n - a : (m.vars.rtl ? -1 : 1) * (n - t)),
                  (!(u = g
                    ? Math.abs(o) < Math.abs(t - i)
                    : Math.abs(o) < Math.abs(a - i)) ||
                    500 < Number(new Date()) - l) &&
                    !S &&
                    m.transitions &&
                    (m.vars.animationLoop ||
                      (o /=
                        (0 === m.currentSlide && o < 0) ||
                        (m.currentSlide === m.last && 0 < o)
                          ? Math.abs(o) / r + 2
                          : 1),
                    m.setProps(s + o, "setTouch"));
              }),
              (d = function (e) {
                var t, a;
                p.removeEventListener("touchmove", c, !1),
                  m.animatingTo !== m.currentSlide ||
                    u ||
                    null === o ||
                    ((a =
                      0 < (t = h ? -o : o)
                        ? m.getTarget("next")
                        : m.getTarget("prev")),
                    m.canAdvance(a) &&
                    ((Number(new Date()) - l < 550 && 50 < Math.abs(t)) ||
                      Math.abs(t) > r / 2)
                      ? m.flexAnimate(a, m.vars.pauseOnAction)
                      : S ||
                        m.flexAnimate(
                          m.currentSlide,
                          m.vars.pauseOnAction,
                          !0
                        )),
                  p.removeEventListener("touchend", d, !1),
                  (s = o = i = n = null);
              }),
              p.addEventListener(
                "touchstart",
                function (e) {
                  m.animating ||
                    (!window.navigator.msPointerEnabled &&
                      1 !== e.touches.length) ||
                    (m.pause(),
                    (r = g ? m.h : m.w),
                    (l = Number(new Date())),
                    (t = e.touches[0].pageX),
                    (a = e.touches[0].pageY),
                    (s =
                      x && h && m.animatingTo === m.last
                        ? 0
                        : x && h
                        ? m.limit -
                          (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo
                        : x && m.currentSlide === m.last
                        ? m.limit
                        : x
                        ? (m.itemW + m.vars.itemMargin) *
                          m.move *
                          m.currentSlide
                        : h
                        ? (m.last - m.currentSlide + m.cloneOffset) * r
                        : (m.currentSlide + m.cloneOffset) * r),
                    (n = g ? a : t),
                    (i = g ? t : a),
                    p.addEventListener("touchmove", c, { passive: true }),
                    p.addEventListener("touchend", d, { passive: true }));
                },
                { passive: true }
              ));
        },
        resize: function () {
          !m.animating &&
            m.is(":visible") &&
            (x || m.doMath(),
            S
              ? d.smoothHeight()
              : x
              ? (m.slides.width(m.computedW),
                m.update(m.pagingCount),
                m.setProps())
              : g
              ? (m.viewport.height(m.h), m.setProps(m.h, "setTotal"))
              : (m.vars.smoothHeight && d.smoothHeight(),
                m.newSlides.width(m.computedW),
                m.setProps(m.computedW, "setTotal")));
        },
        smoothHeight: function (e) {
          var t;
          (g && !S) ||
            ((t = S ? m : m.viewport),
            e
              ? t.animate(
                  { height: m.slides.eq(m.animatingTo).innerHeight() },
                  e
                )
              : t.innerHeight(m.slides.eq(m.animatingTo).innerHeight()));
        },
        sync: function (e) {
          var t = u(m.vars.sync).data("flexslider"),
            a = m.animatingTo;
          switch (e) {
            case "animate":
              t.flexAnimate(a, m.vars.pauseOnAction, !1, !0);
              break;
            case "play":
              t.playing || t.asNav || t.play();
              break;
            case "pause":
              t.pause();
          }
        },
        uniqueID: function (e) {
          return (
            e
              .filter("[id]")
              .add(e.find("[id]"))
              .each(function () {
                var e = u(this);
                e.attr("id", e.attr("id") + "_clone");
              }),
            e
          );
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var e = d.pauseInvisible.getHiddenProp();
            e &&
              ((e = e.replace(/[H|h]idden/, "") + "visibilitychange"),
              document.addEventListener(e, function () {
                d.pauseInvisible.isHidden()
                  ? m.startTimeout
                    ? clearTimeout(m.startTimeout)
                    : m.pause()
                  : !m.started && 0 < m.vars.initDelay
                  ? setTimeout(m.play, m.vars.initDelay)
                  : m.play();
              }));
          },
          isHidden: function () {
            var e = d.pauseInvisible.getHiddenProp();
            return !!e && document[e];
          },
          getHiddenProp: function () {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var t = 0; t < e.length; t++)
              if (e[t] + "Hidden" in document) return e[t] + "Hidden";
            return null;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(t),
            (t = setTimeout(function () {
              l = "";
            }, 3e3));
        },
      }),
      (m.flexAnimate = function (e, t, a, n, i) {
        if (
          (m.vars.animationLoop ||
            e === m.currentSlide ||
            (m.direction = e > m.currentSlide ? "next" : "prev"),
          c &&
            1 === m.pagingCount &&
            (m.direction = m.currentItem < e ? "next" : "prev"),
          !m.animating && (m.canAdvance(e, i) || a) && m.is(":visible"))
        ) {
          if (c && n) {
            if (
              ((a = u(m.vars.asNavFor).data("flexslider")),
              (m.atEnd = 0 === e || e === m.count - 1),
              a.flexAnimate(e, !0, !1, !0, i),
              (m.direction = m.currentItem < e ? "next" : "prev"),
              (a.direction = m.direction),
              Math.ceil((e + 1) / m.visible) - 1 === m.currentSlide || 0 === e)
            )
              return (
                (m.currentItem = e),
                m.slides
                  .removeClass(r + "active-slide")
                  .eq(e)
                  .addClass(r + "active-slide"),
                !1
              );
            (m.currentItem = e),
              m.slides
                .removeClass(r + "active-slide")
                .eq(e)
                .addClass(r + "active-slide"),
              (e = Math.floor(e / m.visible));
          }
          var s;
          (m.animating = !0),
            (m.animatingTo = e),
            t && m.pause(),
            m.vars.before(m),
            m.syncExists && !i && d.sync("animate"),
            m.vars.controlNav && d.controlNav.active(),
            x ||
              m.slides
                .removeClass(r + "active-slide")
                .eq(e)
                .addClass(r + "active-slide"),
            (m.atEnd = 0 === e || e === m.last),
            m.vars.directionNav && d.directionNav.update(),
            e === m.last && (m.vars.end(m), m.vars.animationLoop || m.pause()),
            S
              ? o
                ? (m.slides.eq(m.currentSlide).css({ opacity: 0, zIndex: 1 }),
                  m.slides.eq(e).css({ opacity: 1, zIndex: 2 }),
                  m.wrapup(s))
                : (m.slides
                    .eq(m.currentSlide)
                    .css({ zIndex: 1 })
                    .animate(
                      { opacity: 0 },
                      m.vars.animationSpeed,
                      m.vars.easing
                    ),
                  m.slides
                    .eq(e)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      m.vars.animationSpeed,
                      m.vars.easing,
                      m.wrapup
                    ))
              : ((s = g ? m.slides.filter(":first").height() : m.computedW),
                (t = x
                  ? ((n = m.vars.itemMargin),
                    (a = (m.itemW + n) * m.move * m.animatingTo) > m.limit &&
                    1 !== m.visible
                      ? m.limit
                      : a)
                  : 0 === m.currentSlide &&
                    e === m.count - 1 &&
                    m.vars.animationLoop &&
                    "next" !== m.direction
                  ? h
                    ? (m.count + m.cloneOffset) * s
                    : 0
                  : m.currentSlide === m.last &&
                    0 === e &&
                    m.vars.animationLoop &&
                    "prev" !== m.direction
                  ? h
                    ? 0
                    : (m.count + 1) * s
                  : h
                  ? (m.count - 1 - e + m.cloneOffset) * s
                  : (e + m.cloneOffset) * s),
                m.setProps(t, "", m.vars.animationSpeed),
                m.transitions
                  ? ((m.vars.animationLoop && m.atEnd) ||
                      ((m.animating = !1), (m.currentSlide = m.animatingTo)),
                    m.container.unbind("webkitTransitionEnd transitionend"),
                    m.container.bind(
                      "webkitTransitionEnd transitionend",
                      function () {
                        clearTimeout(m.ensureAnimationEnd), m.wrapup(s);
                      }
                    ),
                    clearTimeout(m.ensureAnimationEnd),
                    (m.ensureAnimationEnd = setTimeout(function () {
                      m.wrapup(s);
                    }, m.vars.animationSpeed + 100)))
                  : m.container.animate(
                      m.args,
                      m.vars.animationSpeed,
                      m.vars.easing,
                      function () {
                        m.wrapup(s);
                      }
                    )),
            m.vars.smoothHeight && d.smoothHeight(m.vars.animationSpeed);
        }
      }),
      (m.wrapup = function (e) {
        S ||
          x ||
          (0 === m.currentSlide &&
          m.animatingTo === m.last &&
          m.vars.animationLoop
            ? m.setProps(e, "jumpEnd")
            : m.currentSlide === m.last &&
              0 === m.animatingTo &&
              m.vars.animationLoop &&
              m.setProps(e, "jumpStart")),
          (m.animating = !1),
          (m.currentSlide = m.animatingTo),
          m.vars.after(m);
      }),
      (m.animateSlides = function () {
        !m.animating && a && m.flexAnimate(m.getTarget("next"));
      }),
      (m.pause = function () {
        clearInterval(m.animatedSlides),
          (m.animatedSlides = null),
          (m.playing = !1),
          m.vars.pausePlay && d.pausePlay.update("play"),
          m.syncExists && d.sync("pause");
      }),
      (m.play = function () {
        m.playing && clearInterval(m.animatedSlides),
          (m.animatedSlides =
            m.animatedSlides ||
            setInterval(m.animateSlides, m.vars.slideshowSpeed)),
          (m.started = m.playing = !0),
          m.vars.pausePlay && d.pausePlay.update("pause"),
          m.syncExists && d.sync("play");
      }),
      (m.stop = function () {
        m.pause(), (m.stopped = !0);
      }),
      (m.canAdvance = function (e, t) {
        var a = c ? m.pagingCount - 1 : m.last;
        return !(
          !t &&
          (!c ||
            m.currentItem !== m.count - 1 ||
            0 !== e ||
            "prev" !== m.direction) &&
          ((c &&
            0 === m.currentItem &&
            e === m.pagingCount - 1 &&
            "next" !== m.direction) ||
            (e === m.currentSlide && !c) ||
            (!m.vars.animationLoop &&
              ((m.atEnd &&
                0 === m.currentSlide &&
                e === a &&
                "next" !== m.direction) ||
                (m.atEnd &&
                  m.currentSlide === a &&
                  0 === e &&
                  "next" === m.direction))))
        );
      }),
      (m.getTarget = function (e) {
        return "next" === (m.direction = e)
          ? m.currentSlide === m.last
            ? 0
            : m.currentSlide + 1
          : 0 === m.currentSlide
          ? m.last
          : m.currentSlide - 1;
      }),
      (m.setProps = function (e, t, a) {
        var n,
          n = e || (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo,
          i =
            (function () {
              if (x)
                return "setTouch" === t
                  ? e
                  : h && m.animatingTo === m.last
                  ? 0
                  : h
                  ? m.limit -
                    (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo
                  : m.animatingTo === m.last
                  ? m.limit
                  : n;
              switch (t) {
                case "setTotal":
                  return h
                    ? (m.count - 1 - m.currentSlide + m.cloneOffset) * e
                    : (m.currentSlide + m.cloneOffset) * e;
                case "setTouch":
                  return e;
                case "jumpEnd":
                  return h ? e : m.count * e;
                case "jumpStart":
                  return h ? m.count * e : e;
                default:
                  return e;
              }
            })() *
              (m.vars.rtl ? 1 : -1) +
            "px";
        m.transitions &&
          ((i = m.isFirefox
            ? g
              ? "translate3d(0," + i + ",0)"
              : "translate3d(" + parseInt(i) + "px,0,0)"
            : g
            ? "translate3d(0," + i + ",0)"
            : "translate3d(" + (m.vars.rtl ? -1 : 1) * parseInt(i) + "px,0,0)"),
          m.container.css(
            "-" + m.pfx + "-transition-duration",
            (a = void 0 !== a ? a / 1e3 + "s" : "0s")
          ),
          m.container.css("transition-duration", a)),
          (m.args[m.prop] = i),
          (!m.transitions && void 0 !== a) || m.container.css(m.args),
          m.container.css("transform", i);
      }),
      (m.setup = function (e) {
        var t, a;
        S
          ? (m.vars.rtl
              ? m.slides.css({
                  width: "100%",
                  float: "right",
                  marginLeft: "-100%",
                  position: "relative",
                })
              : m.slides.css({
                  width: "100%",
                  float: "left",
                  marginRight: "-100%",
                  position: "relative",
                }),
            "init" === e &&
              (o
                ? m.slides
                    .css({
                      opacity: 0,
                      display: "block",
                      webkitTransition:
                        "opacity " + m.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1,
                    })
                    .eq(m.currentSlide)
                    .css({ opacity: 1, zIndex: 2 })
                : 0 == m.vars.fadeFirstSlide
                ? m.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(m.currentSlide)
                    .css({ zIndex: 2 })
                    .css({ opacity: 1 })
                : m.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(m.currentSlide)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      m.vars.animationSpeed,
                      m.vars.easing
                    )),
            m.vars.smoothHeight && d.smoothHeight())
          : ("init" === e &&
              ((m.viewport = u('<div class="' + r + 'viewport"></div>')
                .css({ overflow: "hidden", position: "relative" })
                .appendTo(m)
                .append(m.container)),
              (m.cloneCount = 0),
              (m.cloneOffset = 0),
              h) &&
              ((a = u.makeArray(m.slides).reverse()),
              (m.slides = u(a)),
              m.container.empty().append(m.slides)),
            m.vars.animationLoop &&
              !x &&
              ((m.cloneCount = 2),
              (m.cloneOffset = 1),
              "init" !== e && m.container.find(".clone").remove(),
              m.container
                .append(d.uniqueID(m.slides.first().clone().addClass("clone")))
                .prepend(
                  d.uniqueID(m.slides.last().clone().addClass("clone"))
                )),
            (m.newSlides = u(m.vars.selector, m)),
            (t = h
              ? m.count - 1 - m.currentSlide + m.cloneOffset
              : m.currentSlide + m.cloneOffset),
            g && !x
              ? (m.container
                  .height(200 * (m.count + m.cloneCount) + "%")
                  .css("position", "absolute")
                  .width("100%"),
                setTimeout(
                  function () {
                    m.newSlides.css({ display: "block" }),
                      m.doMath(),
                      m.viewport.height(m.h),
                      m.setProps(t * m.h, "init");
                  },
                  "init" === e ? 100 : 0
                ))
              : (m.container.width(200 * (m.count + m.cloneCount) + "%"),
                m.setProps(t * m.computedW, "init"),
                setTimeout(
                  function () {
                    m.doMath(),
                      m.vars.rtl && m.isFirefox
                        ? m.newSlides.css({
                            width: m.computedW,
                            marginRight: m.computedM,
                            float: "right",
                            display: "block",
                          })
                        : m.newSlides.css({
                            width: m.computedW,
                            marginRight: m.computedM,
                            float: "left",
                            display: "block",
                          }),
                      m.vars.smoothHeight && d.smoothHeight();
                  },
                  "init" === e ? 100 : 0
                ))),
          x ||
            m.slides
              .removeClass(r + "active-slide")
              .eq(m.currentSlide)
              .addClass(r + "active-slide"),
          m.vars.init(m);
      }),
      (m.doMath = function () {
        var e = m.slides.first(),
          t = m.vars.itemMargin,
          a = m.vars.minItems,
          n = m.vars.maxItems;
        (m.w = (void 0 === m.viewport ? m : m.viewport).width()),
          m.isFirefox && (m.w = m.width()),
          (m.h = e.height()),
          (m.boxPadding = e.outerWidth() - e.width()),
          x
            ? ((m.itemT = m.vars.itemWidth + t),
              (m.itemM = t),
              (m.minW = a ? a * m.itemT : m.w),
              (m.maxW = n ? n * m.itemT - t : m.w),
              (m.itemW =
                m.minW > m.w
                  ? (m.w - t * (a - 1)) / a
                  : m.maxW < m.w
                  ? (m.w - t * (n - 1)) / n
                  : m.vars.itemWidth > m.w
                  ? m.w
                  : m.vars.itemWidth),
              (m.visible = Math.floor(m.w / m.itemW)),
              (m.move =
                0 < m.vars.move && m.vars.move < m.visible
                  ? m.vars.move
                  : m.visible),
              (m.pagingCount = Math.ceil((m.count - m.visible) / m.move + 1)),
              (m.last = m.pagingCount - 1),
              (m.limit =
                1 === m.pagingCount
                  ? 0
                  : m.vars.itemWidth > m.w
                  ? m.itemW * (m.count - 1) + t * (m.count - 1)
                  : (m.itemW + t) * m.count - m.w - t))
            : ((m.itemW = m.w),
              (m.itemM = t),
              (m.pagingCount = m.count),
              (m.last = m.count - 1)),
          (m.computedW = m.itemW - m.boxPadding),
          (m.computedM = m.itemM);
      }),
      (m.update = function (e, t) {
        m.doMath(),
          x ||
            (e < m.currentSlide
              ? (m.currentSlide += 1)
              : e <= m.currentSlide && 0 !== e && --m.currentSlide,
            (m.animatingTo = m.currentSlide)),
          m.vars.controlNav &&
            !m.manualControls &&
            (("add" === t && !x) || m.pagingCount > m.controlNav.length
              ? d.controlNav.update("add")
              : (("remove" === t && !x) ||
                  m.pagingCount < m.controlNav.length) &&
                (x &&
                  m.currentSlide > m.last &&
                  (--m.currentSlide, --m.animatingTo),
                d.controlNav.update("remove", m.last))),
          m.vars.directionNav && d.directionNav.update();
      }),
      (m.addSlide = function (e, t) {
        (e = u(e)),
          (m.count += 1),
          (m.last = m.count - 1),
          g && h
            ? void 0 !== t
              ? m.slides.eq(m.count - t).after(e)
              : m.container.prepend(e)
            : void 0 !== t
            ? m.slides.eq(t).before(e)
            : m.container.append(e),
          m.update(t, "add"),
          (m.slides = u(m.vars.selector + ":not(.clone)", m)),
          m.setup(),
          m.vars.added(m);
      }),
      (m.removeSlide = function (e) {
        var t = isNaN(e) ? m.slides.index(u(e)) : e;
        --m.count,
          (m.last = m.count - 1),
          (isNaN(e)
            ? u(e, m.slides)
            : g && h
            ? m.slides.eq(m.last)
            : m.slides.eq(e)
          ).remove(),
          m.doMath(),
          m.update(t, "remove"),
          (m.slides = u(m.vars.selector + ":not(.clone)", m)),
          m.setup(),
          m.vars.removed(m);
      }),
      d.init();
  }),
    u(window)
      .blur(function (e) {
        a = !1;
      })
      .focus(function (e) {
        a = !0;
      }),
    (u.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      fadeFirstSlide: !0,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: "Previous",
      nextText: "Next",
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      customDirectionNav: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      isFirefox: !1,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      init: function () {},
      rtl: !1,
    }),
    (u.fn.flexslider = function (a) {
      if ("object" == typeof (a = void 0 === a ? {} : a))
        return this.each(function () {
          var e = u(this),
            t = a.selector || ".slides > li";
          (1 === (t = e.find(t)).length && !1 === a.allowOneSlide) ||
          0 === t.length
            ? (t.fadeIn(400), a.start && a.start(e))
            : void 0 === e.data("flexslider") && new u.flexslider(this, a);
        });
      var e = u(this).data("flexslider");
      switch (a) {
        case "play":
          e.play();
          break;
        case "pause":
          e.pause();
          break;
        case "stop":
          e.stop();
          break;
        case "next":
          e.flexAnimate(e.getTarget("next"), !0);
          break;
        case "prev":
        case "previous":
          e.flexAnimate(e.getTarget("prev"), !0);
          break;
        default:
          "number" == typeof a && e.flexAnimate(a, !0);
      }
    });
})(jQuery);
