window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus')
    var ul = focus.children[0];
    // 获得focus的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 1.自动播放图片
    // 利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function () {
        index++
        // 为了有动画效果，添加过渡
        ul.style.transition = 'all .3s'
        var translateX = -index * w
        ul.style.transform = 'translateX(' + translateX + 'px)'
    }, 2000)
    ul.addEventListener('transitionend', function () {
        // 2.无缝滚动
        if (index >= 3) {
            // 自动播放图片要到拷贝到第一张图片（现最后一张图），快速跳转到原第一张图片
            index = 0
            // 并去掉原有的过渡
            ul.style.transition = 'none'
            // 用新的索引号重新开始过渡，滚动图片
            var translateX = -index * w
            ul.style.transform = 'translateX(' + translateX + 'px)'
        } else if (index < 0) {
            index = 2
            // 去掉原有的过渡
            ul.style.transition = 'none'
            // 用新的索引号重新开始过渡，滚动图片
            var translateX = -index * w
            ul.style.transform = 'translateX(' + translateX + 'px)'
        }
        // 3.小圆点跟随变化效果
        // 把ol里面li带有current类名的选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current')
        // 让当前索引号的小li加上current  add
        ol.children[index].classList.add('current')
    })
    // 4.手指滑动轮播图
    var startx = 0;//手指左右滑动图片，不需要上下y轴
    var movex = 0; //定义全局变量，后面还需要使用到
    var flag = false;//使用节流阀，更严谨，用户手指长按但不移动时不做判断效果
    // 触摸元素touchstart:获取手指初始坐标
    ul.addEventListener('touchstart', function (e) {
        startx = e.targetTouches[0].pageX
        // 手指触摸时停止定时器，取消自动播放
        clearInterval(timer)
    })
    // 移动手指touchmove:计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        movex = e.targetTouches[0].pageX - startx
        // 移动盒子：盒子原来的位置+手指移动的距离
        var translateX = -index * w + movex
        // 手指滑动时，不需要动画效果，所以需要取消过渡效果
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translateX + 'px)'
        flag = true; // 用户手指移动时再触发手指离开判断上一张/下一张
        e.preventDefault() //阻止滚动屏幕行为
    })
    // 手指离开，根据移动距离判断是回弹还是播放上一张/下一张
    ul.addEventListener('touchend', function () {
        if (flag) {
            // 1)如果移动距离大于50px就播放上一张/下一张
            // 左滑，移动距离movex为负值；右滑，移动距离movex为正值。因此需要添加绝对值进行判断
            if (Math.abs(movex) > 50) {
                if (movex > 0) {
                    // 右滑，上一张
                    index--
                } else {
                    // 左滑，下一站
                    index++
                }
                // 用新的索引号重新开始过渡，滚动图片
                var translateX = -index * w
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translateX + 'px)'
            } else {
                // 2)如果移动距离小于等于50px就回弹,回弹过渡时间可以更短些，更自然
                var translateX = -index * w
                ul.style.transition = 'all .1s'
                ul.style.transform = 'translateX(' + translateX + 'px)'
            }
        }
        // 手指离开时，开启定时器自动播放
        clearInterval(timer);//清除定时器，保证待会只有一个定时器开启
        timer = setInterval(function () {
            index++
            // 为了有动画效果，添加过渡
            ul.style.transition = 'all .3s'
            var translateX = -index * w
            ul.style.transform = 'translateX(' + translateX + 'px)'
        }, 2000)
    })

    // 返回顶部
    var nav = document.querySelector('.local-nav')
    var goBack = document.querySelector('.goBack')
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block'
        } else {
            goBack.style.display = 'none'
        }
    })
    goBack.addEventListener('click', function () {
        window.scroll(0, 0)
        // 添加返回动画更加
    })
})