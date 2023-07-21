import { getAndRenderUser, createUserHandler ,deleteBtnUser,banBtnUser ,changeuser_btn } from "./funcs/users.js";
window.deleteBtnUser=deleteBtnUser;
window.changeuser_btn=changeuser_btn
window.banBtnUser=banBtnUser
window.addEventListener('load', () => {
    let addbtn = document.querySelector('#addbtn')
    getAndRenderUser();
    addbtn.addEventListener('click', (event) => {
        event.preventDefault();
        createUserHandler()
    })
})