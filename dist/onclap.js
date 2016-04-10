(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.onClap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = onClap;

function onClap(el, fn, config) {
  var touchStartTime;
  var startPos;
  config = config || {};
  if (typeof config.maxSingleTouchTime !== 'number') {
    config.maxSingleTouchTime = 300; // ms
  }
  if (typeof config.singleTapDistanceSquared !== 'number') {
    config.singleTapDistanceSquared = 25;
  }

  if (typeof fn !== 'function') throw new Error('callback is required') 

  el.addEventListener('click', invokeHandler)

  el.addEventListener('touchend', handleTouchEnd)
  el.addEventListener('touchstart', handleTouchStart)

  return disposePrevHandler;

  function handleTouchStart(e) {
    var touches = e.touches

    if (touches.length === 1) {
      touchStartTime = new Date()
      startPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    }
  }

  function handleTouchEnd(e) {
    // multitouch - ignore
    if (e.touches.length > 1) return

    // single touch - use time diference to determine if it was a touch or
    // a swipe
    var dt = new Date() - touchStartTime

    // To long - ignore
    if (dt > config.maxSingleTouchTime) return

    var dx = e.pageX - startPos.x
    var dy = e.pageY - startPos.y

    if (dx * dx + dy * dy < config.singleTapDistanceSquared) {
      invokeHandler(e)
    }
  }

  function disposePrevHandler() {
    el.removeEventListener('click', invokeHandler)
    el.removeEventListener('touchend', handleTouchEnd)
    el.removeEventListener('touchstart', handleTouchStart)
  }

  function invokeHandler(e) {
    fn(e)
  }
}

},{}]},{},[1])(1)
});