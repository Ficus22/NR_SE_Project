import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StockBarChart = () => {
    const [chartData, setChartData] = useState({ alertCount: 0, healthyCount: 0 });

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/articles'); // Remplacez par votre endpoint
                const data = await response.json();

                // Vérifiez et calculez les articles en alerte et en bon stock
                const alertCount = data.filter(article => article.quantity < article.stockThreshold).length;
                const healthyCount = data.filter(article => article.quantity >= article.stockThreshold).length;

                setChartData({ alertCount, healthyCount });
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchData();
    }, []);

    // Highcharts options for the bar chart
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stock Status Overview'
        },
        xAxis: {
            categories: ['Stock Status']
        },
        yAxis: {
            title: {
                text: 'Number of Articles'
            }
        },
        series: [
            {
                name: 'Low Stock (Alert)',
                data: [chartData.alertCount],
                color: '#ff4d4f' // Red for low stock
            },
            {
                name: 'Healthy Stock',
                data: [chartData.healthyCount],
                color: '#52c41a' // Green for healthy stock
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StockBarChart;
