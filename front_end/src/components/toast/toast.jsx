import React from 'react';
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { AiFillCloseCircle, AiFillWarning } from "react-icons/ai";
import { MdCheckCircle, MdInfo } from "react-icons/md";
import "./toast.scss";

const ToastComponent = (props) => {
    return (
        <div className={`custom-toast-container ${props?.type}`}>
            {
                props?.type === "error" ?
                    <AiFillCloseCircle /> :
                    props?.type === "success" ?
                        <MdCheckCircle />
                        : props?.type === "warning" ? <AiFillWarning /> : <MdInfo />
            }
            <span>{props?.content}</span>
        </div>
    )
}

export const toast = {
    info: (content, duration = 5000) => {
        let parentElement = document.getElementById("toast-container");
        let container = document.createElement("div");
        container.id = `toast-sub-container-${parentElement?.childElementCount + 1}`;
        parentElement.appendChild(container);
        let infoRoot = createRoot(container);
        infoRoot.render(<ToastComponent content={content} type="info" />);
        setTimeout(() => {
            container.style.animationName = "fade-out";
            container.style.animationDuration = "0.5s";
            container.style.animationDirection = "forwards";
            setTimeout(() => {
                parentElement.removeChild(container);
                infoRoot.unmount();
            }, 500)
        }, duration);
    },
    error: (content, duration = 5000) => {
        let parentElement = document.getElementById("toast-container");
        let container = document.createElement("div");
        container.id = `toast-sub-container-${parentElement?.childElementCount + 1}`;
        parentElement.appendChild(container);
        let errorRoot = createRoot(container);
        errorRoot.render(<ToastComponent content={content} type="error" />);
        setTimeout(() => {
            container.style.animationName = "fade-out";
            container.style.animationDuration = "0.5s";
            container.style.animationDirection = "forwards";
            setTimeout(() => {
                parentElement.removeChild(container);
                errorRoot.unmount();
            }, 500)
        }, duration);
    },
    success: (content, duration = 5000) => {
        let parentElement = document.getElementById("toast-container");
        let container = document.createElement("div");
        container.id = `toast-sub-container-${parentElement?.childElementCount + 1}`;
        parentElement.appendChild(container);
        let successRoot = createRoot(container);
        successRoot.render(<ToastComponent content={content} type="success" />);
        setTimeout(() => {
            container.style.animationName = "fade-out";
            container.style.animationDuration = "0.5s";
            container.style.animationDirection = "forwards";
            setTimeout(() => {
                parentElement.removeChild(container);
                successRoot.unmount();
            }, 500)
        }, duration);
    },
    warning: (content, duration = 5000) => {
        let parentElement = document.getElementById("toast-container");
        let container = document.createElement("div");
        container.id = `toast-sub-container-${parentElement?.childElementCount + 1}`;
        parentElement.appendChild(container);
        let warningRoot = createRoot(container);
        warningRoot.render(<ToastComponent content={content} type="warning" />);
        setTimeout(() => {
            container.style.animationName = "fade-out";
            container.style.animationDuration = "0.5s";
            container.style.animationDirection = "forwards";
            setTimeout(() => {
                parentElement.removeChild(container);
                warningRoot.unmount();
            }, 500)
        }, duration);
    },
}