
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <BrowserRouter>
        <Navbar fs="1.5em" />  
        <Routes>
          <Route path='/NewsApp/' element={<Home apiKey={this.apiKey} category={null} />}/>
          <Route path='/NewsApp/business' element={<Home apiKey={this.apiKey} category="business"/>}/>
          <Route path='/NewsApp/entertainment' element={<Home apiKey={this.apiKey} category="entertainment"/>}/>
          <Route path='/NewsApp/general' element={<Home apiKey={this.apiKey} category="general"/>}/>
          <Route path='/NewsApp/health' element={<Home apiKey={this.apiKey} category="health"/>}/>
          <Route path='/NewsApp/science' element={<Home apiKey={this.apiKey} category="science"/>}/>
          <Route path='/NewsApp/sports' element={<Home apiKey={this.apiKey} category="sports"/>}/>
          <Route path='/NewsApp/technology' element={<Home apiKey={this.apiKey} category="technology"/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
