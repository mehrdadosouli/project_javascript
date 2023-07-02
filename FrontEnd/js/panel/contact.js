import { getAllContact , showList } from "./funcs/contacts.js";
window.showList=showList
window.addEventListener('load',()=>{
    getAllContact()
})