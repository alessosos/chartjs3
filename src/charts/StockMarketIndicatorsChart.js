import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockMarketIndicatorsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockMarketIndicators = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DJIA&apikey=${process.env. WRJFM1NT9P300I3T}`);
        const data = response.data['Time Series (Daily)'];
        if (data) {
          const dates = Object.keys(data);
          const values = dates.map(date => data[date]['1. open']);

          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'Precio de Apertura Diario del DJIA',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          throw new Error('Datos del mercado de valores no disponibles');
        }
      } catch (error) {
        setError('Error al obtener los datos de los indicadores del mercado de valores: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockMarketIndicators();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return <Bar data={chartData} />;
};

export default StockMarketIndicatorsChart;


