import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './css/App.css'
import {Route, Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    allBooks :[]
  }

  componentDidMount(){
    BooksAPI.getAll().then(allBooks => {
      this.setState({allBooks});
      // debugger;
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/search' render={ () => (
          <SearchBooks books={this.state.allBooks}/>
        )}/>

        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title={'Currently Reading'}/>
                <Bookshelf title={'Want to Read'}/>
                <Bookshelf title={'Read'}/>
              </div>
            </div>
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
