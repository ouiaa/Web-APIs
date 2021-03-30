(function flexible(window, document) {
  // 获取html的根元素
  var docEl = document.documentElement
  // dpr物理像素比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size 设置body字体大小
  function setBodyFontSize() {
    if (document.body) {
      // 页面若有body，则设置字体大小
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      // 页面若无body，则等待DOM加载完再设置字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10 设置html元素字体大小
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize 页面尺寸发生变化时重新设置rem大小
  window.addEventListener('resize', setRemUnit)
  // pageshow 重新加载就会触发事件
  window.addEventListener('pageshow', function (e) {
    // e.persisted返回的是true，说明该页面是从缓存取过来的内容，也会重新计算rem大小
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports 有些移动端不支持0.5像素，下面是解决方案
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
