import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            article: [],
            newsPerPage: null
        }
    }

    async componentDidMount() {
        try {
            let response = await fetch('./sampleData.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            this.setState({ article: data.articles})
            let newsperpage = parseInt(data.totalResults)/20;
            this.setState({newsPerPage: newsperpage})
        } catch (error) {
            alert('Error:', error);
        } 
    }
    render() {
        console.log(this.state.newsPerPage);
        return (
            <>
                <div className='mb-2'>
                    <h2 className='mb-3 result'>Results of <strong>Microsoft</strong></h2>
                    {this.state.article.map((e) => {
                        return <NewsItem key={e.url}
                            title={e.title}
                            description={e.description}
                            imgurl={e.urlToImage}
                            publishedAt={e.publishedAt}
                            author={e.author}
                            content={e.content}
                            newsUrl={e.url}
                        />
                    })}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link shadow-none">Previous</a>
                        </li>
                        <li className="page-item "><a className="page-link shadow-none" href="/">1</a></li>
                        <li className="page-item "><a className="page-link shadow-none" href="/">2</a></li>
                        <li className="page-item "><a className="page-link shadow-none" href="/">3</a></li>
                        <li className="page-item ">
                             <a className="page-link shadow-none" href="/">Next</a>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default News
