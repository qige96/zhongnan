
function patientLogin(){
    return new Promise(function(resolve, reject){
        const userId = $("#userId").val()
        const password = $("#password").val()
        const data = { userId, password };  
        $.ajax({
            url: "http://api.zhongnan.io/login",
            type: "GET",
            data: data || "",
            success: (res)=>{
                if (res.status == 'succ'){
                    console.log(res)
                    window.localStorage.setItem("token", res.token)
                    $("#loginButton > span").text(res.user.userId)
                }else{
                    console.log(res.message)
                }
            }
        });
    });
    
}

function patientLogout(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "http://api.zhongnan.io/logout",
            type: "GET",
            success: (res)=>{
                if (res.status == 'succ'){
                    console.log(res)
                    window.localStorage.setItem("token", null)
                }else{
                    console.log(res.message)
                }
            }
        })
    })
}

function patientRegister(userId, password, gender="male", age=18){
    return new Promise(function(resolve, reject){
        const data = { userId, password, gender, age }
        $.ajax({
            url: "http://api.zhongnan.io/register",
            type: "POST",
            data: data,
            success: (res)=>{
                if (res.status == 'succ'){
                    console.log(res.message)
                }else{
                    console.log(res.message)
                }
            }
        })
    })
}

function login(){
    const userId = $("#userId").val()
    const password = $("#password").val()
    patientLogin(userId, password)
}

patient = {
    patientLogin,
    patientLogout,
    patientRegister,
    login,
}