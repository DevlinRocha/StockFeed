// Variables:

const tickerSearchComp = document.querySelector('ticker-search');
const viewSelectComp = document.querySelector('view-select');
const viewContentComp = document.querySelector('view-content');

// Functions:

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes') {
            const oldTicker = viewContentComp.getAttribute('ticker');

            switch (mutation.attributeName) {
            
                case 'view':
            
                    if (oldTicker) {
                        const viewSelectCompValue = viewSelectComp.getAttribute('view');
                        viewContentComp.setAttribute('view', viewSelectCompValue);
                    };
                    break;
            
                case 'ticker':
            
                    const newTicker = tickerSearchComp.getAttribute('ticker');
                    viewContentComp.setAttribute('ticker', newTicker);   
                    break;
            };
        };
    });
});

observer.observe(tickerSearchComp, {
    attributes: true,
});

observer.observe(viewSelectComp, {
    attributes: true,
});