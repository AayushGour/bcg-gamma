import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.scss";
import Header from './components/main/header';
import Router from './components/main/router';
import SidebarLeft from './components/main/sidebar-left';
import store from './components/store/store';
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='application-content d-flex flex-row'>
                    <SidebarLeft />
                    <div className='main-content'>
                        <Header />
                        <Router />
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    )
}
export default App; 
