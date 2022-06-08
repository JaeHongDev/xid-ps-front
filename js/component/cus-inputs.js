export class CustomInputs extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = "<input type='button'>"
    }
}

