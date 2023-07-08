import { getAndRenderComments ,showComments} from "./funcs/comments.js"
window.showComments=showComments
window.addEventListener('load',()=>{
    getAndRenderComments()
})

