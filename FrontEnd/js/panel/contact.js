import { getAllContact , showList,answerList } from "./funcs/contacts.js";

window.showList=showList
window.answerList=answerList
window.addEventListener('load',()=>{

    getAllContact();

})