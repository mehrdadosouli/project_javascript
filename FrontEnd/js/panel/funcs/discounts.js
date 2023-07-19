import { getToken, showswall } from "../../funcs/utils.js"
const table=document.querySelector('.table tbody')
const title=document.querySelector('#title')
const time=document.querySelector('#time')
const takhfif=document.querySelector('#takhfif')
const coursesSelect=document.getElementsByTagName('select')[0]
let courseval="64a5c4724ac740f0be9ae660";
const getAndRnderDiscount=async()=>{
    table.innerHTML=""
    const res=await fetch('http://localhost:4000/v1/offs',{
        method:"GET",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
    const data =await res.json()
    data.forEach((off,index)=>{
        console.log(off);
        table.insertAdjacentHTML('beforeend',`
        <tr>
        <th style="text-align:center">${index+1}</th>
        <th style="text-align:center">${off.code}</th>
        <th style="text-align:center">${off.creator}</th>
        <th style="text-align:center">${off.percent}</th>
        <th style="text-align:center">${off.max}</th>
        <th style="text-align:center">${off.uses}</th>
        <th style="text-align:center">${off.createdAt.slice(0,10)}</th>
        <td>
            <button type="button" onclick="answerDiscount('${off._id}')"  class="btn btn-success" id="edit-btn">پاسخ </button>
        </td>
        <td>
            <button type="button" onclick="deleteDiscount('${off._id}')" class="btn btn-danger" id="delete-btn">حذف </button>
        </td>
      </tr>
        `)
    })
}
const RenderCourse=async()=>{
    const res=await fetch('http://localhost:4000/v1/courses');
    const data=await res.json();
    data.forEach(course=>{
        if(!course.price==0){
            coursesSelect.insertAdjacentHTML('beforeend',`
                <option id="${course._id}">${course.name}</option>
            `)

        }
    })
}


coursesSelect.addEventListener('change',(event)=>{
    console.log(event.target.selectedOptions[0].id);
    courseval=event.target.selectedOptions[0].id
})

const createDiscount=async()=>{
    let contents={
        code:title.value.trim(),
        percent:takhfif.value.trim(),
        course:courseval,
        max:time.value.trim()
    }
    const res=await fetch('http://localhost:4000/v1/offs',{
        method:"POST",
        headers:{
            Authorization:`Bearer ${getToken()}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(contents)
    })
    if(res.ok){
        showswall("با موفقیت اذسال شد","success","ok",()=>{
            
            getAndRnderDiscount()
        })
    }
}


const deleteDiscount=async(id)=>{
    const res=await fetch(`http://localhost:4000/v1/offs/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
    if(res.ok){
        showswall("با موفقیت حذف شد","success","ok",()=>{
            getAndRnderDiscount()
        })
    }
}
export { getAndRnderDiscount , createDiscount , RenderCourse , deleteDiscount}