import { getAndRnderDiscount , createDiscount , RenderCourse , deleteDiscount} from "./funcs/discounts.js"
const creatediscountelem=document.querySelector('#create-discount')
window.deleteDiscount=deleteDiscount

window.addEventListener('load',()=>{
    RenderCourse()
    getAndRnderDiscount()
    creatediscountelem.addEventListener('click',()=>{
        createDiscount()
    })
})