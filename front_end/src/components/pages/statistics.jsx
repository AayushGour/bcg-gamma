import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Area, Bar, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip, XAxis, YAxis } from "recharts";
import { getStatistics } from '../store/action';
import { toast } from '../toast/toast';
import "./styles/statistics.scss";

const Statistics = (props) => {
    const [monthlySales, setMonthlySales] = useState([]);
    const [genderSales, setGenderSales] = useState([]);
    const [regionSales, setRegionSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getStatistics().then(({ data }) => {
            console.log(data)
            setMonthlySales(data?.monthlySales);
            setGenderSales(data?.genderSales);
            setRegionSales(data?.regionSales);
        }).catch(error => {
            console.error(error);
            toast?.error("Something went wrong");
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    return (
        <div className="statistics-container px-3">
            <div className="projections text-center mt-3 w-100">
                <ComposedChart width={1650} height={400} data={monthlySales}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Bar dataKey="total" barSize={20} fill="#477cff" />
                    <Line type="monotone" strokeWidth={2} dataKey="CNG" stroke="#419952" />
                    <Line type="monotone" strokeWidth={2} dataKey="Petrol" stroke="#694242" />
                    <Line type="monotone" strokeWidth={2} dataKey="Diesel" stroke="#bd9b16" />
                </ComposedChart>
                <h5 className='mt-3'>Monthly Sales Projection</h5>
            </div>
            <div className="row mt-3">
                <div className="projections text-center mt-3 w-50">
                    <PieChart width={800} height={400}>
                        <Pie data={genderSales} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label >
                            <LabelList content={(props) => {
                                const { cx, cy, value, viewBox } = props;
                                let x = value === "Male" ? cx - viewBox?.outerRadius : cx + viewBox?.outerRadius
                                let y = value === "Male" ? cy - viewBox?.outerRadius : cy - viewBox?.outerRadius
                                return <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="middle" >
                                    {value}
                                </text>
                            }} dataKey="name" position="outside" fill="black" />
                            {
                                genderSales.map((entry, index) => {
                                    return <Cell key={index} fill={entry?.name?.toLowerCase() === "male" ? "#477cff" : "pink"} />
                                })
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h5 className='mt-3'>Gender Sales Projection</h5>
                </div>
                <div className="projections text-center mt-3 w-50">
                    <RadarChart outerRadius={150} width={800} height={400} data={regionSales}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={90} />
                        <Radar dataKey="count" stroke="#477cff" fill="#477cff" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                    <h5 className='mt-3'>Region Sales Projection</h5>
                </div>
            </div>
        </div >
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


export default connect(mapStateToProps, mapDispatchToProps)(Statistics);