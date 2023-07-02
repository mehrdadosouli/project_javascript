import { showswall , getToken} from "../../funcs/utils.js";

let table = document.querySelector('.table tbody');
const getAllContact = async () => {
    let res = await fetch('http://localhost:4000/v1/contact');
    const data = await res.json();
    if (res.status == 200) {
        data.forEach((item,index) => {
            table.insertAdjacentHTML('beforeend', `
            <tr>
                <th>${index + 1}</th>
                <th>${item.name}</th>
                <th>${item.email}</th>
                <th>${item.phone}</th>
                <th>${item.updatedAt.slice(0,10)}</th>
                <td>
                     <button type="button" onclick="showList('${item.body}','${item.email}')" class="btn btn-success" id="show-btn">مشاهده </button>                </td>
                <td>
                     <button type="button" onclick="editeList('${item._id}')" class="btn btn-primary" id="edit-btn">ویرایش </button>
                </td>
                <td>
                     <button type="button" onclick="deleteList('${item._id}')" class="btn btn-danger" id="delete-btn">حذف </button>
                </td>
                </tr>  
            `) 
        })
    }
}

const showList=(txt,emails)=>{
     
     showswall(txt,"success",["بیخیال","پاسخ"],async(result)=>{
        
         if(result){
             let promp=prompt("پاسخ را بدهید");
             const texts={
                email:emails,
                answer:String(promp.value)
               }
             const res=await fetch('http://localhost:4000/v1/contact/answer',{
                 method:"POST",
                 headers:{
                     "Content-Type":"application/json",
                     Authorization:`Bearer ${getToken()}`
                 },
               body:JSON.stringify(texts)
             })
             if(res.status==200){
                 showswall('با موفقیت ارسال شد',"success","ok",()=>{})
             }
         }
     })
}

export { getAllContact , showList}