
import './App.css';
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress});
  }
  render() {
    return (
      <>
        <LoadingBar
          color='#2381c7'
          progress={this.state.progress}
        />
        <Navbar fs="1.5em" />
        <Routes>
          <Route path='/' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category={null} />} />
          <Route path='/business' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="business" />} />
          <Route path='/entertainment' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="entertainment" />} />
          <Route path='/general' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="general" />} />
          <Route path='/health' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="health" />} />
          <Route path='/science' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="science" />} />
          <Route path='/sports' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="sports" />} />
          <Route path='/technology' element={<Home setProgress={this.setProgress} apiKey={this.apiKey} category="technology" />} />
        </Routes>
      </>
    )
  }
}
