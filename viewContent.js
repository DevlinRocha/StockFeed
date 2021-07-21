import { IEXAPIToken } from './config.js';
import { IEXStock } from './iex.js';

const viewContent = document.createElement('template');
viewContent.innerHTML = `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
        }

        .view {
            margin: 16px;
        }

    </style>

    <h2 class="view">Welcome</h2>
    <figure>
        <img class="logo" alt="">
    </figure>
    <h3 class="company-name"></h3>
    <p class="description"></p>
    <p class="ticker"></p>
    <p class="exchange"></p>
    <p class="industry"></p>
    <a class="website" href="#" target="_blank"></a>
    <p class="ceo"></p>
    <p class="sector"></p>
`;

class ViewContent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(viewContent.content.cloneNode(true));
    };

    static get observedAttributes() {
        return ['view', 'ticker'];
    };

    attributeChangedCallback(prop, oldValue, newValue) {
        switch (prop) {

            case 'ticker':

                this.shadowRoot.querySelector('.ticker').innerText = newValue;
                break;

            case 'view':

                this.shadowRoot.querySelector('.view').innerText = newValue;

                switch (newValue) {

                    case 'Overview':
                        break;
                };
        };

        const ticker = this.getAttribute('ticker');
        
        if (ticker) {

            const stock = new IEXStock(IEXAPIToken, ticker);

            stock.getLogo().then(logo => {
                this.shadowRoot.querySelector('.logo').setAttribute('src', logo.url);
            });

            stock.getCompanyInfo().then(companyInfo => {
                const element = document.createElement('p');
                element.innerText = companyInfo.companyName;
                this.shadowRoot.querySelector
                this.shadowRoot.querySelector('.company-name').innerText = companyInfo.companyName;
                this.shadowRoot.querySelector('.description').innerText = companyInfo.description;
                this.shadowRoot.querySelector('.ticker').innerText = companyInfo.symbol;
                this.shadowRoot.querySelector('.exchange').innerText = companyInfo.exchange;
                this.shadowRoot.querySelector('.company-name').innerText = companyInfo.companyName;
                this.shadowRoot.querySelector('.industry').innerText = companyInfo.industry;
                this.shadowRoot.querySelector('.website').innerText = companyInfo.website;
                this.shadowRoot.querySelector('.website').setAttribute('href', companyInfo.website);
                this.shadowRoot.querySelector('.ceo').innerText = companyInfo.CEO;
                this.shadowRoot.querySelector('.sector').innerText = companyInfo.sector;
            });
        };
    };
};

window.customElements.define('view-content', ViewContent);