import { showswall , getToken } from "../../funcs/utils.js";
const table = document.querySelector('table tbody');

const getAllSessions = async () => {
    const res = await fetch('http://localhost:4000/v1/courses/sessions');
    const data = await res.json();
    table.innerHTML = "";
    data.forEach((session, index) => {
        table.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${session.title}</td>
                <td>${session.time}</td>
                <td>${session.updatedAt.slice(0, 10)}</td>
                <td>${session.shortName ? session.shortName : "-----"}</td>
                <td>
                  <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                  <button type='button' class='btn btn-danger delete-btn' onclick="deleteHandler('${session._id}')">حذف</button>
                </td>
            </tr>
        `)
    })
}

const deleteHandler = async (id) => {

    showswall("مطمعن هستید از حذف؟", "warning", ["نه", "اره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    }
                })
                if (res.ok) {
                    showswall("حذف شد", "success", "ok", async() => {
                       await getAllSessions()
                    })
                }
            }
        })
}

export { getAllSessions , deleteHandler }