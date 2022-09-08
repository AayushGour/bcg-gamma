import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { leftSidebarMenuItems } from '../../constants';
import { AiOutlineSearch } from "react-icons/ai";
import "./styles/header.scss";

const Header = (props) => {
    const [searchText, setSearchText] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        resetSearchText();
        navigate(`/search/${searchText}`);
    }

    useEffect(() => {
        setSearchText("")
    }, [location?.pathname])


    const resetSearchText = () => {
        setSearchText("");
    }

    let headerTitle = leftSidebarMenuItems?.find(elem => elem?.route?.split("/")[1] === location?.pathname?.split("/")[1]).title
    let searchTitle = headerTitle === "Search" ? location?.pathname?.split("/")[2] : "";
    return (
        <div className="application-header">
            <h3 className='header-title'>{`${headerTitle} ${searchTitle}`}</h3>
            <form className='search-container' onSubmit={handleSearch}>
                <input value={searchText} className='search-input' placeholder='Search...' onChange={(e) => setSearchText(e.target.value)} />
                <button className='search-btn'><AiOutlineSearch /></button>
            </form>
        </div >
    )
}

export default Header;