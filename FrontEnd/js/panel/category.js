import { getAllCategory , deleteBtncourse , editeBtncourse} from "./funcs/categories.js"
window.deleteBtncourse=deleteBtncourse
window.editeBtncourse=editeBtncourse
window.addEventListener('load',()=>{
    getAllCategory()
})