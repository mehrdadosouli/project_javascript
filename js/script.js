let $=document
let landing__title=$.querySelector('.landing__title');
window.addEventListener('load',()=>{
    let textTitle="ما به هر قیمتی دوره اموزشی تولید نمیکنیم!"
    let index=0
    landing_text(textTitle,index)
})

function landing_text(text,index){
    if(index<text.length){
        landing__title.innerHTML+=text[index];
        index++
    }
    setTimeout(() => {
        landing_text(text,index)
    }, 100);
}