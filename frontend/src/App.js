import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Signup from './pages/Signup'

class App extends Component {
  render() {
    return (
          <Routes>
            <Route path="/" element={<Page1/>} />
            <Route path="/page2" element={<Page2/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
    );
  }
}
export default App;
