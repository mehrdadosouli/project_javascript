import { getAllContact , showList,answerList ,deleteBtn} from "./funcs/contacts.js";

window.showList=showList
window.answerList=answerList
window.deleteBtn=deleteBtn
window.addEventListener('load',()=>{

    getAllContact();

})