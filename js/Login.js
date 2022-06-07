import Loading from "./component/Loading.js";

const Login = {
    init: function (attr) {
        const _this = this;
        const $consonants = document.querySelectorAll(".consonants-label");
        const $loginButton = document.getElementById("loginBtn");
        const $collegeSelector = document.getElementById("college-selector");
        // preload user id
        this.loadSavedUserId();


        $consonants.forEach(function (consonant) {
            consonant.addEventListener('click', function (event) {
                const radioId = event.target.attributes["for"].value;
                const $radioButton = document.getElementById(radioId);
                const consonantText = $radioButton.value;
                if (consonantText === null || consonantText === undefined || consonantText === "") return;

                fetch("http://localhost:3000/consonant")
                    .then(response => response.json())
                    .then(data => {
                        $collegeSelector.innerHTML = data.map(function (consonant) {
                            return `<option value = ${consonant.id}>${consonant.text}</option>`
                        });
                    })

            })
        })
        $loginButton.addEventListener('click', this.login); // add login button event


    },
    login: function (event) {
        event.preventDefault();

        const $collegeSelector = document.getElementById('college-selector');
        $collegeSelector.value;

        const $id = document.getElementById("id");
        const $pw = document.getElementById("password");

        const data = {
            id: $id.value,
            password: $pw.value,
            collegeType: $collegeSelector.value
        };

        Loading.start();
        fetch("http://localhost:3000/auth/1")
            .then(response => response.json())
            .then(data => Login.loginSuccessProcess($id.value, data.token))
            .catch(error => console.log(error));
        Loading.stop();
    },
    loginSuccessProcess: function (userId, token) {
        if (token === null) {
            alert("로그인 실패");
            return;
        }
        const $saveCheckbox = document.getElementById("save-id-checkbox");

        $saveCheckbox.checked
            ? localStorage.setItem("userId", userId)
            : localStorage.removeItem("userId");

        alert(`환영합니다. ${userId}님`);
        location.reload();
    },
    loginFailProcess: function (data) {
    },
    loadSavedUserId: function () {
        const userId = localStorage.getItem("userId");
        if (userId === null || userId === undefined) return;

        document.getElementById("id").value = userId;
        document.getElementById("save-id-checkbox").checked = true;
    },

}
Login.init();



