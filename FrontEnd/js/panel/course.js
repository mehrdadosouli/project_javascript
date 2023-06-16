import { getAllCourses ,getCategory} from "./funcs/courses.js";

window.addEventListener('load',()=>{
    getAllCourses()
    getCategory().then(res=>console.log(res))
})