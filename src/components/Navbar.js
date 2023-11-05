import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavCollapsed: true, // Initially, the navigation menu is collapsed
        };
    }
    handleNavCollapse = () => {
        this.setState({isNavCollapsed : !this.state.isNavCollapsed});
    } 
    render() {
        const { fs } = this.props;
        return (
            <nav style={{ fontSize: fs }} className="navbar navbar-expand-lg bg-white py-3 mb-3">
                <div className="container-fluid">
                    <button className="navbar-toggler shadow-none" type="button" onClick={this.handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${this.state.isNavCollapsed ? "collapse navbar-collapse d-lg-flex justify-content-center" : "collapse navbar-collapse d-lg-flex justify-content-center show"}`} id="navbarNav">
                        <ul className="navbar-nav mt-lg-0 mt-3">
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" aria-current="page" to="/business">business</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/entertainment">entertainment</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/general">general</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/health">health</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/science">science</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/sports">sports</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.handleNavCollapse} className="nav-link gb gb-bordered hover-slide ms-lg-3" to="/technology">technology</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
