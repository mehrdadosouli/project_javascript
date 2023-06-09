import { searchurlParams } from "./funcs/shared.js";
import { userInfos , getAndRenderMenu } from "./funcs/shared.js";

const coursesAll=document.querySelector('#coursesAll');
const articleWrapper = document.querySelector('#article__wrappers');



window.addEventListener('load',()=>{
    userInfos();
    getAndRenderMenu();
    searchurlParams().then(data=>{
        console.log(data);
        if(data.allResultCourses.length){
      data.allResultCourses.forEach(course => {
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
              <a href="#" class="course__box-teacherLink">محمد امین سعیدی راد</a>
            </div>
             <div class="course__box-rating">
             <img src="../image/svg/star.svg" alt="rating" class="course__box-ratingIcon"/>
             <img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>
             <img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>
             <img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>
             <img src="../image/svg/star_fill.svg" alt="rating" class="course__box-ratingIcon"/>
            </div>
          </div>
          <div class="course__box-users">
            <div class="course__box-user">
              <i class="course__box-userIcon fas fa-users"></i>
              <span class="course__box-userStudents">1200</span>
            </div>
            <span class="course__box-userPrice">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
          </div>
          <div class="course__box-info">
            <a href=course.html?name=${course.shortName} class="course__boxinfoLink"
              >مشاهده اطلاعات
              <i class="course__box-infoIcon fas fa-arrow-left"></i>
            </a>
          </div>
        </div>
      </div>
        `)
    });
        }else{
            coursesAll.insertAdjacentHTML('beforeend',`
            <div id="noarticle" style="width: 100%;
            height: 3rem;
            background-color: rgba(80, 140, 97, 0.329);">دوره ای موجود نیست</div>
            `)
        }
        if(data.allResultArticles.length){
        data.allResultArticles.forEach(course => {
            articleWrapper.insertAdjacentHTML('beforeend', `
            <div class="col-4">
                      <div class="article-content__card">
                        <div class="article-content__header">
                          <a href="#" class="article-content__header-link">
                            <img
                              src="../image/blogs/${course.cover}"
                              alt=""
                              class="article-content-img"
                            />
                          </a>
        
                          <h5 class="article-content-heading">
                            ${course.title}
                          </h5>
                          <h6 class="article-content-caption">
                            ${course.description}
                          </h6>
                          <button class="article-content-btn">بیشتر بخوانید</button>
                        </div>
                      </div>
                    </div>`
            )
        })
        }else{
            console.log('no');
            articleWrapper.insertAdjacentHTML('beforeend', `
            <div id="noarticle" style="width: 100%;
            height: 3rem;
            background-color: rgba(80, 140, 97, 0.329);">مقاله ای موجود نیست</div>
            `
            )
            
        }
        
    })
})