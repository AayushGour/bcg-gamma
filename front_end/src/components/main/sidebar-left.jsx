import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { leftSidebarMenuItems } from '../../constants';
import "./styles/sidebar-left.scss";

const SidebarLeft = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState("");

    useEffect(() => {
        let id = leftSidebarMenuItems?.find(menuItem => menuItem?.route?.split("/")[1] === location.pathname?.split("/")[1])?.id;
        setSelected(id);
    }, [location?.pathname])


    return (
        <div className="left-sidebar">
            <h4 className='sidebar-title'>CAR SALES</h4>
            <ul className='sidebar-list'>
                {leftSidebarMenuItems?.map((menuItem, index) => {
                    if (menuItem?.hidden) {
                        return null;
                    }
                    return <li key={index} onClick={() => { setSelected(menuItem?.id); navigate(menuItem?.route) }} className={`sidebar-list-item ${menuItem?.id === selected ? "selected" : ""}`}>
                        {menuItem.icon}
                        <span>{menuItem.title}</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default SidebarLeft;