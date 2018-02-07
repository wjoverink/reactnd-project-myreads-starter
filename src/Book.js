import React, { Component} from 'react'
import PropTypes from 'prop-types'
import Rating  from 'react-rating';

class Book extends Component{
  static propTypes = {
    book:PropTypes.object.isRequired,
    onShelfChange:PropTypes.func,
    onRatingChange:PropTypes.func
  }

  handleShelfChange= (e) => {
    if (this.props.onShelfChange){
      this.props.onShelfChange(this.props.book, e.target.value);
    }
  }
  handleRatingChange= (value) => {
    if (this.props.onRatingChange){
      this.props.onRatingChange(this.props.book, value);
    }
  }

  render(){
    const {authors=[], shelf='none', imageLinks, title, averageRating=0, userRating=0} = this.props.book

    let image = imageLinks ? imageLinks.thumbnail : null

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
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
