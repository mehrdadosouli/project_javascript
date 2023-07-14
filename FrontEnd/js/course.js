import { getCourseDetails, getandshowslidercourse,userInfos, commentinput  } from "../js/funcs/shared.js";
import { getToken, showswall } from "./funcs/utils.js";

const breadcrumb = document.querySelector('#bread-crumb__link-course');
const breadcrumbtitle = document.querySelector('#bread-crumb__link-title');
const courseinfo = document.querySelector('.course-info__right-side-title-link');
const courseinfoheading = document.querySelector('.course-info__right-side-heading');
const coursedescription = document.querySelector('#course-box__description');
const coursedescriptiondate = document.querySelector('#course-box__date');
const courseboxsuport = document.querySelector('#course-box__suport');
const courseboxstext = document.querySelector('.course-info__right-side-text');
const courseboxvideo = document.querySelector('.course-info__left-side-video');
const studentinformation = document.querySelector('.course-information-student__text');
const studentregisterbtn = document.querySelector('.course-information-student');
const courseviewtext = document.querySelector('.course-point-of-view__text');
const coursenumberstudents = document.querySelector('.course-information__number-students');
const accordion = document.querySelector('#accordionExample');
const courseproduct = document.querySelector('.course-products');
const commentbtn = document.querySelector('.comment-btn');
const courseinfos = document.querySelector('.course-infos');
studentregisterbtn.addEventListener('mouseenter',()=>{
  studentregisterbtn.style.cursor="pointer"
})
window.addEventListener('load', () => {
    userInfos();
    getCourseDetails().then(course => {
        breadcrumb.innerHTML = `اموزش ${course.categoryID.title}`;
        breadcrumbtitle.innerHTML = `${course.name}`;
        courseinfo.innerHTML = `اموزش ${course.categoryID.title}`;
        courseinfoheading.innerHTML = `${course.name} برای کار `;
        coursedescription.innerHTML = `${course.isComplete ? "دوره در حال برگذاری است" : "دوره به اتمام رسیده"} `;
        coursedescriptiondate.innerHTML = `${course.updatedAt.slice(0, 10)}`;
        courseboxsuport.innerHTML = `${course.support}`;
        courseboxstext.innerHTML = `${course.description}`;
        courseboxvideo.poster = `../image/courses/${course.cover}`;
        if(!course.isUserRegisteredToThisCourse){
          studentinformation.innerHTML = 'ثبت نام کنید';
          studentregisterbtn.addEventListener('click',()=>{
            if(course.price==0){
            showswall("ایا میخواهید ثبت نام کنید؟","success",["نه","اره"],async(res)=>{
              console.log(course);
              if(res){
                  let contentregister={
                    price:0
                  }
                  const result=await fetch(`http://localhost:4000/v1/courses/${course._id}/register`,{
                    method:"POST",
                    headers:{
                      Authorization:`Bearer ${getToken()}`,
                      "Content-Type":"application/json"
                    },
                    body:JSON.stringify(contentregister)
                  })
                  if(result.ok){
                    showswall("با موفقیت ثبت نام شدید","success","ok",()=>{
                      location.reload()
                    })
                  }
                }
              })
              }
          })
          
        }else{
          studentinformation.innerHTML = 'شما دانشجوی دوره هستید';

        }
        // ${course.isUserRegisteredToThisCourse ? "شما دانشجوی دوره هستید" : "ثبت نام کنید"}
        courseviewtext.innerHTML = `${course.support}`;
        coursenumberstudents.innerHTML = `${course.courseStudentsCount}`;
        renderComments(course)
        if (course.sessions.length) {
            course.sessions.forEach((item, index) => {
            accordion.insertAdjacentHTML('beforeend', `
            <div class="accordion-item">
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
              data-bs-parent="#accordionExample">
              <div class="accordion-body accordion-body1">
              <div class="accordion-body-headers">
              <span class="accordion-body__number">${index + 1}</span>
              <i class="accordion-body__icon fab fa-youtube"></i>
              ${
                (item.free || course.isUserRegisteredToThisCourse)?
                `<a href="episod.html?name=${course.shortName}&id=${item._id}" class="accordion-body__title">${item.title}</a>` 
                : 
                `<span class="accordion-body__title">${item.title}</span>` 
              }
              
            </div>
            <div class="accordion-body-timer">
            ${
                (item.free || course.isUserRegisteredToThisCourse)?
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
        } else {
            accordion.insertAdjacentHTML('beforeend', `
                <div class="accordion-item">
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body accordion-body1">
                        <div class="accordion-body-headers">
                            <span class="accordion-body__number">1</span>
                            <i class="accordion-body__icon fab fa-youtube"></i>
                            <p class="accordion-body__title">دوره در حال ضبط می باشد</p>
                        </div>
                        <div class="accordion-body-timer">
                            <span class="accordion-body__time">17:30</span>
                        </div>
                    </div>
                </div>
          </div>
                `)
        }
    });
    //------------------------------ mahsoolat sidebar---------------------------------------------------------
    getandshowslidercourse().then(courses => {
        if(courses.length){
            courses.forEach(item=>{
                courseproduct.insertAdjacentHTML('beforeend', `
                <div class="product-item">
                <img src="../image/courses/${item.cover}" class="product-item__img" alt="fareelancer">
                    <span class="product-item__text"><a href="#" class="product-item-link">${item.name}</a></span>
                </div>
                `)
            })
        }else{
            courseproduct.insertAdjacentHTML('beforeend',
             `<div class="product-item">
                     <span class="product-item__text"><a href="#" class="product-item-link">دوره ای مرتبط یافت نشد</a></span>
                 </div >
                `)
        }
       
    });
    commentbtn.addEventListener('click',()=>{
      
      commentinput()
       })
    })


const renderComments=(courses)=>{
    if(courses.comments.length){
    courses.comments.forEach(course=>{
    courseinfos.insertAdjacentHTML('beforeend',`
    <div class="course-info-student">
    <div class="course-info__header">
      <div class="course-info__header-right">
        <img src="../image/logo/Bundling-in-.NET-Core-MVC-Applications-with-Gulp-Header-Image.jpg"
          class="course-info__header-right-img" alt="img">
        <div class="course-info__header-right-info">
          <span class="course-info__header-name"><a href="#" class="course-info__header-link" id="course-info__header-link-student"> 
          ${course.creator.name}  </a></span>
          <span class="course-info__header-job">Front End</span>
        </div>
      </div>
      <div class="course-info__header-left">
        <i class="course-info__header-icon fas fa-chalkboard-teacher"></i>
        <span class="course__header-left-infoteachers" id="course__header-info-student">${course.creator.role}</span>
      </div>
    </div>
    <div class="course-info__discription" id="course-info__discriptionstudent">${course.body}</div>
  </div>
  ${course.answerContent ? `
  <div class="course-answer-teacher">
  <div class="course-info__header">
    <div class="course-info__header-right">
      <img src="../image/logo/Bundling-in-.NET-Core-MVC-Applications-with-Gulp-Header-Image.jpg"
        class="course-info__header-right-img" alt="img">
      <div class="course-info__header-right-info">
        <span class="course-info__header-name"><a href="#" class="course-info__header-link" id="course-info__header-link-teacher"> 
        ${course.answerContent.creator.name}  </a></span>
        <span class="course-info__header-job">Front End</span>
      </div>
    </div>
    <div class="course-info__header-left">
      <i class="course-info__header-icon fas fa-chalkboard-teacher"></i>
      <span class="course__header-left-infoteachers" id="course__header-info-teacher">${course.answerContent.creator.role}</span>
    </div>
  </div>
  <div class="course-info__discription" id="course-info__discriptionteacher">${course.answerContent.body}</div>
</div>
  ` : 
  ""}
`)
})
}
}