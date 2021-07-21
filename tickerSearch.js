const tickerSearch = document.createElement('template');
tickerSearch.innerHTML = `
    <style>
        .ticker-search {
            display: flex;
            flex-direction: column;
        }
    </style>
    <form class="ticker-search" name="ticker-search" action="javascript:void(0);">
        <label for="ticker-search">Ticker:</label>
        <input class="ticker-input" type="text" placeholder="Search..." name="ticker">
        <input class="search-button" type="submit" value="Search"/>
    </form>
`;

class TickerSearch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(tickerSearch.content.cloneNode(true));
    };

    searchTicker() {
        const oldTicker = this.getAttribute('ticker');
        const newTicker = this.shadowRoot.querySelector('.ticker-input').value;

        if (newTicker && newTicker !== oldTicker) {
            this.setAttribute('ticker', newTicker);
        };
    };

    connectedCallback() {
        this.shadowRoot.querySelector('.ticker-search')
        .addEventListener('submit', () => this.searchTicker());
    };

    disconnectedCallback() {
        this.shadowRoot.querySelector('.ticker-search')
        .removeEventListener();
    };
};

window.customElements.define('ticker-search', TickerSearch);