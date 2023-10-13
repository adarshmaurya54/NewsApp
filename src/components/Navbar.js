import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        const { fs } = this.props;
        return (
            <nav style={{fontSize: fs}} className="navbar navbar-expand-lg bg-white py-3 mb-3">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-center" id="navbarNav">
                        <ul className="navbar-nav mt-lg-0 mt-3">
                            <li className="nav-item">
                                <NavLink className="nav-link  ms-lg-3" aria-current="page" to="/NewsApp/business">business</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/entertainment">entertainment</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/general">general</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/health">health</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/science">science</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/sports">sports</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-lg-3" to="/NewsApp/technology">technology</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
