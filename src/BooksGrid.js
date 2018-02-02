import React, { Component} from 'react'
import Book from './Book'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BooksGrid extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
  }


  render(){
    const {books} = this.props;

    return(
      <ol className="books-grid">
        <li>
          <Book title={'To Kill a Mockingbird'} authors={['Harper Lee']} image={'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'}/>
        </li>
      </ol>
    )
  }
}



export default BooksGrid
