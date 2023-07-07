import { showswall, getToken } from "../../funcs/utils.js";
const table = document.querySelector('.table tbody');
const coursesSelect = document.querySelector('#courses-select');
const free=document.querySelector('#free')
const notFree=document.querySelector('#not-free')
const video=document.querySelector('#video')
let isfree=1;
let sessionId ="64a5c4724ac740f0be9ae660";
let sessionVideo=null;
const getAllSessions = async () => {
    const res = await fetch('http://localhost:4000/v1/courses/sessions');
    const data = await res.json();
    table.innerHTML = "";
    data.forEach((session, index) => {
        table.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${session.title}</td>
                <td>${session.time}</td>
                <td>${session.updatedAt.slice(0, 10)}</td>
                <td>${session.course ? session.course.name : "-----"}</td>
                <td>
                  <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                  <button type='button' class='btn btn-danger delete-btn' onclick="deleteHandler('${session._id}')">حذف</button>
                </td>
            </tr>
        `)
    })
}

const deleteHandler = async (id) => {

    showswall("مطمعن هستید از حذف؟", "warning", ["نه", "اره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    }
                })
                if (res.ok) {
                    showswall("حذف شد", "success", "ok", async () => {
                        await getAllSessions()
                    })
                }
            }
        })
}

const getCourses = async () => {
    const res = await fetch('http://localhost:4000/v1/courses')
    const data = await res.json();
    data.forEach(course => {

        coursesSelect.insertAdjacentHTML('beforeend', `
            <option value='${course._id}'>${course.name}</option>
        `)
    })
    
}
coursesSelect.addEventListener('change',(event)=>{
    console.log(event.target.value);
    sessionId=event.target.value
})


free.addEventListener('change',(event)=>{
    isfree=Number(event.target.value)
})

notFree.addEventListener('change',(event)=>{
    isfree=Number(event.target.value)
})

video.addEventListener('change', (event) => {
    sessionVideo = event.target.files[0];
  })

const createSessions = async () => {
    const title=document.querySelector('#title').value.trim()
    const time=document.querySelector('#time').value.trim()

        if(sessionVideo && title && time){
            
            let formSession=new FormData();
            formSession.append("title",title);
            formSession.append("time",time);
            formSession.append("video",sessionVideo);
            formSession.append("free",isfree);
            console.log(sessionId);
            
            const res = await fetch(`http://localhost:4000/v1/courses/${sessionId}/sessions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: formSession
            })
            if(res.ok){
                showswall("دوره ثبت شد ", "success", "ok", async () => {
                    await getAllSessions()
                })
            }
        }else{

        showswall("اینپوت ها را انتخاب کنید", "warning", "ok", async () => {})

    }
}


export { getAllSessions, deleteHandler, getCourses ,createSessions }