const doctor = {
    doctorLogin(){
        return new Promise(function(resolve, reject){
            const doctorId = $("#login-username").val()
            const password = $("#login-password").val()
            const data = { doctorId, password };  
            $.ajax({
                url: "http://api.zhongnan.io/doc-login",
                type: "GET",
                data: data || "",
                success: (res)=>{
                    if (res.status == 'succ'){
                        console.log(res)
                        window.localStorage.setItem("token", res.token)
                        window.localStorage.setItem("doctor", JSON.stringify(res.doctor))
                        // resolve(res)
                    }else{
                        console.log(res.message)
                        reject(res)
                    }
                }
            });
        }); 
    },

    doctorLogout(){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: "http://api.zhongnan.io/doc-logout",
                type: "GET",
                success: (res)=>{
                    if (res.status == 'succ'){
                        console.log(res)
                        window.localStorage.removeItem("token")
                        window.localStorage.removeItem("doctor")
                        resolve(res)

                    }else{
                        console.log(res.message)
                        reject(res)
                    }
                }
            })
        })
    },

    doctorRegister(){
        return new Promise(function(resolve, reject){

            const doctorname = $("#register-username").val()
            const password = $("#register-password").val()
            const doctorId = $("#register-id").val()

            const data = { doctorname, doctorId, password }
            $.ajax({
                url: "http://api.zhongnan.io/doc-register",
                type: "POST",
                data: data,
                success: (res)=>{
                    if (res.status == 'succ'){
                        console.log(res.message)
                        resolve(res)
                    }else{
                        console.log(res.message)
                        reject(res)
                    }
                }
            })
        })
    },

    getCurrentDoctor(){
        if(window.localStorage.doctor)
            return JSON.parse(window.localStorage.doctor)
        else
            return null
    }
}