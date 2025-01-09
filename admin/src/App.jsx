import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import {ToastContainer} from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

const NotFound = () => <h2>Page Not Found</h2>; // Simple Not Found Component

const App = () => {
  const url = 'http://localhost:4000';
  return (
    <div>
      <ToastContainer /> 
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content"> {/* Main content wrapper */}
          <Routes>
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url}/>} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
