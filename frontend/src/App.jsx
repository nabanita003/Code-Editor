import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editor from './pages/Editor';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor/:id' element={<Editor />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;