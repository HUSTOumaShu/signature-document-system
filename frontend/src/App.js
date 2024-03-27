import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import ViewDocument from './components/ViewDocument';
import Signup from './components/Signup';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/view" element={<ViewDocument />} />
                    <Route path="/" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
