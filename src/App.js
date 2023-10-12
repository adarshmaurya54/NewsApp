
import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import logo from "./logo.jpg"


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', //initializing initial search term as blank
      searchFlag: false
    }
  }
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.setState({ searchFlag: false });
  }
  handleSearch = () => {
    if (this.state.searchTerm.trim() !== '')
      this.setState({ searchFlag: true });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="head-text">
            <h1>
              <span>News App</span>
              <img src={logo} alt="logo" className='logo' />
            </h1>
            <div className="container mt-5 d-flex align-items-center justify-content-center">
              <div className="input shadow">
                <input type="text" onChange={this.handleChange} className=' px-3' placeholder='Enter keyword of news...' />
                <button className='searchbtn' onClick={this.handleSearch}>Search <i className="bi bi-arrow-right-short"></i></button>
              </div>
            </div>
            {/* Here the news */}
            <div className="mt-5">
              {this.state.searchFlag ? <News searchTerm={this.state.searchTerm} /> : <h2 className='initial-text text-center py-5 fs-1'>Search for news articles by entering a keyword</h2>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
