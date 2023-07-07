import { getToken ,showswall } from "../../funcs/utils.js";
const table=document.querySelector('.table tbody')
const articleName=document.querySelector('#inputName')
const articleHref=document.querySelector('#articleHref')
const articleDescription=document.querySelector('#articleDescription')
const editor=document.querySelector('#editor')
const articleSelect=document.querySelector('#articleSelect')
const articleCover=document.querySelector('#articleCover')
let selectedId="6345cbd132c10de974957632";
let covers=null;
let valeditor=null;


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
const getCategory=async()=>{

    ClassicEditor
    .create( document.querySelector( '#editor' ),{

    }).then(res=>{
        valeditor=res
    })
    .catch( error => {
        console.error( error );
    } );


    const resultCategory=await fetch('http://localhost:4000/v1/category')
    const resultData=await resultCategory.json()
    resultData.forEach(category=>{
    articleSelect.insertAdjacentHTML('beforeend',`
        <option value="${category._id}">${category.title}</option>
    `)
  })
}

articleSelect.addEventListener('change',(event)=>{

    selectedId=event.target.value
    console.log(selectedId);
})

articleCover.addEventListener('change',(event)=>{
    covers=event.target.files[0];
})

const createArticle=async()=>{
let valName=articleName.value.trim()
let valHref=articleHref.value.trim()
let valDescription=articleDescription.value.trim()

 const formearticle=new FormData()
    formearticle.append('title',valName)
    formearticle.append('description',valDescription)
    formearticle.append('body',valeditor.getData())
    formearticle.append('shortName',valHref)
    formearticle.append('categoryID',selectedId)
    formearticle.append('cover',covers)

const res=await fetch(`http://localhost:4000/v1/articles`,{
    method:'POST',
    headers:{
        Authorization:`Bearer ${getToken()}`,
    },
    body:formearticle
})
if(res.ok){
    showswall("دوره اظافه شد","success","ok",async()=>{
       await getAllArticle()
    });
  }
}

export { getAllArticle,deleteArticle ,createArticle ,getCategory}