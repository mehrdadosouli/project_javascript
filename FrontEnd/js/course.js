import { getCourseDetails, getandshowslidercourse,userInfos,commentinput } from "../js/funcs/shared.js";

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
const courseviewtext = document.querySelector('.course-point-of-view__text');
const coursenumberstudents = document.querySelector('.course-information__number-students');
const accordion = document.querySelector('#accordionExample');
const courseproduct = document.querySelector('.course-products');
const commentbtn = document.querySelector('.comment-btn');
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
        studentinformation.innerHTML = `${course.isUserRegisteredToThisCourse ? "شما دانشجوی دوره هستید" : "ثبت نام کنید"}`;
        courseviewtext.innerHTML = `${course.support}`;
        coursenumberstudents.innerHTML = `${course.courseStudentsCount}`;
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
    
    commentinput().then(res=>{
        console.log(res);
    })
})
})
