import { getAndRnderDiscount , createDiscount , RenderCourse} from "./funcs/discounts.js"
const creatediscountelem=document.querySelector('#create-discount')


window.addEventListener('load',()=>{
    RenderCourse()
    getAndRnderDiscount()
    creatediscountelem.addEventListener('click',()=>{
        createDiscount()
    })
})