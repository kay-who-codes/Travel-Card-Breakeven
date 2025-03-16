// Get references to the input fields and result elements
const subscriptionPriceInput = document.getElementById('subscription-price');
const discountInput = document.getElementById('discount');
const transactionPriceInput = document.getElementById('transaction-price');
const transactionsFrequencyInput = document.getElementById('transactions-frequency');
const savingPerTransactionElement = document.getElementById('saving-per-transaction');
const savingPerPeriodElement = document.getElementById('saving-per-period');
const savingPerYearElement = document.getElementById('saving-per-year');
const breakEvenTransactionsElement = document.getElementById('break-even-transactions');
const breakEvenTimeElement = document.getElementById('break-even-time');
const totalSavingsYearElement = document.getElementById('total-savings-year');
const totalSavingsTwoYearsElement = document.getElementById('total-savings-two-years');
const totalSavingsFiveYearsElement = document.getElementById('total-savings-five-years');
const totalSavingsTenYearsElement = document.getElementById('total-savings-ten-years');

// Function to calculate break-even and savings
function calculateBreakEven() {
  const subscriptionPrice = parseFloat(subscriptionPriceInput.value);
  const discount = parseFloat(discountInput.value) / 100; // Convert percentage to decimal
  const transactionPrice = parseFloat(transactionPriceInput.value);
  const transactionsFrequency = transactionsFrequencyInput.value.trim().toLowerCase();

  // Extract number and period (pw/pm) from transactions frequency input
  const number = parseFloat(transactionsFrequency);
  const period = transactionsFrequency.includes('pw') ? 'week' : transactionsFrequency.includes('pm') ? 'month' : null;

  // Check if all inputs are valid
  if (isNaN(subscriptionPrice) || isNaN(discount) || isNaN(transactionPrice) || transactionPrice <= 0 || isNaN(number) || !period) {
    savingPerTransactionElement.textContent = "£0.00";
    savingPerPeriodElement.textContent = "£0.00";
    savingPerYearElement.textContent = "£0.00";
    breakEvenTransactionsElement.textContent = "0 transactions";
    breakEvenTimeElement.textContent = "0 weeks/months";
    totalSavingsYearElement.textContent = "£0.00";
    totalSavingsTwoYearsElement.textContent = "£0.00";
    totalSavingsFiveYearsElement.textContent = "£0.00";
    totalSavingsTenYearsElement.textContent = "£0.00";
    return;
  }

  // Calculate savings per transaction
  const savingPerTransaction = transactionPrice * discount;
  savingPerTransactionElement.textContent = `£${savingPerTransaction.toFixed(2)}`;

  // Calculate savings per week/month
  const savingPerPeriod = savingPerTransaction * number;
  savingPerPeriodElement.textContent = `£${savingPerPeriod.toFixed(2)}`;

  // Calculate savings per year
  const savingPerYear = period === 'week' ? savingPerPeriod * 52 : savingPerPeriod * 12;
  savingPerYearElement.textContent = `£${savingPerYear.toFixed(2)}`;

  // Calculate total annual gain/loss (savings - subscription cost)
  const annualGainLoss = savingPerYear - subscriptionPrice;

  // Calculate break-even transactions
  const breakEvenTransactions = Math.ceil(subscriptionPrice / savingPerTransaction);
  breakEvenTransactionsElement.textContent = `${breakEvenTransactions} transactions`;

  // Calculate break-even time in weeks/months
  const breakEvenTime = period === 'week' ? Math.ceil(breakEvenTransactions / number) : Math.ceil(breakEvenTransactions / number);
  breakEvenTimeElement.textContent = `${breakEvenTime} ${period}s`;

  // Calculate total savings after 1 and 2 years
  const totalSavingsYear = savingPerYear - subscriptionPrice;
  const totalSavingsTwoYears = savingPerYear * 2 - subscriptionPrice;
  const totalSavingsFiveYears = savingPerYear * 5 - subscriptionPrice;
  const totalSavingsTenYears = savingPerYear * 10 - subscriptionPrice;
  totalSavingsYearElement.textContent = `£${totalSavingsYear.toFixed(2)}`;
  totalSavingsTwoYearsElement.textContent = `£${totalSavingsTwoYears.toFixed(2)}`;
  totalSavingsFiveYearsElement.textContent = `£${totalSavingsFiveYears.toFixed(2)}`;
  totalSavingsTenYearsElement.textContent = `£${totalSavingsTenYears.toFixed(2)}`;
}

// Add event listeners to automatically calculate when inputs change
subscriptionPriceInput.addEventListener('input', calculateBreakEven);
discountInput.addEventListener('input', calculateBreakEven);
transactionPriceInput.addEventListener('input', calculateBreakEven);
transactionsFrequencyInput.addEventListener('input', calculateBreakEven);