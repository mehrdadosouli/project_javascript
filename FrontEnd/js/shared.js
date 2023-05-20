import { userInfos , shareTopbarList , getAndRenderCourses } from "./funcs/shared.js";
window.addEventListener('load',()=>{
    userInfos();
    shareTopbarList();
    getAndRenderCourses().then(data=>{console.log(data);
    data.splice(0,6).map(course=>{
        coursesAll.insertAdjacentHTML('beforeend',`
        <div class="col-4">
        <div class="course-box box">
          <a href="#" class="course__box-linkImg">
            <img
              src="../image/courses/jango.png"
              alt="freelancer"
              class="course__box-img"
            />
          </a>
          <h4 class="course__box-title">${course.name}</h4>
          <div class="course__box-status">
            <div class="course__box-teacher">
              <i class="course__box-icon fas fa-chalkboard-teacher"></i>
              <a href="#" class="course__box-teacherLink">${course.creator}</a>
            </div>
            <div class="course__box-rating">
              <img
                src="../image/svg/star.svg"
                alt="rating"
                class="course__box-ratingIcon"
              />
              <img
                src="../image/svg/star_fill.svg"
                alt="rating"
                class="course__box-ratingIcon"
              />
              <img
              alt="rating"
              src="../image/svg/star_fill.svg"
                class="course__box-ratingIcon"
              />
              <img
                src="../image/svg/star_fill.svg"
                alt="rating"
                class="course__box-ratingIcon"
              />
              <img
                src="../image/svg/star_fill.svg"
                alt="rating"
                class="course__box-ratingIcon"
              />
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
})
