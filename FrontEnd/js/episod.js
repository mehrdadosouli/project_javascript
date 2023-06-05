import { getandshowepisodecourse,userInfos } from "../js/funcs/shared.js";
const accordion = document.querySelector('#accordionExample');
window.addEventListener('load', () => {
    userInfos();
    getandshowepisodecourse().then(course => {
      course.sessions.forEach((item,index)=>{
       accordion.insertAdjacentHTML('beforeend',`
            <div class="accordion-course">
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
              data-bs-parent="#accordionExample">
              <div class="accordion-body accordion-body1">
              <div class="accordion-body-headers">
              <span class="accordion-body__number">${index+1}</span>
              <i class="accordion-body__icon fab fa-youtube"></i>
              ${
                (item.free)?
                `<a href="episod.html?name=${course.session.shortName}&id=${course.session._id}" class="accordion-body__title">${item.title}</a>` 
                : 
                `<span class="accordion-body__title">${item.title}</span>` 
              }
              
            </div>
            <div class="accordion-body-timer">
            ${
                (item.free)?
                `
                <span class="accordion-body__time">${item.time}</span>
                <i class="fa fa-lock-open"></i>
                `:
                `
                <span class="accordion-body__time">${item.time}</span>
                <i class="fa fa-lock"></i>
                `
            }
              
            </div>
                
              </div >
            </div >
          </div >
                
       `)    
    })
})
})