class ButtonGroup extends HTMLElement {
    constructor() {
        super();
        const _this = this;
        //aria-label='Basic radio toggle button group' class='d-flex pt-5'
        //<script crossorigin="anonymous" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
        const shadowRoot = this.attachShadow({mode: 'open'});
        //const {linkElem, scriptElem} = this.linkAndScriptTag();


        const consonants = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ".split("");

        const $div = document.createElement('div');
        $div.classList.add('d-flex', 'pt-5');

        consonants.forEach((consonants, index) => {
            $div.append(..._this.createButton(consonants, index))
        })
        this.append($div)
    }

    linkAndScriptTag() {
        const bootstrapLink = `https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css`;
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', bootstrapLink);
        linkElem.setAttribute('crossorigin', 'anonymous')

        const scriptLink = `https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js`;
        const scriptElem = document.createElement('script');
        scriptElem.setAttribute('src', scriptLink);
        scriptElem.setAttribute('crossorigin', 'anonymous')
        return {linkElem, scriptElem};
    }

    createButton(text = "", index) {
        //<input autocomplete='off' class='btn-check' id='btnradio1' name='consonants' type='radio'>
        //<label class='btn btn-outline-primary consonants-label small' for='btnradio1'>ㄱ</label>
        const $input = document.createElement('input');
        const $label = document.createElement('label');

        const id = `button${index + 1}`;
        // input setting
        $input.classList.add('btn-check')
        $input.setAttribute('autocomplete', 'off');
        $input.setAttribute('type', 'radio')
        $input.setAttribute('name','group1')
        $input.id = id;

        $label.classList.add('btn', 'btn-outline-primary', 'consonants-label', 'small');
        $label.setAttribute('for', id);
        $label.textContent = text;
        return [$input, $label];
    }
}

customElements.define('button-group', ButtonGroup);
