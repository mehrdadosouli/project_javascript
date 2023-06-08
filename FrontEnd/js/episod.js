import { getandshowepisodecourse,userInfos } from "../js/funcs/shared.js";


window.addEventListener('load', () => {
    userInfos();
    getandshowepisodecourse().then(course => {
      console.log(course);
     
})
})