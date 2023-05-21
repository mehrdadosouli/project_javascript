import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";
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
            src="../image/courses/${course.cover}"
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

const swipperSliderPopular = async () => {
    const popularsliderparent = document.querySelector('#popular-slider-parent');
    const res = await fetch('http://localhost:4000/v1/courses/popular');
    const data = await res.json();
    data.map(course => {
        popularsliderparent.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide" data-swiper-autoplay="2000">
      <div class="course-box box">
        <a href="#" class="course__box-linkImg"
          ><img
            src="../image/courses/${course.cover}"
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

export { userInfos, shareTopbarList, getAndRenderCourses, swipperSliderPopular , swipperSliderPresell}