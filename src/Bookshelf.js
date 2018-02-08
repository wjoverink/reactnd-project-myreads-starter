import React, { Component} from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'
import { BarLoader } from 'react-spinners';

/**
* @description Represents a shelf for books
* @constructor
*/
class Bookshelf extends Component{
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChange:PropTypes.func,
    loading:PropTypes.bool
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
    const {title, books=[], loading=false} = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BarLoader
          color={'#2e7c31'}
          loading={loading}
        />
        <div className="bookshelf-books">
          <BooksGrid
            books={books}
            onShelfChange={this.onSelfChange}
            onRatingChange={this.onRatingChange}
          />
        </div>
      </div>
    )
  }
}

export default Bookshelf
