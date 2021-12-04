import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Reservation from './pages/Reservation'
import Mypage from './pages/Mypage'
import View from './pages/View'

class App extends Component {
  render() {
    return (
          <Routes>
            <Route path="/" element={<Page1/>} />
            <Route path="/page2" element={<Page2/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Reservation" element={<Reservation/>} />
            <Route path="/Mypage" element={<Mypage/>} />
            <Route path="/View" element={<View/>} />
          </Routes>
    );
  }
}
export default App;
