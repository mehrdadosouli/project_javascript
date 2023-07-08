import { showswall } from "../../../js/funcs/utils.js";
let table=document.querySelector('.table tbody')
const getAndRenderComments=async()=>{
    const res=await fetch('http://localhost:4000/v1/comments')
    const data=await res.json()
    table.innerHTML=""
    data.forEach((comment,index)=>{
        console.log(comment);
        table.insertAdjacentHTML('beforeend',`
        <tr>
        <td style="${comment.answer? "background-color:green" : "background-color:red"}">${index+1}</td>
        <td>${comment.creator ? comment.creator.name : "---"}</td>
        <td>${comment.course? comment.course.name :"----"}</td>
        <td>${comment.createdAt.slice(0,10)}</td>
        <td>${comment.score}</td>
        <td>
             <button type="button" onclick="showComments('${comment.body}')" class="btn btn-success" id="show-btn">مشاهده</button>               
        </td>
        <td>
             <button type='button' onclick='answerComments()' class='btn btn-primary answer-btn'>پاسخ</button>
        </td>
        <td>
             <button type="button" onclick="aceptBtn('${comment._id}')" class="btn btn-success" id="delete-btn">تایید </button>
        </td>
        <td>
             <button type="button" onclick="rejectBtn('${comment._id}')" class="btn btn-danger" id="delete-btn">رد </button>
        </td>
        <td>
             <button type="button" onclick="deleteBtn('${comment._id}')" class="btn btn-warning" id="delete-btn">حذف </button>
        </td>
      </tr>
        `)
    })
}

const showComments=(txt)=>{
    showswall(
        txt,
         undefined,
         "ok"
      ,()=>{})
}

export{ getAndRenderComments ,showComments }