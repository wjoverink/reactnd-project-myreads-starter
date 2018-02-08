import React, { Component} from 'react'
import PropTypes from 'prop-types'
import Rating  from 'react-rating'

/**
* @description Represents a Book
* @constructor
*/
class Book extends Component{
  static propTypes = {
    book:PropTypes.object.isRequired,
    onShelfChange:PropTypes.func,
    onRatingChange:PropTypes.func
  }

  /**
  * @description select onchange event, shelf changes for a book
  * @param {object} e
  */
  handleShelfChange= (e) => {
    if (this.props.onShelfChange){
      this.props.onShelfChange(this.props.book, e.target.value)
    }
  }

  /**
  * @description Rating onchange event, Rating changes for a book
  * @param {object} e
  */
  handleRatingChange= (value) => {
    if (this.props.onRatingChange){
      this.props.onRatingChange(this.props.book, value)
    }
  }

  render(){
    const {authors=[], shelf='none', imageLinks, title, averageRating=0, userRating=0} = this.props.book

    const image = imageLinks ? imageLinks.thumbnail : null

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url(${image})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleShelfChange}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <Rating
          className="test"
          emptySymbol="fa fa-star fa-lg empty"
          placeholderSymbol="fa fa-star fa-lg all"
          fullSymbol="fa fa-star fa-lg user"
          placeholderRating={averageRating}
          initialRating={userRating}
          onChange={this.handleRatingChange}
        />
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors.map(author => <span className="book-authors-name" key={author}>{author}</span>)}
        </div>
      </div>
    )
  }
}

export default Book
