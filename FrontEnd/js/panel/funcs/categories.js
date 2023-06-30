import { getToken, showswall  } from "../../funcs/utils.js";
const table = document.querySelector(".table tbody");
const getAllCategory = async () => {
    const res = await fetch('http://localhost:4000/v1/category');
    const data = await res.json();
    table.innerHTML = "";
    data.forEach((item, index) => {
        table.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.name}</td>
            <td>
                <button type='button' onclick="editeBtncourse('${item._id}')" class='btn btn-danger delete-btn'>ویرایش</button>
            </td>
            <td>
                <button type='button' onclick="deleteBtncourse('${item._id}')" class='btn btn-danger delete-btn'>حذف</button>
            </td>
        </tr>
    `)
    })
}

const deleteBtncourse=(id)=>{
    showswall(
        "آیا از حذف دوره اطمینان دارید؟",
        "warning",
        ["نه","اره"],
        async (result) => {
          if (result) {
            const res = await fetch(`http://localhost:4000/v1/category/${id}`, {
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
            getAllCategory()
          } else {
            showswall("دوره حذف نشد!"),()=>{};
          }
        }
        }
      )
}


const editeBtncourse=async(id)=>{
    await swal({
        content: "input",
      })
      const valuinput=document.querySelector('.swal-content__input')
      if(valuinput.value){
        const title={title:valuinput.value.trim()}
        console.log(title);
        const res = await fetch(`http://localhost:4000/v1/category/${id}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type":"application/json"
              },
              body:JSON.stringify(title)
            })
            console.log(res);
            if(res.ok){
                showswall(
                    " با موفقیت تغییر یافت!",
                     "success",
                     "ok"
                  ),()=>{
                      getAllCategory()
                  }
            }
      }
      
      
      
}

export { getAllCategory , deleteBtncourse ,editeBtncourse}