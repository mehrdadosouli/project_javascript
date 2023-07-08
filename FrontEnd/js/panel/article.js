import { getAllArticle , deleteArticle ,createArticle ,getCategory} from "./funcs/articles.js"
window.deleteArticle=deleteArticle
const btnForm=document.querySelector('#btnForm')

window.addEventListener('load',()=>{

    getAllArticle()
    getCategory()    
    
})
btnForm.addEventListener('click',(event)=>{
    event.preventDefault();
    createArticle()
})
