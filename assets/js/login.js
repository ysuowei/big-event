$(function() {
    $(".login ").on("click", function(){
        $(".login").hide();
        $(".login-reg").show();
        $('.login-form').hide();
        $('.login-reg-from').show();
    })
    $(".login-reg").on("click", function(){
        $(".login-reg").hide();
        $(".login").show();
        $('.login-form').show();
        $('.login-reg-from').hide();
    })
    var form=layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'

        ],
        repwd:function(value){
            var pwd=$('#password-reg').val();
            if(value!==pwd){return'两次输入的密码不一致！'}

            
        }
    })
    $('#form_reg').on('submit', function(e){
        e.preventDefault();
        var uname=$('#form_reg [name="uname"]').val();
        var pwd=$('#form_reg [name="password"]').val();
        $.ajax({
            url:'/api/reguser',
            method:'POST',
            data:{username:uname,password:pwd},
            success: function(res){
                if(res.status!==0){return "注册失败"}
                console.log(res.message);
                //$('#form_reg input').val('');
                var layer=layui.layer;
                
                return layer.msg(res.message+'，请登录');
                

            }
            
        })
        $('.login-reg').click();
         $('#from_login [name="uname"]').val(uname);
         $('#from_login [name="password"]').val(pwd);
    })
    $('#from_login').on('submit',function(e){
        e.preventDefault();
        var uname=$('#from_login [name="uname"]').val();
         var pwd=$('#from_login [name="password"]').val();
         $.ajax({
            url:'/api/login',
            method:'POST',
            //data:{$(this).serialize()},快速获取表单信息
            data:{username:uname,password:pwd},
            success:function(res){
                console.log(res);
                var layer=layui.layer;
                
                
                if(res.status!==0)
                {return layer.msg(res.message)}
                layer.msg(res.message);
               // console.log(res.token);
               //存储到本地
                localStorage.setItem('token',res.token);
                //跳转页面
                location.href='index.html';
            }
         })
    })
    
})

