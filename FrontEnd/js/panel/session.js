import { getAllSessions , deleteHandler } from "./funcs/sessions.js";
window.deleteHandler=deleteHandler
window.addEventListener('load',()=>{
    getAllSessions()
})