import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input';
import Book from './Book'

class SearchBooks extends Component {
	state = {
		query: "",
		booksSearched: [],
		error: false
	}

	updateQuery = (query) => {
	    this.setState({ query: query });
	    if (query) {
	      BooksAPI.search(query).then((booksSearched) => {
	      	if (booksSearched.length > 0) this.setState({booksSearched: booksSearched, error: false})
	      	else this.setState({booksSearched: [], error: true})
	      })
	    } else {
	      this.setState({ booksSearched: [], error: false });
	    }
	  }

	  clearQuery = () => {
	  	this.setState({query: ""})
	  }

	render() {
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
              	<DebounceInput
              		minLength={2}
              		debounceTimeout={100}
              		value={this.state.query}
              		placeholder="Search by title or author"
              		onChange={(e) => this.updateQuery(e.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
	            {
	            	this.state.error && (
						<div className="align-center">
            				<h3>I am sorry! There are no results!</h3>
            				<button className="buttonSearch" onClick={this.clearQuery}>Try again</button>
            			</div>
	            	)
	            }
	            {
	            	!this.state.error && this.state.booksSearched.length > 0 && (
	            		<div className="align-center">
	            			<h3>Yay! We found some books for you!</h3>
	            		</div>
	            	)
	            }
              <ol className="books-grid">
              	{
              		this.state.booksSearched.map(bookSearched => {

              			let bookShelf = "none";

              			this.props.books.map(book => (
	          				book.id === bookSearched.id ? 
	          				bookShelf = book.shelf : 
	          				""

	          			));

              			return (
              				<li key={bookSearched.id}>
              				<Book
			              		book={bookSearched}
			              		updateBookOnShelf={this.props.updateBookOnShelf}
			              		shelf={bookShelf}
			              	/>
              				</li>
              			);
              		})
              	}
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks