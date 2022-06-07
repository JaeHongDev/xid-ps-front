import Loading from "./component/Loading.js";

const collegeListUrl = "http://localhost:3000/consonant";
const loginUrl = "http://localhost:3000/auth/1";
const Login = {
    init: function (attr) {
        const _this = this;

        const $consonants = document.querySelectorAll(".consonants-label");
        const $loginButton = document.getElementById("loginBtn");

        this.loadSavedUserId(); // preload user id

        $consonants.forEach(consonant=>consonant.addEventListener('click', _this.loadCollegeList)); // initialize consonants radio group event // get all consonants radio group
        $loginButton.addEventListener('click', this.login); // add login button event
    },
    loadCollegeList: async function (event) {
        const radioId = event.target.attributes["for"].value;
        const $radioButton = document.getElementById(radioId);
        const consonantText = $radioButton.value;

        const $collegeSelector = document.getElementById("college-selector");

        if (consonantText === null || consonantText === undefined || consonantText === "") return;

        const collegeList = await fetch(collegeListUrl)
            .then(response => response.json())
            .then(data => data);

         $collegeSelector.innerHTML = collegeList.map(college => `<option value =${college.id}>${college.text}</option>`)
    },
    login: async function (event) {
        event.preventDefault(); // prevent bubbling event to parent event

        const $collegeSelector = document.getElementById('college-selector');
        const $id = document.getElementById("id");
        const $pw = document.getElementById("password");

        const data = {
            id: $id.value,
            password: $pw.value,
            collegeType: $collegeSelector.value
        }; // mock data arguments

        Loading.start();
        const authResult = await fetch(loginUrl)
            .then(response => response.json())
            .catch(error => console.log(error));
        Loading.stop();


        if (authResult.token === undefined || authResult.token === null || authResult.token === "") {
            alert("로그인 실패");
            return;
        }

        const $saveCheckbox = document.getElementById("save-id-checkbox");

        $saveCheckbox.checked
            ? localStorage.setItem("userId", authResult.userId)
            : localStorage.removeItem("userId"); // 아이디 저장 기능 검증

        alert(`환영합니다. ${authResult.userId}님`);

        // please change this code
        location.reload(); // redirect url

    }, // login Process
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



