import { showswall } from "./funcs/utils.js";

let $ = document
let landing__title = $.querySelector('.landing__title');
let timeCounter = $.querySelector('#time-counter');
let learnCounter = $.querySelector('#learn-counter');
let userCounter = $.querySelector('#user-counter');
let inputnewsletter = $.querySelector('#inputnewsletter');
let landingSearchinput = $.querySelector('#landing__search-input');
let landingSearchBtn = $.querySelector('#landing__search-btn');
let topbarPhone = $.querySelector('#top-bar__phone-link');
let topbarEmail = $.querySelector('#top-bar__email-linK');

window.addEventListener('load', () => {
    let textTitle = "ما به هر قیمتی دوره اموزشی تولید نمیکنیم!"
    let index = 0
    landing_text(textTitle, index);
    searchHandler()
    infoInfoPage()
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

const searchHandler = () => {
    landingSearchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = landingSearchinput.value.trim();
        if (inputValue) {
            location.href = `search.html?value=${inputValue}`
        }
    })
}

const infoInfoPage = async () => {
    const res = await fetch('http://localhost:4000/v1/infos/index')
    const data = await res.json();
    topbarPhone.innerHTML=data.phone
    topbarEmail.innerHTML=data.email
    counterLanding(data.totalTime, timeCounter)
    counterLanding(data.coursesCount, learnCounter)
    counterLanding(data.usersCount, userCounter);

}