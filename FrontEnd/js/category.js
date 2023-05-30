import { getAndShowCategoryCourses, getAndRenderMenu, shareTopbarList, userInfos, showTemplatecourses,showFilteringcourses } from "./funcs/shared.js";
import { searchInputValue } from "./funcs/utils.js";
window.addEventListener('load', () => {
    shareTopbarList()
    getAndRenderMenu()
    userInfos()
    getAndShowCategoryCourses().then(data => {
        const categorycourscontents = document.querySelector('.courses-top-bar__selection-contents');
        const categorycourseSelection = document.querySelectorAll('.courses-top-bar__selection-item');
        const coursesBox = document.getElementById('courses-box');
        let course = [...data];
        let bydefault = 'column';
        // ------------------------------first load page show category items----------------------
        if (course.length) {
            course.forEach(course => {
                coursesBox.insertAdjacentHTML('beforeend', `
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
                    ${Array(5 - course.courseAverageScore).fill(0).map(res => `<img src="../image/svg/star.svg" alt="rating" class="course__box-ratingIcon"/>`).join('')}
                    ${Array(course.courseAverageScore).fill(0).map(res => `<img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>`).join('')}
              
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
        } else {
            coursesBox.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                <div class="course-box box">
                  <span>ایتمی موجود نیست</span>
                </div>
              </div>
                `)
        }
         // selection row and column selectbtn
         
        const topbarright = document.querySelectorAll('.courses-tab-bar');
        topbarright.forEach(item => {
            item.addEventListener('click', (event) => {
                topbarright.forEach(elem => {
                    elem.classList.remove('top-bar__right-column-active')
                })
                event.target.classList.add('top-bar__right-column-active');
                if (event.target.className.includes('row')) {
                    bydefault = 'row';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault, coursesBox, course)
                } else {
                    bydefault = 'column';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault, coursesBox, course)
                }
            })
            
        })
        // selection input filtering selectbox
        categorycourseSelection.forEach(item => {
            item.addEventListener('click', (event) => {
                categorycourseSelection.forEach(elem => { elem.classList.remove('top-bar__selection-item-active') });
                event.target.classList.add('top-bar__selection-item-active');
                categorycourscontents.innerHTML = "";
                categorycourscontents.insertAdjacentHTML('beforeend', `
                <span class="courses-top-bar__selection-text">
                    ${event.target.innerHTML}
                </span>
                <i class="courses-top-bar__selection-icon-down fas fa-angle-down"></i>
                `);
                const elementSelected=event.target.dataset.key;
                const showfilter= showFilteringcourses(elementSelected,[...course]);
                showTemplatecourses(bydefault,coursesBox,showfilter);
            })
        })
        // ---select input search box for courses
        const inputsearchvalue=document.querySelector('.courses-top-bar__left-input');
        inputsearchvalue.addEventListener('input',(event)=>{
                const result=event.target.value;
               const resultinputfilter= searchInputValue(course,result);
                       if(!resultinputfilter.length){
                        coursesBox.innerHTML="";
                        coursesBox.insertAdjacentHTML('beforeend',`
                            <div style="width:100%;background-Color:#004aff75;height:30px;color:white">هیچ ایتمی وجود ندارد</div>
                        `)
                    }else{
                        showTemplatecourses(bydefault, coursesBox,resultinputfilter);
                       }
            })
    })
})