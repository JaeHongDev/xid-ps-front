import api from "./api/index.js";

const WARNNING_MESSAGE_URL = "http://localhost:3000/warnning-message";
const NOTICE_MESSAGE_URL = "http://localhost:3000/notice-message";

const main = {
    init: function () {

        const _this = this;
        const $menuButtons = document.querySelectorAll(".xidps-menu-buttons");
        const $priceTooltipButton = document.querySelector("#price-tooltip");

        _this.onloadMessage()
        _this.onloadPage();
        //setInterval(_this.onloadMessage, 10000)
        $menuButtons.forEach($menuButton => $menuButton.addEventListener('click', () => {
            _this.removeMenuButtonClass($menuButton)
            _this.onloadPage();
        }))
    }, removeMenuButtonClass: function ($menuButton) {
        document.querySelector(".xidps-menu-active")?.classList.remove("xidps-menu-active"); //remove previous class
        $menuButton.classList.add("xidps-menu-active");
    },

    onloadPage: async function () {
        const sampleDashboardUrl = `http://${location.host}/pages/dashboard.html`;
        const sampleSendMessageUrl = `http://${location.host}/pages/send-message.html`;
        const url = "http://localhost:63342/xid-ps-front/pages/dashboard.html";
        const content = document.querySelector("#xidps-content");
        fetch(sampleSendMessageUrl).then(response => response.text()).then(html => {
            content.innerHTML = html;
            const parser = new DOMParser();
            const doc =parser.parseFromString(html,'text/html');
            const script = doc.querySelector('script').textContent
            eval(script);
        });
    },

    onloadMessage: async function () {

        const warnningMessageResult = await api.get(WARNNING_MESSAGE_URL);
        const noticeMessageResult = await api.get(NOTICE_MESSAGE_URL);

        const $warnningArea = document.querySelector("#xidps-warnning-area");

        const $warningMessageDiv = document.createElement('div');
        $warningMessageDiv.classList.add("xidps-card", "xidps-warn", "p-3")
        $warningMessageDiv.textContent = warnningMessageResult.message;

/*
        $warnningArea.children.length ?
            $warnningArea.appendChild($warningMessageDiv)
            : $warnningArea.insertBefore($warningMessageDiv, $warnningArea.firstChild)

        $warnningArea.innerHTML = ` <div class='xidps-card xidps-warn p-3'>${warnningMessageResult.message}</div>`
*/

        const $noticeArea = document.querySelector("#xidps-notice-area")
        $noticeArea.innerHTML = ` <div class='xidps-card p-3 '>${noticeMessageResult.message}</div>`
    }
}
main.init();
