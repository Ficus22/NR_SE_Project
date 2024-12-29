import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StockBarChart = () => {
    const [chartData, setChartData] = useState({ alertCount: 0, healthyCount: 0 });

    // Fetch stock data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/articles'); // Replace with your API endpoint
                const data = await response.json();

                // Calculate the number of articles in alert and healthy stock categories
                const alertCount = data.filter(article => article.quantity < article.stockThreshold).length;
                const healthyCount = data.filter(article => article.quantity >= article.stockThreshold).length;

                // Update the chart data state
                setChartData({ alertCount, healthyCount });
            } catch (error) {
                // Log any errors that occur during data fetching
                console.error('Error fetching articles:', error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

    // Highcharts configuration options for the bar chart
    const options = {
        chart: {
            type: 'column' // Use column chart type
        },
        title: {
            text: 'Stock Status Overview' // Title of the chart
        },
        xAxis: {
            categories: ['Stock Status'] // Category for the x-axis
        },
        yAxis: {
            title: {
                text: 'Number of Articles' // Label for the y-axis
            }
        },
        series: [
            {
                name: 'Low Stock (Alert)', // Label for the alert category
                data: [chartData.alertCount], // Data for articles in alert
                color: '#ff4d4f' // Red color for low stock
            },
            {
                name: 'Healthy Stock', // Label for the healthy category
                data: [chartData.healthyCount], // Data for articles in healthy stock
                color: '#52c41a' // Green color for healthy stock
            }
        ]
    };

    return (
        <div>
            {/* Render the Highcharts bar chart */}
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StockBarChart;
