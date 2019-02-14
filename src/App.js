import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Switch } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  importAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  componentDidMount() {
    this.importAllBooks();
  }

  updateBookOnShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.importAllBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>

        <Route exact path="/" render={() => (
          <BookShelf 
            books={this.state.books}
            updateBookOnShelf={this.updateBookOnShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            updateBookOnShelf={this.updateBookOnShelf}
            books={this.state.books}
          />
        )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
