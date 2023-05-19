import { showswall,settoLocalStorage , getToken } from "./utils.js";
const register = () => {
    let nameInput = document.querySelector('#name');
    let usernameInput = document.querySelector('#username');
    let emailInput = document.querySelector('#email');
    let phoneInput = document.querySelector('#phone');
    let passwordInput = document.querySelector('#password');
    let confirmPasswordInput = document.querySelector('#confirmPassword');

    const newUserInfo = {
        name:nameInput.value.trim(),
        username:usernameInput.value.trim(),
        email:emailInput.value.trim(),
        phone:phoneInput.value.trim(),
        password:passwordInput.value.trim(),
        confirmPassword:confirmPasswordInput.value.trim() 
    };
    fetch(`http://localhost:4000/v1/auth/register`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newUserInfo)
    })
    .then(res=>{console.log(res);
        if(res.status==201){
            showswall("با موفقیت ثبت نام انجام شد.","success","ورود به پنل",()=>{
                location.href="http://127.0.0.1:5500/FrontEnd/html/index.html"
            })
        }else if(res.status==409){
            showswall("شما با این اسم یا ایمیل قبلا ثبت نام کرده اید","error","تصحیح اطلاعات",()=>{})
        }
        return res.json()})
    .then(data=>settoLocalStorage('user',{token:data.accessToken})
    )
}

const login=()=>{
    const identifierInput=document.querySelector('#identifier')
    const passwordInput=document.querySelector('#password')
const userinfos={
    identifier:identifierInput.value.trim(),
    password:passwordInput.value.trim()
}

    fetch(`http://localhost:4000/v1/auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userinfos)
    })
    .then(res=>{
        console.log(res);
        if(res.status==401){
            showswall(" نام کاربری یا پسورد اشتباه است","error","تصحیح اطلاعات",()=>{})
        }else if(res.status==200){
            showswall("با موفقیت لاگین انجام شد.","success","ورود به پنل",()=>{
                location.href="http://127.0.0.1:5500/FrontEnd/html/index.html"
            })
        }
       return res.json()})
        .then(data=>settoLocalStorage('user',{token:data.accessToken}))
}

const getMe=async()=>{
    const tokens=getToken()
    if(!tokens){
        return false
    }
   const res=await fetch(`http://localhost:4000/v1/auth/me`,{
        headers:{
            Authorization:`Bearer ${tokens}`
        }
    })
    const data=await res.json()
    return data
}

export {register , login , getMe}