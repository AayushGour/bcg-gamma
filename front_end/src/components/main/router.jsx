import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main';
import Sales from '../pages/sales';
import SearchPage from '../pages/search';
import Statistics from '../pages/statistics';

const Router = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sales/:id" element={<Sales />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/search/:id" element={<SearchPage />} />
        </Routes>
    )
}

export default Router;