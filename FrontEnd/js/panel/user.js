import { getAndRenderUser, createUserHandler ,deleteBtnUser,banBtnUser  } from "./funcs/users.js";
window.deleteBtnUser=deleteBtnUser;
window.banBtnUser=banBtnUser
window.addEventListener('load', () => {
    let addbtn = document.querySelector('#addbtn')
    getAndRenderUser();
    addbtn.addEventListener('click', (event) => {
        event.preventDefault();
        createUserHandler()
    })
})