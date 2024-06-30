const currencies = [
            { code: "USD", name: "United States Dollar" },
            { code: "EUR", name: "Euro" },
            { code: "JPY", name: "Japanese Yen" },
            { code: "GBP", name: "British Pound" },
            { code: "AUD", name: "Australian Dollar" },
            { code: "CAD", name: "Canadian Dollar" },
            { code: "CHF", name: "Swiss Franc" },
            { code: "CNY", name: "Chinese Yuan" },
            { code: "SEK", name: "Swedish Krona" },
            { code: "NZD", name: "New Zealand Dollar" },
            { code: "MXN", name: "Mexican Peso" },
            { code: "SGD", name: "Singapore Dollar" },
            { code: "HKD", name: "Hong Kong Dollar" },
            { code: "NOK", name: "Norwegian Krone" },
            { code: "KRW", name: "South Korean Won" },
            { code: "TRY", name: "Turkish Lira" },
            { code: "INR", name: "Indian Rupee" },
            { code: "RUB", name: "Russian Ruble" },
            { code: "BRL", name: "Brazilian Real" },
            { code: "ZAR", name: "South African Rand" },
            { code: "DKK", name: "Danish Krone" },
            { code: "THB", name: "Thai Baht" },
            { code: "MYR", name: "Malaysian Ringgit" },
            { code: "IDR", name: "Indonesian Rupiah" },
            { code: "CZK", name: "Czech Koruna" },
            { code: "HUF", name: "Hungarian Forint" },
            { code: "AED", name: "United Arab Emirates Dirham" },
            { code: "ILS", name: "Israeli New Shekel" },
            { code: "CLP", name: "Chilean Peso" },
            { code: "PHP", name: "Philippine Peso" },
            { code: "SAR", name: "Saudi Riyal" },
            { code: "COP", name: "Colombian Peso" },
            { code: "TWD", name: "New Taiwan Dollar" },
            { code: "PKR", name: "Pakistani Rupee" },
            { code: "EGP", name: "Egyptian Pound" },
            { code: "NGN", name: "Nigerian Naira" },
            { code: "BDT", name: "Bangladeshi Taka" },
            { code: "VND", name: "Vietnamese Dong" },
            { code: "KES", name: "Kenyan Shilling" },
            { code: "GHS", name: "Ghanaian Cedi" },
            { code: "UAH", name: "Ukrainian Hryvnia" },
            { code: "QAR", name: "Qatari Riyal" },
            { code: "KWD", name: "Kuwaiti Dinar" },
            { code: "DZD", name: "Algerian Dinar" },
            { code: "MAD", name: "Moroccan Dirham" },
            { code: "OMR", name: "Omani Rial" },
            { code: "JOD", name: "Jordanian Dinar" },
            { code: "BHD", name: "Bahraini Dinar" },
            { code: "LYD", name: "Libyan Dinar" }
        ];

const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convert_btn=document.getElementById("submit");
const converted_amount=document.getElementById("converted-amount");
const loader=document.querySelector(".loader");
const exchangeIcon=document.querySelector(".exchange-icon");
const amount_to_convert = document.getElementById('amount');
const from_Currency = document.getElementById('from-currency');
const to_Currency = document.getElementById('to-currency');

toCurrencySelect.addEventListener("change",(event)=>{
    update(event.target.value)
})

function update(val){
    convert_btn.textContent="Convert to "+val;
}

currencies.forEach(currency => {
    const optionFrom = document.createElement('option');
    optionFrom.value = currency.code;
    optionFrom.textContent = `${currency.name} (${currency.code})`;
    fromCurrencySelect.appendChild(optionFrom);
    const optionTo = document.createElement('option');
    optionTo.value = currency.code;
    optionTo.textContent = `${currency.name} (${currency.code})`;
    toCurrencySelect.appendChild(optionTo);
});


convert_btn.addEventListener('click', async function(event) {
    event.preventDefault();
    const amount = amount_to_convert.value;
    const fromCurrency = from_Currency.value;
    const toCurrency =to_Currency.value;
    if(amount){
        const api_key='a1d91f4845f7e727319babfa';
        let url=` https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency}`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = amount * exchangeRate;
                converted_amount.textContent = `Converted Amount: ${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching exchange rate:', error);
                document.getElementById('result').textContent = 'Error fetching exchange rate.';
            });
    
    }
    else
    {
        alert("Please enter amount to be converted");
    }
});

exchangeIcon.addEventListener("click",(event)=>{
    [from_Currency.value,to_Currency.value]=[to_Currency.value,from_Currency.value]
    update(to_Currency.value)
})