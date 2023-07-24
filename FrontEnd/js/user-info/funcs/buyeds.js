import { getToken, showswall } from "../utils/auth.js"
let main = document.querySelector('.main')

const getAndRenderCourse = async () => {
    const res = await fetch('http://localhost:4000/v1/users/courses', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
    const data = await res.json()
    // main__box.innerHTML=""
    data.forEach(item => {
     
        console.log(item);
        main.insertAdjacentHTML('beforeend', `
        <div class="row">
        <div class="col-12">
            <div class="main__box">
                <div class="main__box-right">
                    <a class="main__box-img-link" href="#">
                        <img class="main__box-img img-fluid"
                            src="http://localhost:4000/courses/covers/${item.course.cover}">
                    </a>
                </div>
                <div class="main__box-left">
                    <a href="#" class="main__box-title">${item.course.name}</a>
                    <div class="main__box-bottom">
                        <div class="main__box-all">
                            <span class="main__box-all-text">کل دروس:</span>
                            <span class="main__box-all-value">${item.course.price ? "رایگان" : item.course.price}</span>
                        </div>
                        <div class="main__box-completed">
                            <span class="main__box-completed-text">دروس تکمیل شده:</span>
                            <span class="main__box-completed-value">${item.course.Complated ? item.course.Complated : "در حال برگذاری میباشد"}</span>
                        </div>
                    </div>
                </div>
            </div>                                        
        </div>
    </div>                      
    `)
    })
}

export { getAndRenderCourse }