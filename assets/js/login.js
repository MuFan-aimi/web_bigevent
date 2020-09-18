$(function () {
    // 点击 ‘去注册账号’的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 ‘去登录’的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 效验规则
    form.verify({
        //  自定义了一个叫做pwd效验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证两次密码是否一致
        repwd: function (value) {
            //    通过形参拿到的是确认密码框里的值
            // 还需要获取到密码框的值
            // 然后进行对比
            //  如果对比失败 则 return  一个提示框  提示失败
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认行为
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        // 发起 ajax  POST请求
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    //   layui 里的提示组件 layer.msg
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟点击行为
                $('#link_login').click()
            })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止表单提交的默认行为
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res.token);
                layer.msg('登录成功！')
                // 将出入许可证存入本地存储
                localStorage.setItem('token', res.token)
                location.href = '/day1/案列练习/index.html'
            }
        })
    })

})