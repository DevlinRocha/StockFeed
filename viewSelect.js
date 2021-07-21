const viewSelect = document.createElement('template');
viewSelect.innerHTML = `
    <select class="view-select" name="view-select">
        <label for="view-select">View:</label>
        <option for="overview">Overview</option>
        <option for="fundamentals">Fundamentals</option>
        <option for="news">News</option>
        <option for="ownership">Ownership</option>
        <option for="technicals">Technicals</option>
    </select>
`;

class ViewSelect extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(viewSelect.content.cloneNode(true));
    };

    static get observedAttributes() {
        return ['view'];
    };

    selectView() {
        const viewSelectValue = this.shadowRoot.querySelector('.view-select').value;
        this.setAttribute('view', viewSelectValue);
    };

    connectedCallback() {
        this.shadowRoot.querySelector('.view-select').addEventListener('change', () => this.selectView());
    };

    disconnectedCallback() {
        this.shadowRoot.querySelector('.view-select')
        .removeEventListener();
    };
};

customElements.define('view-select', ViewSelect);