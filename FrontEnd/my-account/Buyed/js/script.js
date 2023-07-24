import { shareTopbarList , getAndRenderMenu , userInfos } from "../../../js/funcs/shared.js"
let $=document
let timeCounter = $.querySelector('#time-counter');
let learnCounter = $.querySelector('#learn-counter');
let userCounter = $.querySelector('#user-counter');
let topbarPhone = $.querySelector('#top-bar__phone-link');
let topbarEmail = $.querySelector('#top-bar__email-linK');


window.addEventListener('load',()=>{
    shareTopbarList()
    getAndRenderMenu()
    userInfos()
    infoInfoPage()
})


async function infoInfoPage(){
    const res = await fetch('http://localhost:4000/v1/infos/index')
    const data = await res.json();
    topbarPhone.innerHTML=data.phone
    topbarEmail.innerHTML=data.email

}