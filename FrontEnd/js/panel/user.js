import { getAndRenderUser } from "./funcs/users.js";

window.addEventListener('load',()=>{

    getAndRenderUser().then((users)=>{
        console.log(users);
        let table=document.querySelector('table tbody');
        users.forEach((user,index)=>{
        table.insertAdjacentHTML('beforeend',`
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
        <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
        </td>
        <td>
            <button type='button' class='btn btn-danger delete-btn'>حذف</button>
        </td>
        <td>
            <button type='button' class='btn btn-danger delete-btn'>بن</button>
        </td>
    </tr>
        `)
     })
    })
    
})