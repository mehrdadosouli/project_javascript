import { getAdminInfos } from "../../panel/funcs/utils.js";
import { insertNotificationHtmlTemplate, seenNotification } from "../panel/funcs/notification.js";

window.seenNotification = seenNotification

const $ = document;

window.addEventListener("load", () => {
  const adminNameElem = $.querySelector("#admin-name");
  const notificationsIconElem = $.querySelector('#notifications-icon')
  const notificationsBoxElem = $.querySelector('.home-notification-modal')

  getAdminInfos().then((admin) => {
    // Protect Cms Routes
    if (admin.role === "ADMIN") {
      // Show Admin Name In Cms Homepage
      adminNameElem.innerHTML = admin.name;
    } else {
      location.replace("../../login.html");
    }

    notificationsIconElem.addEventListener('mouseenter', () => {
      notificationsBoxElem.classList.add('active-modal-notfication')
    })

    notificationsBoxElem.addEventListener('mouseleave', () => {
      notificationsBoxElem.classList.remove('active-modal-notfication')
    })
    insertNotificationHtmlTemplate(admin.notifications)

  });


});
