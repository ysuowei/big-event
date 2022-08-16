$(function(){
    function getuserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            
            //headers:{Authorization: localStorage.getItem('token')|| ''},
            success:function(res){
                console.log(res);
                if(res.status!==0)
                {return layui.layer.msg('获取用户信息失败')}
                rederAvatar(res)
            },
            complete:function(res){
                //无论请求是否成功，都会调用complete函数
                if(res.responseJSON.status==1 && res.responseJSON.message  === '身份认证失败！')
                {
                    //清空本地会话token
                    localStorage.removeItem('token');
                    //跳转login.html
                    location.href='login.html';
                }
            }

        })
    }
    getuserinfo();
    //渲染用户数据
    function rederAvatar(res) {
        var name=res.data.nickname||res.data.username;
        $(".welcome").html('欢迎&nbsp;&nbsp;'+name);
        if(res.data.user_pic){
            $('.text-avatar').hide();
            $('.layui-nav-img').attr('src',res.data.user_pic).show();

        }else{
            //$('.text-avatar').show();
            $('.layui-nav-img').hide();
            var first =name[0].toUpperCase();
            $('.text-avatar').html(first);

        }
    }
    $('.lay-nav-out').on('click', function(){
        layui.layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清除本地token
            localStorage.removeItem('token');
            //跳转login页面
            location.href='login.html';
            layer.close(index);
          });
    })
})