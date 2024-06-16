import React from 'react';
import './App.css';
import ExchangeRateChart from './charts/ExchangeRateChart';
import StockMarketIndicatorsChart from './charts/StockMarketIndicatorsChart';
import StockMarketComparisonChart from './charts/StockMarketComparisonChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Financial Charts</h1>
      </header>
      <div>
        <ExchangeRateChart />
        <StockMarketIndicatorsChart />
        <StockMarketComparisonChart />
      </div>
    </div>
  );
}

export default App;
