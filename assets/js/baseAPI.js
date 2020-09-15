//    注意！ 发起  Ajax 请求的时候都会 先调用 这个函数
//  在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    // console.log(options.url);
    //  再发起真正的ajax请求之前  统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})