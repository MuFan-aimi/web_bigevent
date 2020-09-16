$(function () {
    getUserInfo()

    $('#gohome').on('click', function () {
        localStorage.removeItem('token')
        location.href = '/day1/案列练习/login.html'
    })
})


// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败 最终都会调用complete函数

        // complete: function (res) {
        //     // 执行了complete 回调
        //     // console.log(res);
        //     // 在 complete 回调函数中  可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！') {
        //         //   1.强制清空 token 
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转 login
        //         location.href = '/day1/案列练习/login.html'
        //     }
        // }

    })
}

// 渲染用户的头象信息
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎文本 
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染文本头像
    if (user.user_pic !== null) {
        // 3.①  渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.② 渲染文本头像
        $('.layui-nav-img').hide()
        // toUpperCase 转换为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}