import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './api/BooksAPI'
import {DelayInput} from 'react-delay-input'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners';

/**
* @description Represents a Books search control
* @constructor
*/
class SearchBooks extends Component{
  static propTypes = {
    onShelfChange:PropTypes.func,
    onRatingChange:PropTypes.func,
    books:PropTypes.array
  }

  state = {
    books:[],
    loading:false
  }

  /**
  * @description event, Shelf changes for a book
  * @param {object} book
  * @param {string} shelf
  */
  onShelfChange = (book, shelf) => {
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

  /**
  * @description Syncs states(rating,shelf) from books prop with the found books
  */
  syncBookProperties = toUpdateBooks => {
    this.props.books.forEach(book=>{
      var foundBook = toUpdateBooks.find(b=>b.id === book.id);
      if (foundBook){
        foundBook.shelf = book.shelf;
        foundBook.userRating = book.userRating;
      }
    })
  }

  /**
  * @description searches for books that match the query
  * @param {string} query - the string to search for
  */
  updateQuery = (query) => {
      this.setState({loading:true})
    //todo: if query is empty don't search
    BooksAPI.search(query.trim()).then(books => {
      let foundBooks = books;
      if (!books || books.error){
        foundBooks=[]
      }
      this.syncBookProperties(foundBooks)

      this.setState({books:foundBooks, loading:false})
    })
  }

  render(){
    return(
      <div className="search-books">
        <BarLoader
          color={'#2e7c31'}
          loading={this.state.loading}
        />
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <DelayInput
              type="text"
              delayTimeout={300}
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.books}
            onShelfChange={this.onShelfChange}
            onRatingChange={this.onRatingChange}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
