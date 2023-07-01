import { getAllCategory , deleteBtncourse , editeBtncourse , createCategory} from "./funcs/categories.js"
window.deleteBtncourse=deleteBtncourse
window.editeBtncourse=editeBtncourse
window.addEventListener('load',()=>{
    getAllCategory()
    const createCategorybtn=document.querySelector('#create-categorybtn');
    createCategorybtn.addEventListener('click',(event)=>{
        event.preventDefault();
        createCategory()
    })
})