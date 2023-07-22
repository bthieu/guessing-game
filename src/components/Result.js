import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const { state } = useLocation();
    const { score } = state || {};
    return (<div>abc {score}</div>);
};

export default Result;