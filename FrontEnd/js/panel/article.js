import { getAllArticle , deleteArticle} from "./funcs/articles.js"
window.deleteArticle=deleteArticle
window.addEventListener('load',()=>{
    getAllArticle()
})