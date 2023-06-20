import { getAllCourses,prepareCreateCourseForm, createNewCourse ,deleteCourseList} from "./funcs/courses.js";
window.deleteCourseList=deleteCourseList;

window.addEventListener('load', () => {
    const createCourseBtn = document.querySelector('#create-course-btn');
    getAllCourses()
    prepareCreateCourseForm()
    createCourseBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewCourse()
    })
})