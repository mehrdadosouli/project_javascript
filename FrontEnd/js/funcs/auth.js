

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
    }
}