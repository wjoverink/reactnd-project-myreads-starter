import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './css/App.css'
import {Route, Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books :[],
    loading:true
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({books, loading:false});
    })
  }

  _removeBookFromState = (book) =>{
    var index = this.state.books.findIndex(b => book.id === b.id);
    if (index>-1){
      this.state.books.splice(index,1)
    }
  }

  onShelfChange = (book, shelf) => {
    BooksAPI.update(book,shelf)
    this._removeBookFromState(book)

    book.shelf = shelf
    this.setState(state => ({
      books:state.books.concat([book])
    }))

  }

  onRatingChange = (book, rating) => {
    this._removeBookFromState(book)

    book.userRating = rating
    console.log(book)
    this.setState(state => ({
      books:state.books.concat([book])
    }))
  }


  render() {
    return (
      <div className="app">

        <Route exact path='/search' render={ () => (
          <SearchBooks
            books={this.state.books}
            onShelfChange={this.onShelfChange}
            onRatingChange={this.onRatingChange}
          />
        )}/>

        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  loading={this.state.loading}
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  onShelfChange={this.onShelfChange}
                  onRatingChange={this.onRatingChange}
                  title={'Currently Reading'}/>
                <Bookshelf
                  loading={this.state.loading}
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                  onShelfChange={this.onShelfChange}
                  onRatingChange={this.onRatingChange}
                  title={'Want to Read'}/>
                <Bookshelf
                  loading={this.state.loading}
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  onShelfChange={this.onShelfChange}
                  onRatingChange={this.onRatingChange}
                  title={'Read'}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
