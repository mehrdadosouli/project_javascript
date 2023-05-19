import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";
const userInfos=()=>{
    const navbarUserbtn=document.querySelector('.main-header__left-login');
    const islogin=isLogin();
    if(islogin){
        getMe().then((data)=>{
            navbarUserbtn.setAttribute('href',"index.html");
            navbarUserbtn.innerHTML=`<span class="login-text">${data.name}</span>`
        })
    }else{
        navbarUserbtn.setAttribute('href',"login.html");
        navbarUserbtn.innerHTML='<span class="login-text">ورود/ ثبت نام</span>'
    }
}

export{ userInfos }