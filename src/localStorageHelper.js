const ENTRIES_KEY = 'entries';

class LocalStorage {
    constructor() {
        const entriesString = localStorage.getItem(ENTRIES_KEY);
        let entries = null;
        if (entriesString) {
            entries = JSON.parse(entriesString);
        } else {
            entries = Object.create(null);
            localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
        }
        this.entries = entries;
    }

    getInputValueForId = id => this.entries[id] ||Object.create(null);


    storeIdAndInputValue = (id, amountOfCurrency, oldCurrencyValue) => {
        this.entries[id] = Object.create(null);
        this.entries[id].amountOfCurrency = amountOfCurrency;
        this.entries[id].oldCurrencyValue = oldCurrencyValue;
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(this.entries));
    };
}

export default new LocalStorage();