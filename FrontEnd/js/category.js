import { getAndShowCategoryCourses,getAndRenderMenu,shareTopbarList,userInfos,showTemplatecourses } from "./funcs/shared.js";
window.addEventListener('load',()=>{
    shareTopbarList()
    getAndRenderMenu()
    userInfos()
    getAndShowCategoryCourses().then(data=>{
        const coursesBox = document.getElementById('courses-box');
        let course=[...data];
        let bydefault='row';
        if(course.length){
            course.forEach(course=>{
                coursesBox.insertAdjacentHTML('beforeend',`
                <div class="col-4">
                <div class="course-box box">
                  <a href="#" class="course__box-linkImg">
                    <img src="../image/courses/${course.cover}" alt="freelancer" class="course__box-img"/>
                  </a>
                  <h4 class="course__box-title">${course.name}</h4>
                  <div class="course__box-status">
                    <div class="course__box-teacher">
                      <i class="course__box-icon fas fa-chalkboard-teacher"></i>
                      <a href="#" class="course__box-teacherLink">${course.creator}</a>
                    </div>
                    <div class="course__box-rating">
                    ${Array(5 - course.courseAverageScore).fill(0).map(res=>`<img src="../image/svg/star.svg" alt="rating" class="course__box-ratingIcon"/>`).join('')}
                    ${Array(course.courseAverageScore).fill(0).map(res=>`<img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>`).join('')}
              
                    </div>
                  </div>
                  <div class="course__box-users">
                    <div class="course__box-user">
                      <i class="course__box-userIcon fas fa-users"></i>
                      <span class="course__box-userStudents">${course.registers}</span>
                    </div>
                    <span class="course__box-userPrice">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
                  </div>
                  <div class="course__box-info">
                    <a href="#" class="course__boxinfoLink"
                      >مشاهده اطلاعات
                      <i class="course__box-infoIcon fas fa-arrow-left"></i>
                    </a>
                  </div>
                </div>
              </div>
                `)
              })
        }else{
                coursesBox.insertAdjacentHTML('beforeend',`
                <div class="col-4">
                <div class="course-box box">
                  <span>ایتمی موجود نیست</span>
                </div>
              </div>
                `)
              
        }
        const topbarright=document.querySelectorAll('.courses-tab-bar');
        topbarright.forEach(item=>{
            item.addEventListener('click',(event)=>{
                topbarright.forEach(elem=>{
                    elem.classList.remove('top-bar__right-column-active')
                })
                event.target.classList.add('top-bar__right-column-active')
                console.log(event.target.className.includes('row'));
                if(event.target.className.includes('row')){
                    bydefault='row';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault,coursesBox,course)
                }else{
                    bydefault='column';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault,coursesBox,course)
                }
            })
           
        })
        

    })
    
})