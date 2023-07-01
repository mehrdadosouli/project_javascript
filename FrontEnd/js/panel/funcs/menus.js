import { getToken, showswall } from "../../funcs/utils.js";

let ParentMenuID = undefined;
const select = document.querySelector('.select')

const getAllMenu = async () => {
    const table = document.querySelector('.table tbody');
    const res = await fetch('http://localhost:4000/v1/menus/all');
    const data = await res.json();
    table.innerHTML = ""
    data.forEach(menu => {
        table.insertAdjacentHTML('beforeend', `
    <tr>
        <td>${menu.title}</td>
        <td>${menu.href}</td>
        <td>${menu.parent ? menu.parent.title : "---"
            }</td>
        <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
        </td>
        <td>
            <button type='button' class='btn btn-danger delete-btn' onclick="deleteHandler('${menu._id}')">حذف</button>
        </td>
    </tr>
    `)
    })
}

const prepareMenuElem = async () => {
    select.addEventListener('change', (event) => {
        if(event.target.value=="-1"){

            ParentMenuID=undefined
        }else{
            ParentMenuID = event.target.value;
        }
    });
    const res = await fetch('http://localhost:4000/v1/menus')
    const data = await res.json()
    data.forEach(elem => {
        select.insertAdjacentHTML('beforeend', `
        <option value="${elem._id}">${elem.title}</option>
   `)
    })
}

const addNewMenuToList = async () => {
    const inputtitletxt = document.querySelector('#input-title-txt')
    const inputtitlehref = document.querySelector('#input-title-href')
    const datas = {
        title: inputtitletxt.value.trim(),
        href: inputtitlehref.value.trim(),
        parent: ParentMenuID
    }
    const res = await fetch('http://localhost:4000/v1/menus', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datas)

    })
    if (res.status == 201) {
        console.log(datas);
        showswall("افزوده شد", "sucsses", "ok", () => {
            getAllMenu()
        })



    } else {
        showswall("افزوده نشد", "warning", "ok",()=>{})
    }


}

const deleteHandler = async (id) => {
    showswall("مطمعن هستید از حذف؟", "warning", ["نه", "اره"], 
    async(result) => {
        console.log(result);
        if (result) {
            const res = await fetch(`http://localhost:4000/v1/menus/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            if(res.ok){
                showswall("حذف شد", "success", "ok",()=>{
                getAllMenu()
                })
            }
        }
    })   
}


export { getAllMenu, prepareMenuElem, addNewMenuToList, deleteHandler }
