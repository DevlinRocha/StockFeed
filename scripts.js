// Variables:

const tickerSearchComp = document.querySelector('ticker-search');
const viewSelectComp = document.querySelector('view-select');
const viewContentComp = document.querySelector('view-content');

// Functions:

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes') {

            const oldView = viewContentComp.getAttribute('view');
            const oldTicker = viewContentComp.getAttribute('ticker');
            const newView = viewSelectComp.getAttribute('view');
            const newTicker = tickerSearchComp.getAttribute('ticker');

            if (oldTicker || mutation.attributeName === 'ticker') {
                
                if (newView !== oldView) viewContentComp.setAttribute('view', newView);
                if (newTicker !== oldTicker) viewContentComp.setAttribute('ticker', newTicker);
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