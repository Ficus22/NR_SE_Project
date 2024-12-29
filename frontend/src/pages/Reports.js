import React from 'react';
import api from '../services/api';

const Reports = () => {
    // Function to handle downloading a CSV report
    const downloadCSV = async () => {
        try {
            // Fetch the CSV file from the server as a blob
            const response = await api.get('/reports/csv', { responseType: 'blob' });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'articles.csv'); // Set the file name
            document.body.appendChild(link); // Append the link to the DOM
            link.click(); // Programmatically click the link to download the file
        } catch (err) {
            // Log any error that occurs during the download process
            console.error('Error while downloading the CSV report:', err);
        }
    };

    // Function to handle downloading a PDF report
    const downloadPDF = async () => {
        try {
            // Fetch the PDF file from the server as a blob
            const response = await api.get('/reports/pdf', { responseType: 'blob' });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'articles.pdf'); // Set the file name
            document.body.appendChild(link); // Append the link to the DOM
            link.click(); // Programmatically click the link to download the file
        } catch (err) {
            // Log any error that occurs during the download process
            console.error('Error while downloading the PDF report:', err);
        }
    };

    return (
        <div className="p-8">
            {/* Page title */}
            <h1 className="text-3xl font-bold mb-6">Report Generation</h1>

            {/* Buttons to download CSV and PDF reports */}
            <div className="flex flex-col gap-6">
                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-xl mb-4">Download CSV Report</h2>
                    <button
                        onClick={downloadCSV}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Download CSV
                    </button>
                </div>

                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-xl mb-4">Download PDF Report</h2>
                    <button
                        onClick={downloadPDF}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
