
import './App.css';
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Navbar fs="1.5em" />
        <Routes>
          <Route path='/' element={<Home apiKey={this.apiKey} category={null} />} />
          <Route path='/business' element={<Home apiKey={this.apiKey} category="business" />} />
          <Route path='/entertainment' element={<Home apiKey={this.apiKey} category="entertainment" />} />
          <Route path='/general' element={<Home apiKey={this.apiKey} category="general" />} />
          <Route path='/health' element={<Home apiKey={this.apiKey} category="health" />} />
          <Route path='/science' element={<Home apiKey={this.apiKey} category="science" />} />
          <Route path='/sports' element={<Home apiKey={this.apiKey} category="sports" />} />
          <Route path='/technology' element={<Home apiKey={this.apiKey} category="technology" />} />
        </Routes>
      </>
    )
  }
}
