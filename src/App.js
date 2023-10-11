
import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import logo from "./logo.jpg"

export default class App extends Component {
  
  render() {
    return (
      <div className='bg-dark text-white'>
        <div className="container">
          <div className="head-text">
            <h1>
              <span>News App</span>
              <img src={logo} alt="logo" className='logo' />
            </h1>
            <div className="container mt-5 d-flex align-items-center justify-content-center">
              <div className="input shadow">
                <input type="text" className=' px-3' placeholder='Enter keyword of news...' />
                <button className='searchbtn'>Search <i className="bi bi-arrow-right-short"></i></button>
              </div>
            </div>
            {/* Here the news */}
            <div className="mt-5">
              <News />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
