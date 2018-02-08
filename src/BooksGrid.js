import React, { Component} from 'react'
import Book from './Book'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
* @description Represents a grid for books
* @constructor
*/
class BooksGrid extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onRatingChange:PropTypes.func,
    onShelfChange:PropTypes.func
  }

  /**
  * @description event, Shelf changes for a book
  * @param {object} book
  * @param {string} shelf
  */
  onSelfChange = (book, shelf) => {
    if (this.props.onShelfChange){
      this.props.onShelfChange(book, shelf);
    }
  }

  /**
  * @description event, Rating changes for a book
  * @param {object} book
  * @param {string} rating
  */
  onRatingChange = (book, rating) => {
    if (this.props.onRatingChange){
      this.props.onRatingChange(book, rating);
    }
  }

  render(){
    const {books} = this.props

    return(
      <ol className="books-grid">
        {
          books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                onShelfChange={this.onSelfChange}
                onRatingChange={this.onRatingChange}
              />
            </li>
          ))
        }
      </ol>
    )
  }
}

export default BooksGrid
