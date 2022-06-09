import Loading from "./component/Loading.js";

const collegeListUrl = "http://localhost:3000/consonant";
const loginUrl = "http://localhost:3000/auth/1";
const Login = {
    init: function (attr) {
        const $loginForm = document.querySelector("#loginForm");
        const $consonants = document.querySelectorAll(".consonants-label");
        const $loginButton = document.querySelector("#loginBtn");

        this.loadSavedUserId(); // preload user id

        $loginForm.addEventListener('keydown',event=>{
            if(event.keyCode ===13) event.preventDefault();
        });

        $consonants.forEach(consonant => {
            consonant.addEventListener('click', this.onLoadCollegeList);
            // consonant.addEventListener('keydown',event=>{
            //     console.log(event);
            //     if(event.keyCode ===13 || event.keyCode === 32){
            //         _this.onLoadCollegeList(event);
            //     }
            // })
        });

        $loginButton.addEventListener('click', this.onLogin); // add login button event
    },
    onLoadCollegeList: async function (event) {
        const radioId = event.target.attributes["for"].value;
        const $radioButton = document.querySelector(`#${radioId}`);
        const consonantText = $radioButton.value;

        const $collegeSelector = document.querySelector("#college-selector");

        if (consonantText === null || consonantText === undefined || consonantText === "") return;

        const collegeList = await fetch(collegeListUrl)
            .then(response => response.json())
            .then(data => data);

        $collegeSelector.innerHTML = collegeList.map(college => `<option value =${college.id}>${college.text}</option>`)
    },
    onLogin: async function (event) {
        event.preventDefault(); // prevent bubbling event to parent event

        const $collegeSelector = document.getElementById('college-selector');
        const $id = document.querySelector("#id");
        const $pw = document.querySelector("#password");

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

        const $saveCheckbox = document.querySelector("#save-id-checkbox");

        $saveCheckbox.checked
            ? localStorage.setItem("userId", data.id)
            : localStorage.removeItem("userId"); // 아이디 저장 기능 검증

        alert(`환영합니다. ${data.id}님`);

        // please change this code
       // location.reload(); // redirect url

    }, // login Process
    loginFailProcess: function (data) {
    },
    loadSavedUserId: function () {
        const userId = localStorage.getItem("userId");
        if (userId === null || userId === undefined) return;

        document.querySelector("#id").value = userId;
        document.querySelector("#save-id-checkbox").checked = true;
    },
}
Login.init();



