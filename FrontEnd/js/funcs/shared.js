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

const shareTopbarList=async()=>{
    const topbar__list=document.querySelector('.top-bar__list');
    const data=await fetch('http://localhost:4000/v1/menus/topbar');
    const res=await data.json();
    const shuffleArray=res.sort((a,b)=>0.5 - Math.random())
    console.log(0.5 - Math.random());
    topbar__list.innerHTML="";
    shuffleArray.splice(0,6).map(menu=>{
    topbar__list.innerHTML+=`<li class="top-bar__item">
    <a href="#" class="top-bar__item-link">${menu.title}</a>
  </li>`
    })

}

export{ userInfos , shareTopbarList }