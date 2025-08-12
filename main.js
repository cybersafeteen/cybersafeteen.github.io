const pricingData = {
  SAR: [
    { label: 'Monthly', price: 29.99 },
    { label: '3 Months', price: 50.00 },
    { label: '6 Months', price: 75.00 },
    { label: 'Yearly', price: 300.00 },
  ],
  USD: [
    { label: 'Monthly', price: 7.99 },
    { label: '3 Months', price: 14.00 },
    { label: '6 Months', price: 21.00 },
    { label: 'Yearly', price: 84.00 },
  ],
  EUR: [
    { label: 'Monthly', price: 7.50 },
    { label: '3 Months', price: 13.00 },
    { label: '6 Months', price: 20.00 },
    { label: 'Yearly', price: 80.00 },
  ],
  GBP: [
    { label: 'Monthly', price: 6.50 },
    { label: '3 Months', price: 11.00 },
    { label: '6 Months', price: 18.00 },
    { label: 'Yearly', price: 72.00 },
  ],
  JPY: [
    { label: 'Monthly', price: 1100 },
    { label: '3 Months', price: 2200 },
    { label: '6 Months', price: 3300 },
    { label: 'Yearly', price: 13000 },
  ],
};

function detectCurrency() {
  const locale = navigator.language || 'en-US';
  const region = locale.split('-')[1] || 'US';
  switch(region.toUpperCase()) {
    case 'SA': return 'SAR';
    case 'US': return 'USD';
    case 'GB': return 'GBP';
    case 'JP': return 'JPY';
    case 'DE': case 'FR': case 'ES': case 'IT': case 'NL': case 'BE': case 'AT': case 'IE': case 'PT': case 'FI': case 'SE': return 'EUR';
    default: return 'USD';
  }
}

function formatPrice(price, currency) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(price);
}

const pricingContainer = document.getElementById('pricingOptions');
const currency = detectCurrency();
let selectedOptionIndex = 0;

function renderPricing() {
  pricingContainer.innerHTML = '';
  const options = pricingData[currency] || pricingData['USD'];
  options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'price-option';
    div.textContent = `${opt.label}: ${formatPrice(opt.price, currency)}`;
    if(i === selectedOptionIndex) div.classList.add('selected');
    div.addEventListener('click', () => {
      selectedOptionIndex = i;
      renderPricing();
    });
    pricingContainer.appendChild(div);
  });
}
renderPricing();

document.getElementById('visaBtn').addEventListener('click', () => {
  alert(`You selected to pay ${formatPrice(pricingData[currency][selectedOptionIndex].price, currency)} with Visa.\n(Payment integration coming soon!)`);
});
document.getElementById('applePayBtn').addEventListener('click', () => {
  alert(`You selected to pay ${formatPrice(pricingData[currency][selectedOptionIndex].price, currency)} with Apple Pay.\n(Payment integration coming soon!)`);
});
