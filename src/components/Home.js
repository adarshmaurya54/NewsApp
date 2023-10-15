import React, { Component } from 'react'
import News from '../components/News';
import logo from "../logo.jpg"

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '', //initializing initial search term as blank
            searchFlag: false,
            category: ''
        }
    }
    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value });
        this.setState({ searchFlag: false });
    }
    handleSearch = () => {
        window.history.pushState("","",window.location.origin + "/NewsApp");
        if (this.state.searchTerm.trim() !== '')
            this.setState({ searchFlag: true });
    }
    render() {
        const {category, apiKey} = this.props;
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
                                <button disabled={this.state.searchTerm.trim() === '' ? true : false} className='searchbtn' onClick={this.handleSearch} style={this.state.searchTerm.trim() === '' ? { cursor: "not-allowed" } : { backgroundColor: "#687EFF" }}>Search <i className="bi bi-arrow-right-short"></i></button>
                            </div>
                        </div>
                        {/* Here the news */}
                        <div className="mt-5">
                            {category && this.state.searchTerm.trim() === ''?
                            <News apiKey={apiKey} setProgress={this.props.setProgress} category={category} searchTerm="" />
                            : 
                            this.state.searchFlag ? <News apiKey={apiKey} setProgress={this.props.setProgress} category={null} searchTerm={this.state.searchTerm} /> : <h2 className='initial-text text-center py-5 fs-1'>Search for news articles by entering a keyword</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
