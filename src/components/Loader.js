import React, { Component } from 'react'

export class loader extends Component {
    render() {
        const { isVisible } = this.props;
        return (
            <div className='mt-5 d-flex flex-column align-items-center justify-content-center'>
                <div className={`container1 ${isVisible ? "" : "d-none"}`}>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <h2 className='initial-text text-center py-5 fs-1'>Loading...</h2>
            </div>
        )
    }
}

export default loader
