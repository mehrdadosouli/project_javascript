

const register = () => {
    let nameInput = document.querySelector('#name');
    let usernameInput = document.querySelector('#username');
    let emailInput = document.querySelector('#email');
    let phoneInput = document.querySelector('#phone');
    let passwordInput = document.querySelector('#password');
    let confirmPasswordInput = document.querySelector('#confirmPassword');

    const newUserInfo = {
        name:nameInput.value.trim(),
        username:usernameInput.value.trim(),
        email:emailInput.value.trim(),
        phone:phoneInput.value.trim(),
        password:passwordInput.value.trim(),
        confirmPassword:confirmPasswordInput.value.trim() 
    };
    fetch(`http://localhost:4000/v1/auth/register`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newUserInfo)
    })
    .then(res=>{console.log(res);
        if(res.status==201){
            swal({
                title: "با موفقیت ثبت نام انجام شد.",
                icon: "success",
                button: "ورود به پنل",
              });
        }else if(res.status==409){
            swal({
                title: "شما با این اسم یا ایمیل قبلا ثبت نام کرده اید",
                icon: "error",
                button: "تصحیح اطلاعات",
              });
        }
        return res.json()})
    .then(data=>console.log(data))
}
export {register}