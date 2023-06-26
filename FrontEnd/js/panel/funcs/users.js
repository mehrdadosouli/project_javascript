import { getToken, showswall  } from "../../funcs/utils.js";

const getAndRenderUser=async()=>{
    const res=await fetch(`http://localhost:4000/v1/users`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    });
    const data=await res.json();
    return data
}
let usernameinput=document.querySelector('#usernameinput')
let userfamilyinput=document.querySelector('#userfamilyinput')
let userpassinput=document.querySelector('#userpassinput')
let userphoneinput=document.querySelector('#userphoneinput')

const createUserHandler=()=>{
    let infouser={
        name: usernameinput.value.trim(),
        username: userfamilyinput.value.trim(),
        email: userfamilyinput.value.trim(),
        phone:userphoneinput.value.trim(),
        password: userpassinput.value.trim(),
        confirmPassword:userpassinput.value.trim()
    }
      fetch('http://localhost:4000/v1/auth/register', {
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(infouser)
    }).then(res=>{
        if(res.status==201){
            showswall("با موفقیت ثبت نام انجام شد.","success","ورود به پنل",()=>{
                location.href="http://127.0.0.1:5500/FrontEnd/html/index.html"
            })
        }else if(res.status==409){
            showswall("شما با این اسم یا ایمیل قبلا ثبت نام کرده اید","error","تصحیح اطلاعات",()=>{})
        }
        return res.json()})
}

export { getAndRenderUser , createUserHandler }