export { IEXStock };

class IEXStock {
    constructor(token, ticker) {
        this.baseURL = 'https://cloud.iexapis.com/stable';
        this.token = token;
        this.ticker = ticker;
    };

    getCompanyInfo() {
        const url = `${this.baseURL}/stock/${this.ticker}/company?token=${this.token}`;
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    return data;
                });
            } else {
                console.error('Error');
            };
        });
    };

    getLogo() {
        const url = `${this.baseURL}/stock/${this.ticker}/logo?token=${this.token}`;
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    return data;
                });
            } else {
                console.error('Error');
            };
        });
    };
};