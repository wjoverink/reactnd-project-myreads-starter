import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './api/BooksAPI'
import {DelayInput} from 'react-delay-input'
import PropTypes from 'prop-types'

class SearchBooks extends Component{
  static propTypes = {
    onShelfChange:PropTypes.func,
    books:PropTypes.array
  }

  state = {
    books:[],
  }

  onShelfChange = (book, shelf) => {
    if (this.props.onShelfChange){
      this.props.onShelfChange(book, shelf);
    }
  }

  syncShelfProperties = toUpdateBooks => {
    this.props.books.forEach(book=>{
      var foundBook = toUpdateBooks.find(b=>b.id === book.id);
      if (foundBook){
        foundBook.shelf = book.shelf;
      }
    })
  }

  updateQuery = (query) => {
    //todo: if query is empty don't search
    BooksAPI.search(query.trim()).then(books => {
      let foundBooks = books;
      if (!books || books.error){
        foundBooks=[]
      }
      this.syncShelfProperties(foundBooks)

      this.setState({books:foundBooks})
    })
  }

  render(){
    return(
      <div className="search-books">
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
            onShelfChange={this.onShelfChange} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
