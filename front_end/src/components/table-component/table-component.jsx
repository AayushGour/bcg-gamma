import React, { useEffect, useState } from 'react';
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { capitalize } from '../store/action';
import "./styles/table-component.scss";


const TableComponent = (props) => {
    const { rows, columns, nameRenderer } = props;
    const [isAscSort, setIsAscSort] = useState(true);
    const [tableRows, setTableRows] = useState(rows || []);
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        let sortKey = columns[0];
        toggleSort(sortKey);
    }, [])


    const toggleSort = (key) => {
        if (!!rows && Array.isArray(rows) && rows?.length > 0) {
            let tRows = rows?.sort((a, b) => {
                if (isAscSort) {
                    return String(a[key]) - String(b[key])
                } else {
                    return String(b[key]) - String(a[key])
                }
            })
            setSortKey(key);
            setIsAscSort(!isAscSort);
            setTableRows(tRows);
        }
    }

    if (tableRows?.length === 0) {
        return <div className='text-center m-5 no-data'>No Data Available</div>
    }

    return (
        <table className={`table-component ${props?.className}`}>
            <thead>
                <tr>
                    {columns?.map((col, index) => {
                        return <th key={index}>
                            {capitalize(col)}
                            <button className={`sort-btn ${sortKey === col ? "" : "hidden"}`} onClick={() => toggleSort(col)}>
                                {isAscSort ?
                                    <BsSortAlphaDownAlt />
                                    :
                                    <BsSortAlphaDown />
                                }
                            </button>
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {tableRows?.map((row, ind) => {
                    return <tr key={ind}>
                        {Object.entries(row).map(([key, value]) => {
                            return <td key={key}>
                                {!!nameRenderer ? nameRenderer(key, value, ind, row) : value}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table >
    )
}

export default TableComponent;