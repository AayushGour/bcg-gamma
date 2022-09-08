import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../loader/loader';
import { capitalize, getAllTableData } from '../store/action';
import TableComponent from '../table-component/table-component';
import "./styles/main.scss";

const Main = (props) => {
    let { columns, rows } = props.tableData;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if ((Array.isArray(props?.tableData) && props?.tableData?.length === 0) || !props?.tableData?.rows) {
            props.getAllTableData().then((resp) => {
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
        }
    }, [])

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
        <div className="w-100 h-100 overview-container px-3">
            {isLoading ? <Loader /> :
                <TableComponent className={"overview-table mb-4 mt-2"} rows={rows} columns={columns} nameRenderer={nameRenderer} />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tableData: state.app.tableData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTableData: () => dispatch(getAllTableData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main); 
