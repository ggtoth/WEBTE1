class RangeSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open'});

        this.min = this.getAttribute('minimal') ? this.getAttribute('minimal') : 0;
        this.max = this.getAttribute('maximal') ? this.getAttribute('maximal') : 3;
        this.value = this.getAttribute('value') ? this.getAttribute('value') : 1;

        this.inputTypeNumber = document.createElement('input');
        this.inputTypeNumber.type = 'number';
        this.inputTypeNumber.className = 'custom-number';
        this.inputTypeNumber.setAttribute('min', this.min);
        this.inputTypeNumber.setAttribute('max', this.max);
        this.inputTypeNumber.step = 0.5;
        this.inputTypeNumber.value = this.value;

        this.inputTypeRange = document.createElement('input');
        this.inputTypeRange.type = 'range';
        this.inputTypeRange.className = 'custom-range';
        this.inputTypeRange.min = this.min;
        this.inputTypeRange.max =  this.max;
        this.inputTypeRange.step = 0.01;
        this.inputTypeRange.value = this.value;

        this.container = document.createElement('div');
        this.container.className = 'container';

        this.container.appendChild(this.inputTypeRange);
        this.container.appendChild(this.inputTypeNumber);

        const style = document.createElement('style');
        style.innerHTML = `
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 10rem;
                 }
        `;

        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(style);

        this.inputTypeNumber.addEventListener('input', () => this.handleNumber());
        this.inputTypeRange.addEventListener('input', () => this.handleRange());
    }

    handleNumber(){
        this.value = this.inputTypeNumber.value;
        if(this.value > this.max){
            this.value = this.max;
        }
        else if(this.value < this.min){
            this.value = this.min
        }
        this.update();
    }
    handleRange(){
        this.value = this.inputTypeRange.value;
        this.update();
    }

    update(){
        this.inputTypeRange.value = this.value;
        this.inputTypeNumber.value = this.value;
        this.broadcast();
    }

    broadcast(){
        this.dispatchEvent(new CustomEvent('valueChange', { detail: { value: this.value } }))
    }
}

customElements.define("range-slider", RangeSlider);