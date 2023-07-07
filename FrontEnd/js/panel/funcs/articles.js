import { getToken ,showswall } from "../../funcs/utils.js";
const table=document.querySelector('.table tbody')
const getAllArticle=async()=>{
    const res=await fetch(`http://localhost:4000/v1/articles`);
    const data=await res.json();
    table.innerHTML=""
    data.forEach((article,index)=>{
        table.insertAdjacentHTML("beforeend",`
        <tr>
            <th>${index+1}</th>
            <th>${article.title}</th>
            <th>${article.publish ? "انشار یافته" : "منتشر نشده"}</th>
            <th>${article.createdAt.slice(0,10)}</th>
            <th>${article.creator.name}</th>
            <td>
                <button type='button' onclick="editeArticle('${article._id}')" class='btn btn-success delete-btn'>ویرایش</button>
            </td>
            <td>
                <button type='button' onclick="deleteArticle('${article._id}')" class='btn btn-danger delete-btn'>حذف</button>
            </td>
        </tr>
        `)

    })
}

const deleteArticle=async(id)=>{
    showswall("مطمعن هستید از حذف؟", "warning", ["نه", "اره"], async()=>{
    const res=await fetch(`http://localhost:4000/v1/articles/${id}`,{
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })
    if(res.ok){
        showswall("حذف شد", "success", "ok",()=>{
            getAllArticle()
        })
    }
  })
}
export { getAllArticle,deleteArticle }