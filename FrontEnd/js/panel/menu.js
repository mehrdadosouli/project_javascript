import { getAllMenu ,prepareMenuElem ,addNewMenuToList ,deleteHandler} from "./funcs/menus.js";
window.deleteHandler=deleteHandler;
const submitbtn=document.querySelector('#submit-btn')
window.addEventListener('load',()=>{
    getAllMenu()
    prepareMenuElem()
    submitbtn.addEventListener('click',(event)=>{
        event.preventDefault()
        addNewMenuToList()
    })

})