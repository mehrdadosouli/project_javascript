import { getToken , showswall } from "../utils/auth.js"

let editinput1 = document.querySelector('#edit__input1')
let editinput2 = document.querySelector('#edit__input2')
let editinput3 = document.querySelector('#edit__input3')
let editinput4 = document.querySelector('#edit__input4')
const getAndRenderEdite = async () => {
    const res = await fetch('http://localhost:4000/v1/auth/me', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const data = await res.json()
    console.log(data);
    renderEdite(data)
}
const renderEdite = (data) => {
    editinput1.value = data.phone
    editinput2.value = data.name
    editinput3.value = data.phone
    editinput4.value = data.email
}

const changeInfoUser = async () => {
    let edit__input1 = document.querySelector('#edit__input1');
    let edit__input2 = document.querySelector('#edit__input2');
    let edit__input3 = document.querySelector('#edit__input3');
    let edit__input4 = document.querySelector('#edit__input4');
    let pass2 = document.querySelector('#pass2');
    let contents={
        name: edit__input2.value.trim(),
        username:edit__input3.value.trim() ,
        email: edit__input4.value.trim(),
        password: pass2.value.trim(),
        phone: edit__input1.value.trim()
    }
    console.log(contents);
    let res = await fetch('http://localhost:4000/v1/users', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(contents)
    })
    if(res.ok){
        showswall(
            "با موقفیت تغییر یافت",
            "success",
            "ok"
        ,()=>{
            getAndRenderEdite()
        })
    }
}
export { getAndRenderEdite , changeInfoUser } 