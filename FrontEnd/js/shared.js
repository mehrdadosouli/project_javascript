import { userInfos , shareTopbarList , getAndRenderCourses ,swipperSliderPopular, swipperSliderPresell ,getAndRenderArticle , getAndRenderMenu } from "./funcs/shared.js";
window.addEventListener('load',()=>{
    userInfos();
    shareTopbarList();
    getAndRenderCourses().then(data=>{
    const coursesAll=document.querySelector('#coursesAll');
    data.splice(0,6).map(course=>{
        coursesAll.insertAdjacentHTML('beforeend',`
        <div class="col-4">
        <div class="course-box box">
          <a href="course.html?name=${course.shortName}" class="course__box-linkImg">
            <img src="../image/courses/${course.cover}" alt="freelancer" class="course__box-img"/>
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
    })
    swipperSliderPresell();
    swipperSliderPopular();
    getAndRenderArticle();
    getAndRenderMenu()
})  
