$(function(){
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        pwd:[/^[\S]{6,12}$/ ,'密码必须是6~12位且不能出现空格'],
        repwd:function(value,item){
           var newPwd= $('.layui-form-item [name="newPwd"]').val();
           if(value !==newPwd)
           { return '密码不一致'}},
        newpwd:function(value) {
            var oldPwd= $('.layui-form-item [name="oldPwd"]').val();
            if(value ==oldPwd){
                return '新旧密码不能相同'
            }
           }

    })
    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        var oldPwd= $('.layui-form-item [name="oldPwd"]').val();
        var newPwd= $('.layui-form-item [name="newPwd"]').val();
        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data:{oldPwd:oldPwd,newPwd:newPwd},
            success: function(res){
                console.log(res);
                if(res.status!==0){return layer.msg('密码修改失败')}
                layer.msg('密码修改成功');
                $('.layui-form')[0].reset();
            }
        })
    })
    /*$('.layui-form-item [type="reset"]').on('click', function (e) {
        e.preventDefault();

    })*/
})