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
