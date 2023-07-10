import { getToken, showswall } from "../../../js/funcs/utils.js";
let table=document.querySelector('.table tbody')
const getAndRenderComments=async()=>{
    const res=await fetch('http://localhost:4000/v1/comments')
    const data=await res.json()
    table.innerHTML=""
    data.forEach((comment,index)=>{
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
             <button type='button' onclick="answerComments('${comment._id}')" class='btn btn-primary answer-btn'>پاسخ</button>
        </td>
        <td>
             <button type="button" onclick="acceptBtn('${comment._id}')" class="btn btn-success" id="delete-btn">تایید </button>
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

const answerComments=async(id)=>{
    
    swal({
        title:"answer",
         content:"input",
         buttons:"ok"
    }).then(async(result)=>{
        console.log(result);
        let bodys={
            body:result,
            score:5
        }
        const res=await fetch(`http://localhost:4000/v1/comments/answer/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getToken()}`
            },
            body:JSON.stringify(bodys)
        })
        if(res.ok){
            showswall("با موفقیت ارسال شد","success","ok",()=>{
                getAndRenderComments()
            })
        }
    })
}

const acceptBtn=async(id)=>{
    const res=await fetch(`http://localhost:4000/v1/comments/accept/${id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${getToken()}`
        },
    })
    if(res.ok){
        showswall("کامنت با موفقیت ثبت شد","success","ok",()=>{
            getAndRenderComments()
        })
    }
}
const rejectBtn=async(id)=>{
    const res=await fetch(`http://localhost:4000/v1/comments/reject/${id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${getToken()}`
        },
    })
    if(res.ok){
        showswall("کامنت با موفقیت ریجکت شد","success","ok",()=>{
            getAndRenderComments()
        })
    }
}
const deleteBtn=async(id)=>{
    const res=await fetch(`http://localhost:4000/v1/comments/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${getToken()}`
        },
    })
    if(res.ok){
        showswall("کامنت با موفقیت حذف شد","success","ok",()=>{
            getAndRenderComments()
        })
    }
}

export{ getAndRenderComments ,showComments ,answerComments ,acceptBtn , rejectBtn , deleteBtn}