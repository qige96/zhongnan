const utils = {
    authGet (url, data){
        return new Promise(function(resolve, reject){
            let result;
            $.ajax({
                url: url,
                type: "GET",
                data: data || "",
                beforeSend: (req)=>{
                    req.setRequestHeader('Authorization', "Bearer "+window.localStorage.getItem("token"))
                },
                success: (res)=>{
                    console.log(res)
                    result = res
                    resolve(res)
                }
            })
            return result
        })
    },

    authPost (url, data){
        return new Promise(function(resolve, reject){
            let result;

            $.ajax({
                url: url,
                type: "POST",
                data: data || "",
                beforeSend: (req)=>{
                    req.setRequestHeader('Authorization', "Bearer "+window.localStorage.getItem("token"))
                },
                success: (res)=>{
                    console.log(res)
                    result = res
                    resolve(res)
                }
            })

            return result
        })
    },

    getCurrentUser(){
        if(window.localStorage.user){
            return JSON.parse(window.localStorage.user);
        }else{
            return null;
        }
    }

}

