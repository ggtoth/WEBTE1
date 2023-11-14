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
                  -webkit-appearance: none; /* Override default CSS styles */
                  appearance: none;
                  width: 100%; /* Full-width */
                  height: 15px; /* Specified height */
                  background: #d3d3d3; /* Grey background */
                  outline: none; /* Remove outline */
                  opacity: 1;
                  margin: 10px 0px;
                }
                
                .custom-range::-webkit-slider-thumb {
                  -webkit-appearance: none; /* Override default look */
                  appearance: none;
                  width: 50px; /* Set a specific slider handle width */
                  height: 25px; /* Slider handle height */
                  border-radius: 5px;
                  background: grey; /* Green background */
                  cursor: pointer;
                }
                
                .custom-range::-moz-range-thumb {
                  width: 25px; /* Set a specific slider handle width */
                  height: 25px; /* Slider handle height */
                  background: grey; /* Green background */
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
        this.rangeSpan.innerText = this.value;

        this.broadcast();
    }

    broadcast(){
        this.dispatchEvent(new CustomEvent('valueChange', { detail: { value: this.value } }))
    }
}

customElements.define("range-slider", RangeSlider);