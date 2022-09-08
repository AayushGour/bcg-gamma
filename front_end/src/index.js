import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"
import App from './App';
import "./index.scss";
import axios from "axios"

const BASE_URL = process.env.BASE_URL
axios.defaults.baseURL = BASE_URL;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />); 
