import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './api/BooksAPI'
import {DelayInput} from 'react-delay-input';

class SearchBooks extends Component{
  state = {
    books:[],
  }


  updateQuery = (query) => {
    //todo: if query is empty don't search
    BooksAPI.search(query.trim()).then(books => {
      console.log(books)
      this.setState({books:books || []})
    }).catch(
      this.setState({books:[]})
    )
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
          <BooksGrid books={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks
