//    注意！ 发起  Ajax 请求的时候都会 先调用 这个函数
//  在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    // console.log(options.url);
    //  再发起真正的ajax请求之前  统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    // indexOf 查找索引
    if (options.url.indexOf('/my/') !== 0) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一的挂载 complete 回调
    options.complete = function (res) {
        // 执行了complete 回调
        // console.log(res);
        // 在 complete 回调函数中  可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // console.log(1111);

            //   1.强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转 login
            location.href = '/day1/案列练习/login.html'
        }
        // console.log(2222);

    }


})