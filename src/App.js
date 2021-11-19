import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import Title from './components/Title'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { useState,useEffect } from 'react';

const BooksApp =()=> {

  let [books , setbooks] = useState([]);
  let [flip , setflip] = useState(true);

  useEffect ( ()=>{
    BooksAPI.getAll().then((books) => {
      setbooks(books);
        })
  }, [] );

  /*
  update a book's shelf first in the local state, then in the API
  used by the BookShelfChanger components
  */
  const updateShelf = (book, shelf) => {
    // find the book's current shelf in a new array
    const updateIndex = books.findIndex((b) => b.id === book.id)
    const updateBookList = books

    // if we couldn't  find the index, book is not yet on 
    // any shelf. set it and then add it in 
    if (updateIndex === -1) {
      book.shelf = shelf
      updateBookList.push(book)
    }
    //otherwise, update its current shelf ans then the state
    else {
      updateBookList[updateIndex].shelf = shelf
    }

    setbooks(updateBookList);

    //update the API
    BooksAPI.update(book, shelf)
    setflip(!flip);
  }

    return(
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch
            storedBooks={books}
            onUpdateShelf={updateShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Title/>
            <div className="list-books-content">
              <div>
                <BookShelf
                className="bookshelf"
                title="Currently Reading"
                books={books.filter((book) => book.shelf === "currentlyReading")}
                updateShelf={updateShelf}
                />
                <BookShelf
                className="bookshelf"
                title="Want to Read"
                books={books.filter((book) => book.shelf === "wantToRead")}
                updateShelf={updateShelf}
                />
                <BookShelf
                className="bookshelf"
                title="Read"
                books={books.filter((book) => book.shelf === "read")}
                updateShelf={updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
}

export default BooksApp
