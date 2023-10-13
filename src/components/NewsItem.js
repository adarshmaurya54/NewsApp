import React, { Component } from 'react'

export class NewsItem extends Component {
    formatPublishedAt = (publishedAt) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(publishedAt).toLocaleDateString('en-US', options);
        return date;
    }
    render() {
        const {title, description, imgurl, publishedAt, author,newsUrl,content} = this.props;
        const formatPublishedAt = this.formatPublishedAt(publishedAt);
        return (
            <div className="card border-0 shadow mb-3 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center p-2">
                        <img src={imgurl} className="img-fluid rounded" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">{content}</p>
                            <a className='btn btn-sm read' href={newsUrl}>Read more <i className="bi bi-arrow-right-short"></i></a>
                            <div className="card-text d-md-flex mt-2 justify-content-between">
                                <div><small className="text-body-secondary"><strong>{author}</strong></small></div>
                                <div><small className="text-body-secondary">Published at {formatPublishedAt}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
