import { getToken } from "../../funcs/utils.js"
const table=document.querySelector('.table tbody')

const getAndRnderDiscount=async()=>{
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

export { getAndRnderDiscount }