import { login,getMe } from "./funcs/auth.js";
const login_btn=document.querySelector('.form-login__btn-submit-login');
login_btn.addEventListener('click',(event)=>{
    event.preventDefault();
    login()
    getMe()
})