let $ = document
let landing__title = $.querySelector('.landing__title');
let timeCounter = $.querySelector('#time-counter');
let learnCounter = $.querySelector('#learn-counter');
let userCounter = $.querySelector('#user-counter');

window.addEventListener('load', () => {
    let textTitle = "ما به هر قیمتی دوره اموزشی تولید نمیکنیم!"
    let index = 0
    landing_text(textTitle, index);
    counterLanding(136_7,timeCounter)
    counterLanding(40,learnCounter)
    counterLanding(210_0,userCounter)
})
// createe function landing text
function landing_text(text, index) {
    if (index < text.length) {
        landing__title.innerHTML += text[index];
        index++
    }
    setTimeout(() => {
        landing_text(text, index)
    }, 100);
}
// createe function counter landing courses
function counterLanding(count,elem) {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter === count) {
            clearInterval(interval)
        }

        elem.innerHTML = counter;
        counter++
    }, 0.5);


}
