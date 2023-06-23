4
import { getToken, showswall } from "../../funcs/utils.js";
let category_id = -1;
let courseCovers = null;
let status = "start";
const getAllCourses = async () => {
  const table = document.querySelector('.table')
  table.innerHTML = ""
  const res = await fetch('http://localhost:4000/v1/courses')
  const data = await res.json();
  data.forEach((item, index) => {
    table.insertAdjacentHTML('beforeend', `
        <tbody>
        <tr>
            <td id="id">${index + 1}</td>
            <td id="name">${item.name} </td>
            <td id="price">
              <a>${item.price ? item.price : "رایگان"} </a>
            </td>
            <td id="register">${item.registers}</td>
            <td id="support">${item.support} </td>
            <td id="category">${item.categoryID} </td>
            <td id="avrage">${item.courseAverageScore} </td>
            <td id="iscomplat">${item.isComplete ? item.isComplete : "دوره در حال برگذاری است"}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">ویرایش </button>
            </td>
            <td>
                <button type="button" onclick="deleteCourseList('${item._id}')" class="btn btn-danger" id="delete-btn">حذف </button>
            </td>
        </tr>
    </tbody>
        `)
  })
  return data
}




const prepareCreateCourseForm = async () => {
  const start = document.querySelector('#start')
  const presell = document.querySelector('#presell')
  const categoryList = document.querySelector('.category-list')
  let coursecover = document.querySelector('#coursecover')
  const res = await fetch(`http://localhost:4000/v1/category`)
  const data = await res.json()
  data.forEach(elem => {
    categoryList.insertAdjacentHTML('beforeend', `
            <option value="${elem._id}">${elem.title}</option>
        `)
  })
  categoryList.addEventListener('change', (event) => {
    category_id = event.target.value;
  })
  coursecover.addEventListener('change', (event) => {
    courseCovers = event.target.files[0];
    console.log(courseCovers);
  })

  start.addEventListener('change', (event) => {
    status = event.target.value;
  })
  presell.addEventListener('change', (event) => {
    status = event.target.value;
  })
}


const createNewCourse = async () => {
  const courseName = document.querySelector('#course-name')
  const coursePrice = document.querySelector('#course-price')
  const courseDescription = document.querySelector('#course-description')
  const courseShorteName = document.querySelector('#course-shortname')
  const courseSupport = document.querySelector('#course-support')

  const formData = new FormData();
  formData.append('name', courseName.value.trim())
  formData.append('price', coursePrice.value.trim())
  formData.append('description', courseDescription.value.trim())
  formData.append('shortName', courseShorteName.value.trim())
  formData.append('support', courseSupport.value.trim())
  formData.append('categoryID', category_id)
  formData.append('status', status)
  formData.append('cover', courseCovers)

  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  })
  if (res.ok) {
    showswall("دوره اظافه شد", "succsess", "ok"), () => { }
  }


}

const deleteCourseList = async (id) => {

  showswall(
    "آیا از حذف دوره اطمینان دارید؟",
    "warning",
    ["نه","اره"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://localhost:4000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
       if(res.ok){
        showswall(
          "دوره با موفقیت حذف شد!",
           "success",
           "ok"
        ),()=>{}
          getAllCourses()
        
      } else {
        showswall("دوره حذف نشد!"),()=>{};
      }
    }
    }
  )

}

export { getAllCourses, prepareCreateCourseForm, createNewCourse, deleteCourseList }
