import React, { Component} from 'react'
import Book from './Book'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BooksGrid extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange:PropTypes.func
  }

  onSelfChange = (book, shelf) => {
    if (this.props.onShelfChange){
      this.props.onShelfChange(book, shelf);
    }
  }

  render(){
    const {books} = this.props

    return(
      <ol className="books-grid">
        {
          books.map(book => (
            <li key={book.id}>
              <Book book={book} onShelfChange={this.onSelfChange}/>
            </li>
          ))
        }
      </ol>
    )
  }
}

export default BooksGrid
