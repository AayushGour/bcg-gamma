import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../loader/loader';
import { search } from '../store/action';
import TableComponent from '../table-component/table-component';
import { toast } from '../toast/toast';
import "./styles/search.scss";

const SearchPage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const location = useLocation();

    const searchAPI = () => {
        setIsLoading(true);
        setRows([]);
        search(location?.pathname?.split("/")[2]).then(({ data }) => {
            let columnData = data?.columns?.map((col => col?.name));
            setRows(data?.rows);
            setColumns(columnData);
        }).catch((error) => {
            console.error(error);
            toast.error("Something Went Wrong");
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        searchAPI();
    }, [location?.pathname])


    const nameRenderer = (key, value, index, row) => {
        switch (key) {
            case "sales_id":
                return <div key={key}><Link to={`/sales/${value}`}>{value}</Link></div>;
            case "date_of_purchase":
                return <div key={key}>{new Date(value).toDateString()}</div>;
            case "customer_marital_status":
                return <div key={key}>{value ? "Married" : "Single"}</div>;
            case "matte_finish":
            case "music_system":
            case "power_steering":
            case "sunroof":
            case "airbags":
                return <div key={key}>{value ? "Available" : "N/A"}</div>
            default:
                return <div key={key}>{value}</div>
        }
    }
    return (
        <div className="search-page-container px-3">
            {isLoading ? <Loader /> :
                <TableComponent className={"search-table mb-4 mt-2"} rows={rows} columns={columns} nameRenderer={nameRenderer} />
            }
        </div>
    )
}

export default SearchPage;