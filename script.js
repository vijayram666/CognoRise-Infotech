// Function to fetch currency exchange rates
async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates;
}

// Function to populate currency options
async function populateCurrencyOptions() {
    const currencies = await fetchExchangeRates();
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    for (const currency in currencies) {
        const option1 = document.createElement('option');
        option1.text = currency;
        option1.value = currency;
        const option2 = option1.cloneNode(true);

        fromCurrencySelect.add(option1);
        toCurrencySelect.add(option2);
    }
}

// Function to convert currency
async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('fromAmount').value;

    const rates = await fetchExchangeRates();
    const rate = rates[toCurrency] / rates[fromCurrency];
    const result = amount * rate;

    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

// Populate currency options when the page loads
window.onload = populateCurrencyOptions;
