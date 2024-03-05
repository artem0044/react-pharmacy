import './App.css';
import Header from './components/Header/Header';
import Checkout from './components/Checkout/Checkout';
import MainPage from './components/mainPage/MainPage';
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [order, setOrder] = useState(null);

  return (
    <div className="App">
      <Header order={order} setOrder={setOrder} />
      <div className="main">
        <Routes>
          <Route path="/" element={<MainPage order={order} setOrder={setOrder} />} />
          <Route path="/shopping cart" element={<Checkout order={order} setOrder={setOrder} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
