import { getMe } from "./auth.js";
import { isLogin, getUrlParams, getToken, showswall } from "./utils.js";
const userInfos = () => {
  const navbarUserbtn = document.querySelector('.main-header__left-login');
  const islogin = isLogin();
  if (islogin) {
    getMe().then((data) => {
      navbarUserbtn.setAttribute('href', "index.html");
      navbarUserbtn.innerHTML = `<span class="login-text">${data.name}</span>`
    })
  } else {
    navbarUserbtn.setAttribute('href', "login.html");
    navbarUserbtn.innerHTML = '<span class="login-text">ورود/ ثبت نام</span>'
  }
}

const shareTopbarList = async () => {
  const topbar__list = document.querySelector('.top-bar__list');
  const data = await fetch('http://localhost:4000/v1/menus/topbar');
  const res = await data.json();
  const shuffleArray = res.sort((a, b) => 0.5 - Math.random())
  topbar__list.innerHTML = "";
  shuffleArray.splice(0, 6).map(menu => {
    topbar__list.innerHTML += `<li class="top-bar__item">
    <a href="#" class="top-bar__item-link">${menu.title}</a>
  </li>`
  })

}

const getAndRenderCourses = async () => {
  const res = await fetch(`http://localhost:4000/v1/courses`)
  const data = await res.json();
  return data
}

const swipperSliderPresell = async () => {
  const presellsliderparent = document.querySelector('#presell-slider-parent');
  const res = await fetch('http://localhost:4000/v1/courses/presell');
  const data = await res.json();
  data.map(course => {
    presellsliderparent.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide" data-swiper-autoplay="2000">
      <div class="course-box box">
        <a href="#" class="course__box-linkImg"
          ><img
            src="http://localhost:4000/courses/covers/${course.cover}"
            alt="Course img"
            class="course__box-img"
        /></a>
        <h4 class="course__box-title">${course.name}</h4>
        <div class="course__box-status">
          <div class="course__box-teacher">
            <i class="course__box-icon fas fa-chalkboard-teacher"></i>
            <a href="#" class="course__box-teacherLink">${course.creator} </a>
          </div>
          <div class="course__box-rating">
            ${Array(5 - course.courseAverageScore).fill(0).map(item => `<img
            src="../image/svg/star.svg"
            alt="rating"
            class="course__box-ratingIcon"
          />`).join('')}

          ${Array(course.courseAverageScore).fill(0).map(item => `<img
            src="../image/svg/star_fill.svg"
            alt="rating"
            class="course__box-ratingIcon"
          />`).join('')}
            
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
  return data
}

const swipperSliderPopular = async () => {
  const popularsliderparent = document.querySelector('#popular-slider-parent');
  const res = await fetch('http://localhost:4000/v1/courses/popular');
  const data = await res.json();
  data.map(course => {
    popularsliderparent.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide" data-swiper-autoplay="2000">
      <div class="course-box box">
        <a href="#" class="course__box-linkImg">
        <img
            src="http://localhost:4000/courses/covers/${course.cover}"
            alt="freelancer"
            class="course__box-img"
        /></a>
        <h4 class="course__box-title">${course.name}</h4>
        <div class="course__box-status">
          <div class="course__box-teacher">
            <i class="course__box-icon fas fa-chalkboard-teacher"></i>
            <a href="#" class="course__box-teacherLink">${course.creator} </a>
          </div>
          <div class="course__box-rating">
            ${Array(5 - course.courseAverageScore).fill(0).map(item => `<img
            src="../image/svg/star.svg"
            alt="rating"
            class="course__box-ratingIcon"
          />`).join('')}

          ${Array(course.courseAverageScore).fill(0).map(item => `<img
            src="../image/svg/star_fill.svg"
            alt="rating"
            class="course__box-ratingIcon"
          />`).join('')}
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
  return data
}

const getAndRenderArticle = async () => {
  const articleWrapper = document.querySelector('#article__wrappers');
  const res = await fetch('http://localhost:4000/v1/articles');
  const data = await res.json();
  data.slice(0, 6).map(course => {
    articleWrapper.insertAdjacentHTML('beforeend', `
    <div class="col-4">
              <div class="article-content__card">
                <div class="article-content__header">
                  <a href="#" class="article-content__header-link">
                    <img
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt=""
                      class="article-content-img"
                      style="object-fit: cover;
                      height: 35rem;"
                    />
                  </a>

                  </div>
                  <h5 class="article-content-heading">
                    ${course.title}
                  </h5>
                  <h6 class="article-content-caption">
                    ${course.description}
                  </h6>
                  <button class="article-content-btn">بیشتر بخوانید</button>
              </div>
            </div>`
    )
  })
  return data
}

const getAndRenderMenu = async () => {
  const mainheaderlist = document.querySelector('.main-header__list');
  const res = await fetch('http://localhost:4000/v1/menus');
  const data = await res.json();
  data.forEach((item) => {
    mainheaderlist.insertAdjacentHTML("beforeend",
      `<li class="main-header__item">
      <a href=category.html?cat=${item.href}&page=1 class="main-header__link mains">${item.title}</a>
    ${item.submenus.length !== 0 ?
        `<i class="fa-solid fa-chevron-down main-header__icon"></i>
       <ul class="main-header-menu">
     ${item.submenus.map((list) => (
          `<li class="main-header-menu__item">
        <a href="course.html?name=${list.href}" class="main-header-menu__link">
          ${list.title}
        </a>
      </li>`
        )).join('')}
     </ul>`
        : ""}
    </li>`)
  })
  return data
}
// ------------------------------geting url and geting data from database----------------------

const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParams("cat");
  const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`);
  const courses = await res.json();
  return courses;
}
// ------------------------------show courses category when you selected by row and column box in category----------------------

const showTemplatecourses = (template, coursesBox, course) => {
  if (template == 'row') {
    coursesBox.innerHTML = "";
    if(course.length){
    course.forEach(course => {
      coursesBox.insertAdjacentHTML('beforeend', `
      <div class="row">
      <div class="col-12" style="display: flex;justify-content: center;align-items: stretch;padding: 3rem;">
          <div style="display: inline-block;" class="col-3">
              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="freelancer" class="course__box-img" style="width: 100%;height: 100%;"/>
          </div>
          <div class="col-9" style="display:inline-block;box-shadow: 0 0 3px 0px gray;padding: 2rem;">
                  <a href="#" class="course__box-linkImg">
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
          </div>
      </div>
  </div>
        `)
    })
  }else{
    coursesBox.insertAdjacentHTML('beforeend', `
        <div class="col-4">
        <div class="course-box box">
           <span>ایتمی موجود نیست</span>
         </div>
        </div>
         `)
  }
  } else {
    coursesBox.innerHTML = "";
    course.forEach(course => {
      coursesBox.insertAdjacentHTML('beforeend', `
        <div class="col-4">
        <div class="course-box box">
          <a href="#" class="course__box-linkImg">
            <img src="http://localhost:4000/courses/covers/${course.cover}" alt="freelancer" class="course__box-img"/>
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
  }
}

const showFilteringcourses = (datakey, allcourse) => {
  let array = [];
  switch (datakey) {
    case "default":
      array = allcourse
      break;
    case "free":
      array = allcourse.filter(item => item.price == 0)
      break;
    case "expensive":
      array = allcourse.filter(item => item.price !== 0)
      break;
    case "first":
      array = [...allcourse]
      break;
    case "last":
      array = [...allcourse].reverse()
      break;

    default: {
      array = allcourse
    }
      break;
  }
  return array
}

const getCourseDetails = async () => {
  const geturl = getUrlParams('name');
  const res = await fetch(`http://localhost:4000/v1/courses/${geturl}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  const data = await res.json();
  return data
}

const getandshowslidercourse = async () => {
  const resulturl = getUrlParams('name'); ``
  const res = await fetch(`http://localhost:4000/v1/courses/related/${resulturl}`)
  const data = await res.json();
  return data
}

const getandshowepisodecourse = async () => {
  const accordion = document.querySelector('#accordionExample');
  const video = document.querySelector('#video');
  const resulturl = getUrlParams('name');
  const resultid = getUrlParams('id');
  const res = await fetch(`http://localhost:4000/v1/courses/${resulturl}/${resultid}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  const data = await res.json();
    data.sessions.forEach((item,index)=>{
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
      `<a href="episod.html?name=${resulturl}&id=${item._id}" class="accordion-body__title">${item.title}</a>` 
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
console.log(data.session.video);
  video.setAttribute('src', `http://localhost:4000/courses/covers/${data.session.video}`);
  return data
}

const commentinput = async () => {
  let courseShortName = getUrlParams('name');
  let commenttextarea = document.querySelector('#comment-textarea');
  let commentsusercourse = document.querySelector('#comments-user-course');
      let score=5;
      commentsusercourse.addEventListener('change', (event) => {
       score = event.target.value
     })
  let objcomment = {
    body: commenttextarea.value,
    courseShortName,
    score,
  }

  const res = await fetch('http://localhost:4000/v1/comments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type':'application/json'
    },
      body: JSON.stringify(objcomment),
    })
    console.log(res);
  if(res.status==201){
    showswall("کامنت' با موفقیت اظافه شد!","success","ok",()=>{})
  }
}

const searchurlParams=async()=>{
  const resurl=getUrlParams('value');
  const res=await fetch(`http://localhost:4000/v1/search/${resurl}`)
  const data=res.json();
  return data
}

  // -------------get allcourse for courses.html-----------------------------
  const getanshowAllCourses=async()=>{
    const res=await fetch(`http://localhost:4000/v1/courses`);
    const data=await res.json();
    return data
  }
export { userInfos, shareTopbarList, getAndRenderCourses, swipperSliderPopular, swipperSliderPresell, getAndRenderArticle, getAndRenderMenu, getAndShowCategoryCourses, showTemplatecourses, showFilteringcourses, getCourseDetails, getandshowslidercourse, getandshowepisodecourse, commentinput ,searchurlParams ,getanshowAllCourses }
