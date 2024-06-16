import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockMarketComparisonChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockMarketComparison = async () => {
      try {
        const usResponse = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DJIA&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
        const mxResponse = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MXX&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
        const usData = usResponse.data['Time Series (Daily)'];
        const mxData = mxResponse.data['Time Series (Daily)'];

        if (usData && mxData) {
          const dates = Object.keys(usData);
          const usValues = dates.map(date => usData[date]['1. open']);
          const mxValues = dates.map(date => mxData[date]['1. open']);

          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'DJIA (EEUU)',
                data: usValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
              {
                label: 'BMV (MX)',
                data: mxValues,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          throw new Error('Datos de comparación del mercado de valores no disponibles');
        }
      } catch (error) {
        setError('Error al obtener los datos de comparación del mercado de valores: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockMarketComparison();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return <Line data={chartData} />;
};

export default StockMarketComparisonChart;

