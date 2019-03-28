
const authGet = function(url, data){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                type: "GET",
                data: data || "",
                beforeSend: (req)=>{
                    req.setRequestHeader('Authorization', "Bearer "+window.localStorage.getItem("token"))
                },
                success: (res)=>{
                    console.log(res)
                }
            })
        })
    };

const authPost = function(url, data){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                type: "POST",
                data: data || "",
                beforeSend: (req)=>{
                    req.setRequestHeader('Authorization', "Bearer "+window.localStorage.getItem("token"))
                },
                success: (res)=>{
                    console.log(res)
                }
            })
        })
    };



utils = {
    authGet,
    authPost,
}