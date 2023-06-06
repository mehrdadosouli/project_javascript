import { showswall } from "./funcs/utils.js";
let submitBtn = document.querySelector('.login-form__btn-submit');
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
const textareaInput = document.querySelector('#textarea')

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    const submitcontact = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        body: textareaInput.value.trim()
    }

    if(nameInput.value!="" && emailInput.value!="" && phoneInput.value!="" && textareaInput.value!="" ){
        sentcontact(submitcontact)
    }else{
        alert("لطفا فیلد ها را بررسی کنید")
    }
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    textareaInput.value = "";
})

const sentcontact = async (submitcontact) => {
    try {
        const res = await fetch('http://localhost:4000/v1/contact', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submitcontact)
    });
    if(res.status==201){
        console.log('HI');
        showswall("با موفقیت ارسال شد.","success","ok",()=>{
            location.href="index.html"
        })
    }
        
    } catch (error) {
        showswall(" دوباره سعی کنید ارسال نشد.","error","home",()=>{
            location.href="index.html"
        })
    }

}