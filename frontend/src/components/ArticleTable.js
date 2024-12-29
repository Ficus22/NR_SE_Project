import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ArticleTable = () => {
    const [articles, setArticles] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    // Configuration des colonnes
    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Category', field: 'category', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true }
    ];

    // Récupération des données depuis l'API
    useEffect(() => {
        fetch('http://localhost:3000/api/articles')
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={articles}
                columnDefs={columnDefs}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    flex: 1,
                }}
                onGridReady={onGridReady}
            />
        </div>
    );
};

export default ArticleTable;
