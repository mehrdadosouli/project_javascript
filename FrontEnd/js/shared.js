import { userInfos , shareTopbarList , getAndRenderCourses ,swipperSliderPopular, swipperSliderPresell ,getAndRenderArticle , getAndRenderMenu } from "./funcs/shared.js";
window.addEventListener('load',()=>{
    userInfos();
    shareTopbarList();
    getAndRenderCourses().then(data=>{
    const coursesAll=document.querySelector('#coursesAll');
    data.splice(0,6).map(course=>{
      console.log(course);
        coursesAll.insertAdjacentHTML('beforeend',`
        <div class="col-4">
        <div style="position:relative" class="course-box box">
        <div id="discount_elem" style="position:absolute;right:350px;color:red;border-radius:6px">${course.discount&&course.price ?` ${course.discount} تخفیف `: ""}</div>
          <a href="course.html?name=${course.shortName}" class="course__box-linkImg">
            <img src="http://localhost:4000/courses/covers/${course.cover}" alt="freelancer" class="course__box-img"/>
          </a>
          <a href="course.html?name=${course.shortName}">
            <h4 class="course__box-title">${course.name}</h4>
          </a>
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
           ${course.price === 0 ? "رایگان" : (!course.price==0 && course.discount)&&`
            <div>
               <span class="">${course.price - (course.price * course.discount / 100)}</span>
               <span style="text-decoration: line-through" class="course__box-userPrice">${course.price.toLocaleString()}</span>
            </div>
          `
          }
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
    })
    swipperSliderPresell();
    swipperSliderPopular();
    getAndRenderArticle();
    getAndRenderMenu()

    
})  
