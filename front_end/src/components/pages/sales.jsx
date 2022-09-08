import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saleFormFields } from '../../constants';
import { addNewSale, capitalize, getSaleData, updateSale } from '../store/action';
import Form from "react-bootstrap/Form"
import "./styles/sales.scss";
import Loader from '../loader/loader';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { toast } from '../toast/toast';
import { booleanTypeArray } from '../../../../back_end/constants';

const Sales = (props) => {
    const initialData = {
        customer_gender: "Male",
        customer_marital_status: false,
        power_steering: false,
        airbags: false,
        sunroof: false,
        matte_finish: false,
        music_system: false,
    }

    const [isLoading, setIsLoading] = useState(true);
    const [saleData, setSaleData] = useState(initialData);
    const [formKey, setFormKey] = useState(new Date().toISOString());
    const [disabled, setDisabled] = useState(true);
    const [statData, setStatData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSaleData();
    }, [location.pathname])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let saleId = location?.pathname?.split("/")[2];
        if (!!saleId) {
            //edit
            updateSale(saleData).then(({ data }) => {
                toast.success("Entry Updated");
                fetchSaleData();
            }).catch((error) => {
                console.error(error);
                toast.error("Something went wrong");
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            // new
            addNewSale(saleData).then(({ data }) => {
                toast.success("New Entry Added");
                fetchSaleData();
            }).catch(error => { console.error(error); toast.error(error?.response?.data?.detail) }).finally(() => {
                setIsLoading(false);
            })
        }
    }

    const fetchSaleData = () => {
        let saleId = location?.pathname?.split("/")[2];
        setIsLoading(true);
        if (!!saleId) {
            getSaleData(saleId).then(({ data }) => {
                setIsLoading(false);
                setSaleData(data?.saleData);
                setStatData(data?.featureData);
                setFormKey(new Date().toISOString())
                setDisabled(false);
            }).catch((error) => {
                console.error(error);
                setSaleData(initialData);
                setStatData(null);
                setFormKey(new Date().toISOString())
                setDisabled(true);
                toast.error("Something Went Wrong")
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            setSaleData(initialData);
            setStatData(null);
            setIsLoading(false);
            setFormKey(new Date().toISOString())
            setDisabled(true);
        }
    }

    const formBuilder = () => {
        return <form className='sale-form' key={formKey} onSubmit={handleFormSubmit}>
            {saleFormFields?.map((saleElement, index) => {
                if (!!saleData) {
                    saleElement.value = saleData[saleElement?.name];
                } else {
                    saleElement.value = "";
                }
                return renderElementByType(saleElement, index)
            })}
            <button disabled={disabled} className="primary-btn" type="submit">Submit</button>
            <button className="secondary-btn" type="reset" onClick={resetForm}>Cancel</button>
        </form>
    }

    const setElemState = (name, value) => {
        let sales = { ...saleData, [name]: value };

        // excluding checkboxes because they are optional
        if (Object.entries(sales)?.filter(([key, value]) => value !== "" && !booleanTypeArray?.includes(key))?.length >= (saleFormFields.length - booleanTypeArray?.length)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        setSaleData(sales);
    }

    const resetForm = () => {
        fetchSaleData();
    }

    const renderElementByType = (elemData, elemIndex) => {
        const { name, value, format, values } = elemData;
        let id = `form-input-${name}`;
        let saleId = location?.pathname?.split("/")[2];
        switch (format) {
            case "text":
                return <div key={elemIndex} className='text-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)} *`}</label>
                    <input placeholder={`Enter ${capitalize(name)}`} id={id} value={value} onChange={(e) => setElemState(elemData?.name, e.target?.value)} type={"text"} className='form-input-field' />
                </div>
            case "number":
                return <div key={elemIndex} className='text-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)} *`}</label>
                    <input placeholder={`Enter ${capitalize(name)}`} id={id} value={value} onChange={(e) => setElemState(elemData?.name, e.target?.value)} type={"number"} max={elemData?.maxValue} className='form-input-field' />
                </div>
            case "date":
                return <div key={elemIndex} className='date-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)} *`}</label>
                    <input id={id} disabled={!!value && !!saleId} value={!!value ? new Date(value).toISOString().split("T")[0] : ""} onChange={(e) => setElemState(elemData?.name, e.target?.value)} type={"date"} className='form-input-field' />
                </div>
            case "boolean":
                return <div key={elemIndex} className='checkbox-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)}`}</label>
                    <input id={id} checked={(value)} onChange={(e) => setElemState(elemData?.name, Boolean(e.target?.checked))} type={"checkbox"} className='form-input-field' />
                </div>
            case "dropdown":
                return <div key={elemIndex} className='checkbox-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)} *`}</label>
                    <Form.Select id={id} value={value} onChange={(e) => setElemState(elemData?.name, e.target?.value)}>
                        {values?.map((opt, index) => {
                            return <option key={index} value={opt?.value}>{capitalize(opt?.title)}</option>
                        })}
                    </Form.Select>
                </div>
            default:
                return <div key={elemIndex} className='text-input-container form-field-container'>
                    <label htmlFor={id}>{`${capitalize(name)} *`}</label>
                    <input id={id} value={value} onChange={(e) => setElemState(elemData?.name, e.target?.value)} type={"text"} className='form-input-field' />
                </div>
        }
    }

    return (
        <div className="sales-container px-3">
            {
                isLoading ? <Loader /> :
                    <>
                        {formBuilder()}
                        <div className={`chart-container ${location?.pathname?.split("/")[2] ? "" : "hidden"}`}>
                            <button className='primary-btn' onClick={() => { navigate("/sales") }}>Add New Sale</button>
                            <RadarChart outerRadius={150} width={800} height={400} data={statData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={90} domain={[0, 1]} tickCount={2} />
                                <Radar dataKey="value" stroke="#477cff" fill="#477cff" fillOpacity={0.6} />
                            </RadarChart>
                            <h4>Car Features</h4>
                        </div>
                    </>
            }
        </div >
    )
}
export default Sales;