import { register } from "../js/funcs/auth.js";
let submitButton=document.querySelector('.form-login__btn-submit-login');
submitButton.addEventListener('click',(event)=>{
    event.preventDefault();
    register();
    console.log('register');
})
