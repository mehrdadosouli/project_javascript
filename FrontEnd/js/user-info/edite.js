import { getAndRenderEdite , changeInfoUser} from "../user-info/funcs/edites.js";
let edit__btn=document.querySelector('.edit__btn')
window.addEventListener('load',()=>{
    getAndRenderEdite()
    edit__btn.addEventListener('click',(event)=>{
        event.preventDefault();
        changeInfoUser()
    })
})