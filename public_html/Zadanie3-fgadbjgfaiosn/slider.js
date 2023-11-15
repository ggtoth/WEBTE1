class RangeSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
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
        this.inputTypeRange.max = this.max;
        this.inputTypeRange.step = 0.01;
        this.inputTypeRange.value = this.value;

        let rangeContainer = document.createElement('div');
        rangeContainer.className = 'range-container';

        this.rangeSpan = document.createElement('span');
        this.rangeSpan.className = 'custom-range-value';
        this.rangeSpan.innerText = this.value;

        this.container = document.createElement('div');
        this.container.className = 'container';

        rangeContainer.appendChild(this.inputTypeRange);
        rangeContainer.appendChild(this.rangeSpan);
        this.container.appendChild(rangeContainer);
        this.container.appendChild(this.inputTypeNumber);

        const style = document.createElement('style');
        style.innerHTML = `
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 10rem;
                 }
                 
                .custom-range {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 100%;
                  height: 15px;
                  border-radius: 5px; 
                  background: white;
                  border: solid grey 1px;
                  outline: none;
                  opacity: 1;
                  margin: 10px 0px;
                }
                
                .custom-range::-webkit-slider-thumb {
                  -webkit-appearance: none; 
                  appearance: none;
                  width: 50px;
                  height: 25px;
                  border-radius: 5px;
                  border: solid grey 1px;
                  background: #e8e6e6;
                  cursor: pointer;
                }
                
                .custom-range::-moz-range-thumb {
                  width: 25px;
                  height: 25px;
                  background: #d3d3d3; 
                  cursor: pointer;
                }
                
                .range-container{
                    position: relative;
                    width: 100%;
                }
                
                .custom-range-value {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  user-select: none;
                  pointer-events: none;
                }
                
                .custom-number{
                    background: #e8e6e6;
                    border-radius: 5px;
                    border: solid grey 1px;
                }
        `;

        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(style);

        this.inputTypeNumber.addEventListener('input', () => this.handleNumber());
        this.inputTypeRange.addEventListener('input', () => this.handleRange());
        this.update();
    }

    handleNumber() {
        this.value = this.inputTypeNumber.value;
        if (this.value > this.max) {
            this.value = this.max;
        } else if (this.value < this.min) {
            this.value = this.min
        }
        this.update();
    }

    handleRange() {
        this.value = this.inputTypeRange.value;
        this.update();
    }

    update() {
        this.inputTypeRange.value = this.value;
        this.inputTypeNumber.value = this.value;
        this.rangeSpan.innerText = this.value;

        const val = (this.value - this.min) / (this.max - this.min);
        this.rangeSpan.style.left = `calc(${val * 100}% - ${(val * 50) - 25}px)`;

        this.broadcast();
    }

    broadcast() {
        this.dispatchEvent(new CustomEvent('valueChange', {detail: {value: this.value}}))
    }

    clearShadowRoot() {
        this.shadowRoot.innerHTML = '';
    }
}

customElements.define("range-slider", RangeSlider);