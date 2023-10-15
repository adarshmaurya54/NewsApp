import React, { Component } from 'react'
import NewsItem from './NewsItem'
import thumbnail from '../newspaper-cover-page.jpg'
import Loader from "./Loader";


export class News extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            article: [],
            page: 1
        }
    }
    async componentDidMount() {
        const { searchTerm, category } = this.props;

        if (category) {
            try {
                this.props.setProgress(10)
                // let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${this.props.apiKey}`);
                let response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&country=in&max=100&apikey=${this.props.apiKey}`);
                this.props.setProgress(30)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                this.props.setProgress(77)
                this.setState({ article: data.articles })
                this.setState({ loading: false })
                this.props.setProgress(100)
            } catch (error) {
                alert('Error:' + error);
            }
        } else if (searchTerm.trim() !== '') {
            try {
                this.props.setProgress(10)
                // let response = await fetch(`https://newsapi.org/v2/everything?q=&apiKey=${this.props.apiKey}`);
                let response = await fetch(`https://gnews.io/api/v4/search?q=${searchTerm.trim()}&country=in&max=100&min=100&apikey=${this.props.apiKey}`);
                this.props.setProgress(30)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                this.props.setProgress(66)
                this.setState({ article: data.articles })
                this.setState({ loading: false })
                this.props.setProgress(100)
            } catch (error) {
                alert('Error:' + error);
            }
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            try {
                this.props.setProgress(10)
                this.setState({ loading: true })
                let response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${this.props.category}&country=in&max=100&apikey=${this.props.apiKey}`);
                this.props.setProgress(30)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                this.props.setProgress(50)
                this.setState({ article: data.articles })
                this.setState({ loading: false })
                this.props.setProgress(100)
            } catch (error) {
                alert('Error:' + error);
            }
        }
    }
    timeSince = (timestamp) => {
        const now = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = now - timestamp;

        // Calculate time difference in various units
        const secondsAgo = Math.floor(timeDifference / 1000);
        const minutesAgo = Math.floor(secondsAgo / 60);
        const hoursAgo = Math.floor(minutesAgo / 60);
        const daysAgo = Math.floor(hoursAgo / 24);
        const monthsAgo = Math.floor(daysAgo / 30.44); // Approximation for an average month
        const yearsAgo = Math.floor(daysAgo / 365.25); // Approximation for a year including leap years

        if (yearsAgo > 0) {
            return `${yearsAgo} years ago`;
        }
        else if (monthsAgo > 0) {
            return `${monthsAgo} months ago`;
        }
        else if (daysAgo > 0) {
            return `${daysAgo} days ago`;
        }
        else if (hoursAgo > 0) {
            return `${hoursAgo} hours, ${minutesAgo % 60} minutes ago`;
        }
        else if (minutesAgo % 60 < 60) {
            return `${minutesAgo % 60} minutes ago`;
        }
    }
    render() {
        const { searchTerm, category } = this.props;
        return (
            <>
                {this.state.loading ? <Loader isVisible={true} /> :
                    <div className='mb-2'>
                        <h2 className='mb-3 result'>Results of <strong>{category ? category : searchTerm}</strong></h2>
                        {this.state.article.map((e) => {
                            console.log(e.publishedAt);
                            return <NewsItem key={e.url}
                                title={e.title}
                                description={e.description}
                                imgurl={(e.image) ? e.image : thumbnail}
                                publishedAt={this.timeSince(new Date(e.publishedAt))}
                                author={e.source.name ? e.source.name : "Unknow"}
                                content={e.content}
                                newsUrl={e.url}
                            />
                        })}
                    </div>
                }
            </>
        )
    }
}

export default News
