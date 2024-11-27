let balance = 1000;
let portfolio = {
  weazel: 0,
};

let stockPrices = {
  weazel: 100,
};

const priceChange = {
  weazel: 0,
};

// Show selected tab
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
}

// Update balance display
function updateBalance() {
  document.getElementById('balance').innerText = balance.toFixed(2);
}

// Update stock price display
function updateStockPriceDisplay() {
  for (const stock in stockPrices) {
    const priceElement = document.getElementById(`price-${stock}`);
    priceElement.innerText = stockPrices[stock].toFixed(2);

    const priceChangeElement = document.getElementById(`price-change-${stock}`);
    if (priceChange[stock] > 0) {
      priceChangeElement.className = 'price-change green-arrow';
      priceChangeElement.innerText = `+${priceChange[stock].toFixed(2)} ↑`;
    } else if (priceChange[stock] < 0) {
      priceChangeElement.className = 'price-change red-arrow';
      priceChangeElement.innerText = `${priceChange[stock].toFixed(2)} ↓`;
    } else {
      priceChangeElement.className = 'price-change';
      priceChangeElement.innerText = '';
    }
  }
}

// Buy stock logic
function buyStock(stock) {
  const stockPrice = stockPrices[stock];
  if (balance >= stockPrice) {
    balance -= stockPrice;
    portfolio[stock]++;
    stockPrices[stock] *= 1.1;
    priceChange[stock] = stockPrices[stock] * 0.1;
    updateBalance();
    updateStockPriceDisplay();
    updatePortfolio();
  } else {
    alert('Not enough funds!');
  }
}

// Sell stock logic
function sellStock(stock) {
  if (portfolio[stock] > 0) {
    const stockPrice = stockPrices[stock];
    balance += stockPrice * 0.8;
    portfolio[stock]--;
    stockPrices[stock] *= 0.8;
    priceChange[stock] = stockPrices[stock] * -0.2;
    updateBalance();
    updateStockPriceDisplay();
    updatePortfolio();
  } else {
    alert('You don\'t own any of this stock!');
  }
}

// Update portfolio display
function updatePortfolio() {
  const portfolioList = document.getElementById('portfolio-list');
  portfolioList.innerHTML = '';
  
  for (let stock in portfolio) {
    if (portfolio[stock] > 0) {
      const portfolioItem = document.createElement('div');
      portfolioItem.classList.add('portfolio-item');
      portfolioItem.innerHTML = `${stock}: ${portfolio[stock]} shares`;
      portfolioList.appendChild(portfolioItem);
    }
  }

  if (Object.values(portfolio).every(amount => amount === 0)) {
    portfolioList.innerHTML = '<p>No stocks bought yet.</p>';
  }
}

// Initialize page
showTab('marketplace');
updateBalance();
updateStockPriceDisplay();
