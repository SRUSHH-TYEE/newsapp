import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      // loading: false,
      page: 1,
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Pressly`;

  }

  async update(props) {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({
    //    loading: true
    // })
    let data = await fetch(url)
    this.props.setProgress(50)
    let parsedData = await data.json()
    this.props.setProgress(80)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      // loading: false
    })
    
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Pressly`;
    this.props.setProgress(100)

  }
  async componentDidMount() {
    await this.update()
  }

  fetchMoreData = async () => {
    await this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({
    //   loading: true
    // })
    let data = await fetch(url)
    let parsedData = await data.json()
    await this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  

  }
  // handlePrevClick = async () => {
  //   await this.setState({
  //     page: this.state.page - 1
  //   })
  //   await this.update()
  // }
  // handleNextClick = async () => {
  //   await this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.update()
  // }


  //   async componentDidMount() {
  //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=93608d6831404550b9c5d955407ad796&page=1&pageSize=${this.props.pageSize}`
  //     this.setState({
  //       loading:true
  //     })
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     this.setState({
  //       articles: parsedData.articles,
  //       totalResults:parsedData.totalResults,
  //       loading: false
  //     })  
  //   }
  //    handlePrevClick =async()=>{
  //         let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=93608d6831404550b9c5d955407ad796&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //         this.setState({
  //           loading:true
  //         })
  //         let data = await fetch(url)
  //         let parseData = await data.json()
  //         this.setState({
  //           articles:parseData.articles,
  //           page:this.state.page-1,
  //           loading:false
  //         })
  //   }
  //  handleNextClick=async()=>{
  //         if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //         let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=93608d6831404550b9c5d955407ad796&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //         this.setState({
  //           loading:true
  //         })
  //         let data = await fetch(url)
  //         let parseData = await data.json()
  //         this.setState({
  //           articles:parseData.articles,
  //           page:this.state.page+1,
  //           loading:false
  //         })
  //       }
  //   }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center my-4' style={{margin: "90px "}}>Pressly - {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length-this.props.pageSize) !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">

            <div className="row" >
              {/* {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem source={element.source.name} time={new Date(element.publishedAt).toGMTString()} author={element.author} title={element.title ? element.title : ""} description={element.description ? element.description : " "} newsUrl={element.url} imgurl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/02/10/1600x900/kiara_advani_sidharth_malhotra_1676013809105_1676013809275_1676013809275.jpg"} />
              </div>
            })} */}
              {this.state.articles.map((element,index) => {
                return <div className="col-md-4" key={index}>
                  <NewsItem source={element.source.name} time={new Date(element.publishedAt).toGMTString()} author={element.author} title={element.title ? element.title : ""} description={element.description ? element.description : " "} newsUrl={element.url} imgurl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/02/10/1600x900/kiara_advani_sidharth_malhotra_1676013809105_1676013809275_1676013809275.jpg"} />
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between my-2">

            <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>Previous</button>
            <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next</button>
          </div> */}

      </div>
    )
  }
}
