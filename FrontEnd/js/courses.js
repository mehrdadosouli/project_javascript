import { userInfos,getanshowAllCourses,getAndRenderMenu ,showTemplatecourses} from "../js/funcs/shared.js";
import { paginationCategory,getUrlParams,handlepagination } from "./funcs/utils.js";
const coursebox=document.querySelector('#courses-box');

window.handlepagination=handlepagination
window.addEventListener('load',()=>{
    
    userInfos();
    getAndRenderMenu()
    getUrlParams()
    const geturl=getUrlParams('page');
    getanshowAllCourses().then(course=>{ 
        let bydefault = 'column';
        let coursee = [...course];
        console.log(coursee);
        const pagination=paginationCategory(5,coursee,geturl); 
        showTemplatecourses(bydefault,coursebox,pagination)
    })
})

