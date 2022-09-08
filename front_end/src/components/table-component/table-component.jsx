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
                    return a[key] - b[key]
                } else {
                    return b[key] - a[key]
                }
            })
            setSortKey(key);
            setIsAscSort(!isAscSort);
            setTableRows(tRows);
        }
    }

    if (tableRows?.length === 0) {
        return <div>No Data Component</div>
    }

    return (
        <table className={`table-component ${props?.className}`}>
            <thead>
                <tr>
                    {columns?.map((elem, index) => {
                        return <th key={index}>
                            {capitalize(elem)}
                            <button className={`sort-btn ${sortKey === elem ? "" : "hidden"}`} onClick={() => toggleSort(elem)}>
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
                {tableRows?.map((elem, ind) => {
                    return <tr key={ind}>
                        {Object.entries(elem).map(([key, value]) => {
                            return <td key={key}>
                                {!!nameRenderer ? nameRenderer(key, value, ind, elem) : value}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table >
    )
}

export default TableComponent;