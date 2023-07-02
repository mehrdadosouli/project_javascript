import { showswall, getToken } from "../../funcs/utils.js";

let table = document.querySelector('.table tbody');
const getAllContact = async () => {
    table.innerHTML = ""
    let res = await fetch('http://localhost:4000/v1/contact');
    const data = await res.json();
    if (res.status == 200) {
        data.forEach((item, index) => {
            table.insertAdjacentHTML('beforeend', `
            <tr>
                <th style="${item.answer ? "background-color: green" : "background-color: red"}" id="itemcheck">${index + 1}</th>
                <th>${item.name}</th>
                <th>${item.email}</th>
                <th>${item.phone}</th>
                <th>${item.updatedAt.slice(0, 10)}</th>
                <td>
                     <button type="button" onclick='showList(${JSON.stringify(item.body)})' class="btn btn-success" id="show-btn">مشاهده </button>                </td>
                <td>
                <td>
                     <button type='button' onclick='answerList(${JSON.stringify(item.email)})' class='btn btn-primary edit-btn'>پاسخ</button>
                <td>
                     <button type="button" onclick="editeList('${item._id}')" class="btn btn-primary" id="edit-btn">ویرایش </button>
                </td>
                <td>
                     <button type="button" onclick="deleteBtn('${item._id}')" class="btn btn-danger" id="delete-btn">حذف </button>
                </td>
                </tr>  
            `)
        })
    }
}

const showList = (txt) => {
    showswall(txt, "success", "ok", () => { })
}


const answerList = async (userEmail) => {
    console.log(userEmail);

    swal({
        title: "متن پاسخ را تایپ کنید:",
        content: "input",
        button: "ثبت پاسخ",
    }).then(async (result) => {
        if (result) {
            const contactAnswerInfos = {
                email: userEmail,
                answer: result,
            };

            const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactAnswerInfos),
            });

            if (res.ok) {
                showswall(
                    "پاسخ مورد نظر برای کاربر ایمیل شد",
                    "success",
                    "خیلی هم عالی",
                    () => { getAllContact() }
                );
            }
        }
    });
};


const deleteBtn = async (id) => {
    showswall(
        "میخواهید حذف کنید؟",
        "warning",
        ["نه","اره"],
        async (result) => {
            if (result) {
                var res = await fetch(`http://localhost:4000/v1/contact/${id}`, {
                    method: "DELETE"
                });
            }
            if (res.ok) {
                showswall(
                    "کاربر مورد نظر حذف شد",
                    "success",
                    "خیلی هم عالی",
                    () => { getAllContact() }
                );
            }
        })
}
export { getAllContact, showList, answerList, deleteBtn }