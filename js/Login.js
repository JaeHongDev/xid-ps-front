const Login = {
    init: function () {
        const _this = this;

        const loginButton = document.getElementById("loginBtn");
        //event bubbling close
        loginButton.addEventListener('click', this.login);
    },

    login: function (event) {
        event.preventDefault();

        const $collegeSelector = document.getElementById('collegeSelector');
        $collegeSelector.value;

        const $id = document.getElementById("id");
        const $pw = document.getElementById("password");

        const data = {
            id: $id.value,
            password: $pw.value,
            collegeType: $collegeSelector.value
        };
    }
}

Login.init();
