import { getAndRenderComments ,showComments ,answerComments ,acceptBtn , rejectBtn , deleteBtn} from "./funcs/comments.js"
window.showComments=showComments
window.acceptBtn=acceptBtn
window.rejectBtn=rejectBtn
window.deleteBtn=deleteBtn
window.answerComments=answerComments
window.addEventListener('load',()=>{
    getAndRenderComments()
})

