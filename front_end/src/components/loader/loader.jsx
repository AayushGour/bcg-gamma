import React from 'react';
import "./styles/loader.scss";

const Loader = (props) => {
    return (
        <div className={`loader-container ${!!props.className && props.className}`} style={props?.style}>
            <div className="loader" style={props.loaderStyle}>
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>
    )
}

export default Loader;