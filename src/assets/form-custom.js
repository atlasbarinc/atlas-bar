const backToLogin = document.querySelector('.c-formSuccess__forgotLink');
const successForm = document.querySelector('.c-formSuccess');
const loginForm = document.querySelector('.c-formLogin');

//Show the success box
window.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('[data-form-recover-success]')) {
        loginForm.classList.add('u-hide');
        successForm.classList.remove('u-hide');
    }
});

//Hide the success box after seeing it.
backToLogin.addEventListener('click', function() {
    successForm.classList.add('u-hide');
    loginForm.classList.remove('u-hide');
});
