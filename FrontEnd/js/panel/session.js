import { getAllSessions , deleteHandler , getCourses , createSessions} from "./funcs/sessions.js";
window.deleteHandler=deleteHandler;

const createSession=document.querySelector('#create-session')
window.addEventListener('load',()=>{
    getAllSessions()
    getCourses();
    createSession.addEventListener('click',(event)=>{
        event.preventDefault();
        createSessions()
    })
    
})