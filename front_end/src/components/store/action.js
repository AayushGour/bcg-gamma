// Application Level Redux actions 
import axios from "axios";
import { GET_TABLE_DATA } from "./action-types";

export const getAllTableDataSuccess = (data) => {
    return { type: GET_TABLE_DATA, payload: data }
}

export const getAllTableData = () => {
    return (dispatch) => {
        return axios.get(process.env.GET_TABLE_DATA_API).then(({ data }) => {
            let columns = data?.columns?.map((elem) => {
                return elem?.name
            })
            dispatch(getAllTableDataSuccess({ rows: data.rows, columns: columns }));
        });
    }
}

export const capitalize = (value) => {
    let string = value?.replaceAll("_", " ");
    return (string?.toString()?.charAt(0)?.toUpperCase() + string?.toString()?.slice(1)).toString();
}

export const getSaleData = (salesId) => {
    let params = { salesId };
    return axios.get(process.env.GET_SALE_DATA_API, {
        params: params
    });
}

export const search = (searchText) => {
    const params = {
        search: searchText
    }
    return axios.get(process.env.SEARCH_API, {
        params: params
    })
}
export const addNewSale = (params) => {
    return axios.post(process.env.NEW_SALE_API, params)
}

export const getStatistics = () => {
    return axios.get(process.env.STATISTICS_API)
}
