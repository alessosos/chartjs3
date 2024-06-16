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

const ExchangeRateChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = response.data;
        if (data && data.rates && data.rates.MXN) {
          setChartData({
            labels: ['USD a MXN'],
            datasets: [
              {
                label: 'Tasa de Cambio USD a MXN',
                data: [data.rates.MXN],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          throw new Error('Datos de tasa de cambio no disponibles');
        }
      } catch (error) {
        setError('Error al obtener los datos de la tasa de cambio: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return <Line data={chartData} />;
};

export default ExchangeRateChart;

