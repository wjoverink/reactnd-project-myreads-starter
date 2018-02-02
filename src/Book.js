import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component{
  static propTypes = {
    authors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bookShelf: PropTypes.string,
  }

  // static bookShelfChangeroptions = new Map([
  //   ['empty', {name:'Move to...', disabled:true}],
  //   ['currentlyReading', {name:'Currently Reading'}],
  //   ['wantToRead', {name:'Want to Read'}],
  //   ['read', {name:'Read'}],
  //   ['none', {name:'None'}]
  // ])
  //
  // createBookShelfChanger = () => {
  //   let options = [];
  //   for (var [key, value] of Book.bookShelfChangeroptions) {
  //                       options.push(<option key={key} value={key}}disabled={value.disabled}>{value.name}</option>)
  //                   }
  //   return options;
  // }

  render(){
    const {authors, bookShelf='none', image, title} = this.props;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
          <div className="book-shelf-changer">
            <select value={bookShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.map(author => <span key={author}>{author}</span>)}</div>
      </div>
    )
  }
}



export default Book
