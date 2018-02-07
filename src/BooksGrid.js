import React, { Component} from 'react'
import Book from './Book'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BooksGrid extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
  }


  render(){
    const {books} = this.props

    return(
      <ol className="books-grid">
        {
          books.map(book => (

            <li key={book.id}>
              <Book
                id = {book.id}
                title={book.title}
                authors={book.authors}
                image={book.imageLinks ? book.imageLinks.thumbnail : null}/>
            </li>
          ))
        }
      </ol>
    )
  }
}



export default BooksGrid
