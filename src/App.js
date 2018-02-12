import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './css/App.css'
import {Route, Link, Switch} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import sortBy from 'sort-by'

/**
* @description Represents the Books App
* @constructor
*/
class BooksApp extends React.Component {
  state = {
    books :[],
    loading:true
  }

  /**
  * @description react Lifecycle Event componentDidMount
  * get all the books from the API and saves them in the state
  */
  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books, loading:false});
    })
  }

  /**
  * @description Updates a book in the state
  * @param {object} book - The book that needs to be updated in the state
  */
  _updateBookState = (book) =>{
    var index = this.state.books.findIndex(b => book.id === b.id);
    if (index>-1){
      this.state.books.splice(index,1)
    }
    this.setState(state => ({
      books:state.books.concat([book])
    }))
  }

  /**
  * @description event, Shelf changes for a book
  * @param {objects} book
  * @param {string} shelf
  */
  onShelfChange = (book, shelf) => {
    book.shelf = shelf

    BooksAPI.update(book,shelf)
    this._updateBookState(book)
  }

  /**
  * @description event, rating changes for a book
  * @param {object} book
  * @param {string} shelf
  */
  onRatingChange = (book, rating) => {
    //todo: BooksAPI.update(book,rating)
    book.userRating = rating

    this._updateBookState(book)
  }


  render() {
    let books = this.state.books.sort(sortBy('title'))

    return (
      <div className="app">
        <Switch>
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
                    books={books.filter(book => book.shelf === 'currentlyReading')}
                    onShelfChange={this.onShelfChange}
                    onRatingChange={this.onRatingChange}
                    title={'Currently Reading'}/>
                  <Bookshelf
                    loading={this.state.loading}
                    books={books.filter(book => book.shelf === 'wantToRead')}
                    onShelfChange={this.onShelfChange}
                    onRatingChange={this.onRatingChange}
                    title={'Want to Read'}/>
                  <Bookshelf
                    loading={this.state.loading}
                    books={books.filter(book => book.shelf === 'read')}
                    onShelfChange={this.onShelfChange}
                    onRatingChange={this.onRatingChange}
                    title={'Read'}/>
                </div>
              </div>
              <div className="button open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>

          <Route  render={ () => (
            <div className="list-books p404">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <h2>Oooops, something went wrong!</h2>

              <div className='button'>
                <Link  to='/'>Back to Homepage</Link>
              </div>
              
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
