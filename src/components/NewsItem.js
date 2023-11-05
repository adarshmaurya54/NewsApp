import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        const {title, description, imgurl, publishedAt, author,newsUrl,content} = this.props;
        return (
            <div className="card border-0 shadow-lg mb-3 overflow-hidden" style={{borderRadius: "20px"}}>
                <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center p-2 ">
                        <img src={imgurl} className="img-fluid shadow" style={{borderRadius: "20px"}} alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">{content}</p>
                            <a className='btn btn-sm read' target='_blank' rel="noreferrer" href={newsUrl}>Read more <i className="bi bi-arrow-right-short"></i></a>
                            <div className="card-text d-md-flex mt-2 justify-content-between">
                                <div><small className="text-body-secondary">Source <strong>{author}</strong></small></div>
                                <div><small className="text-body-secondary">{publishedAt}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
