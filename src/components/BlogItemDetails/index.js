// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const blogData = await response.json()
    const updateData = {
      id: blogData.id,
      title: blogData.title,
      imageUrl: blogData.image_url,
      avatarUrl: blogData.avatar_url,
      author: blogData.author,
      topic: blogData.topic,
      content: blogData.content,
    }
    this.setState({blogsData: updateData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogsData
    return (
      <div className="blog-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="blog-info">
            <h2 className="blog-details-title">{title}</h2>
            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>
            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}
export default BlogItemDetails
