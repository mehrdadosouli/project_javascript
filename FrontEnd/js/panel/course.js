import { getAllCourses } from "./funcs/courses.js";

window.addEventListener('load',()=>{
    getAllCourses().then(res=>{
        console.log(res);
    })
})