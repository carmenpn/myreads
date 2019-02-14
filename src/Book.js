import React, { Component } from 'react'

class Book extends Component {
	render() {

		let bookThumbnail; 
		if (this.props.book.imageLinks) bookThumbnail = this.props.book.imageLinks.thumbnail;
		else bookThumbnail = "";

		let bookAuthor;
		if (this.props.book.authors) bookAuthor = this.props.book.authors[0];
		else bookAuthor = "";

		let bookTitle;
		if (this.props.book.title) bookTitle = this.props.book.title;
		else bookTitle = "";

		return(
			<div className="book">
				<div className="book-top">
		            <div className="book-cover" style={{ 
		            	width: 128, 
		            	height: 193, 
		            	backgroundImage: `url(${bookThumbnail})`
		            	}}>
		            </div>
		            <div className="book-shelf-changer">
		              <select 
		              	value={this.props.shelf}
		              	onChange={(ev) => this.props.updateBookOnShelf(this.props.book, ev.target.value)}>
		                <option value="move" disabled>Move to...</option>
		                <option value="currentlyReading">Currently Reading</option>
		                <option value="wantToRead">Want to Read</option>
		                <option value="read">Read</option>
		                <option value="none">None</option>
		              </select>
		             </div>
		         </div>
		       	<div className="book-title">{bookTitle}</div>
		      	<div className="book-authors">{bookAuthor}</div>
		    </div>
		)
	}
}

export default Book