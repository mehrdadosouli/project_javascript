import { getToken, showswall  } from "../../funcs/utils.js";

const getAndRenderUser=async()=>{
    const res=await fetch(`http://localhost:4000/v1/users`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    });
    const data=await res.json();
        let table = document.querySelector('table tbody');
        data.forEach((user, index) => {
            table.insertAdjacentHTML('beforeend', `
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
            <button type='button' onclick="deleteBtnUser('${user._id}')" class='btn btn-danger delete-btn'>حذف</button>
        </td>
        <td>
            <button type='button' onclick="banBtnUser('${user._id}')" class='btn btn-danger delete-btn'>بن</button>
        </td>
    </tr>
        `)
        })
}
const deleteBtnUser = (id) => {

    showswall("ایا از حذف ان مطمعن هستید؟", "warning", ["خیر", "بله"], async (result) => {
                if (result) {
                    const res =await fetch(`http://localhost:4000/v1/users/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    })
                    if (res.ok) {
                        showswall("حذف شد", "success", "ok",() => {})
                            getAndRenderUser()
                        
                    }
                }
            })
}
const banBtnUser = (id) => {

    showswall("ایا از بن ان مطمعن هستید؟", "warning", ["خیر", "بله"], async (result) => {
                if (result) {
                    const res =await fetch(`http://localhost:4000/v1/users/ban/${id}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    })
                    if (res.ok) {
                        showswall("بن شد", "success", "ok",() => {})
                            getAndRenderUser()
                    }
                }
            })
}

let usernameinput=document.querySelector('#usernameinput')
let userfamilyinput=document.querySelector('#userfamilyinput')
let userpassinput=document.querySelector('#userpassinput')
let userphoneinput=document.querySelector('#userphoneinput')
let deleteBtn=document.querySelector('.delete-btn')

const createUserHandler=()=>{
    let infouser={
        name: usernameinput.value.trim(),
        username: userfamilyinput.value.trim(),
        email: userfamilyinput.value.trim(),
        phone:userphoneinput.value.trim(),
        password: userpassinput.value.trim(),
        confirmPassword:userpassinput.value.trim()
    }
      fetch('http://localhost:4000/v1/auth/register', {
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(infouser)
    }).then(res=>{
        if(res.status==201){
            showswall("با موفقیت ثبت نام انجام شد.","success","ورود به پنل",()=>{
                location.href="http://127.0.0.1:5500/FrontEnd/html/index.html"
            })
        }else if(res.status==409){
            showswall("شما با این اسم یا ایمیل قبلا ثبت نام کرده اید","error","تصحیح اطلاعات",()=>{})
        }
        return res.json()})
}



export { getAndRenderUser , createUserHandler ,deleteBtnUser ,banBtnUser}