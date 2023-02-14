import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imgurl, newsUrl, author, time, source } = this.props;

        return (
            <div className="card my-2">
                <img src={imgurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{"zIndex":"1", "left":"85%"}}>
                        {source? source: "unknown"}
                    </span>
                    <h5 className="card-title">{title.length > 60 ? title.slice(0, 60) + "..." : title}</h5>
                    <p className="card-text">{description.length > 250 ? description.slice(0, 250) + "..." : description}</p>
                    <p className="card-text"><small className="text-muted">By {author} on {time}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Read More</a>
                </div>
            </div>)
    }
}
