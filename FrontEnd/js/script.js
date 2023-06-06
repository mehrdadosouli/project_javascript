import { showswall } from "./funcs/utils.js";
let $ = document
let landing__title = $.querySelector('.landing__title');
let timeCounter = $.querySelector('#time-counter');
let learnCounter = $.querySelector('#learn-counter');
let userCounter = $.querySelector('#user-counter');
let inputnewsletter = $.querySelector('#inputnewsletter');

window.addEventListener('load', () => {
    let textTitle = "ما به هر قیمتی دوره اموزشی تولید نمیکنیم!"
    let index = 0
    landing_text(textTitle, index);
    counterLanding(136_7, timeCounter)
    counterLanding(40, learnCounter)
    counterLanding(210_0, userCounter)
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
function counterLanding(count, elem) {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter === count) {
            clearInterval(interval)
        }

        elem.innerHTML = counter;
        counter++
    }, 0.5);


}

inputnewsletter.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const valinput = inputnewsletter.value;
        const sentnewsletter = {
            email: valinput.trim()
        };
        sentemailnewsletter(sentnewsletter);
        event.target.value = "";
    }
})

const sentemailnewsletter = async (sentnewsletter) => {
    try {
        const res = await fetch('http://localhost:4000/v1/newsletters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sentnewsletter)
        })
        if (res.status == 201) {
            showswall("با موفقیت ارسال شد.", "success", "ok", () => {
                location.href = "index.html"
            })
        }
    } catch (error) {
        showswall(" دوباره سعی کنید ارسال نشد.", "error", "home", () => {
            location.href = "index.html"
        })
    }
} 