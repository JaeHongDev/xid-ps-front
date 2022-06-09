const WARNNING_MESSAGE_URL = "http://localhost:3000/warnning-message";
const NOTICE_MESSAGE_URL = "http://localhost:3000/notice-message";

const main = {
    init: function () {

        const _this = this;
        const $menuButtons = document.querySelectorAll(".xidps-menu-buttons");
        const $priceTooltipButton = document.querySelector("#price-tooltip");
        $priceTooltipButton.tooltip();

        setInterval(_this.onloadMessage, 10000)
        $menuButtons.forEach($menuButton => $menuButton.addEventListener('click', () => {
            _this.removeMenuButtonClass($menuButton)
            _this.onloadPage();
        }))
    }, removeMenuButtonClass: function ($menuButton) {
        document.querySelector(".xidps-menu-active")?.classList.remove("xidps-menu-active"); //remove previous class
        $menuButton.classList.add("xidps-menu-active");
    },

    onloadPage: async function () {
        const sampleDashboardUrl = `https://${location.host}/pages/dashboard.html`;

        const content = document.querySelector("#xidps-content");
        fetch(sampleDashboardUrl).then(response => response.text()).then(html => {
            content.innerHTML = html;
        });
    },

    onloadMessage: async function () {
        const warnningMessageResult = await fetch(WARNNING_MESSAGE_URL).then(response => response.json());
        const noticeMessageResult = await fetch(NOTICE_MESSAGE_URL).then(response => response.json());

        const $warnningArea = document.querySelector("#xidps-warnning-area");

        const $warningMessageDiv = document.createElement('div');
        $warningMessageDiv.classList.add("xidps-card", "xidps-warn", "p-3")
        $warningMessageDiv.textContent = warnningMessageResult.message;

        $warnningArea.children.length ?
            $warnningArea.appendChild($warningMessageDiv)
            : $warnningArea.insertBefore($warningMessageDiv, $warnningArea.firstChild)

        $warnningArea.innerHTML = ` <div class='xidps-card xidps-warn p-3'>${warnningMessageResult.message}</div>`

        const $noticeArea = document.querySelector("#xidps-notice-area")
        $noticeArea.innerHTML = ` <div class='xidps-card p-3 '>${noticeMessageResult.message}</div>`
    }
}
main.init();
