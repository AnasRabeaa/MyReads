import React from "react"
import PropTypes from "prop-types"
import Book from "./Book"
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { useState } from 'react';

const BookSearch = (props)=> {

    //book search required props
    BookSearch.PropTypes = {
        storedBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    // state contains query of search and currently searched books
    let [query, setquery] = useState("");
    let [searchedBooks, setsearchedBooks] = useState([]);

    /* 
        update query with letest user input.
        also, conduct the BooksAPI search passed down
        from the perent app and show searched books
    */
    const updateQuery = (query) => {
        // first, set state with the query
        setquery(query);
        // search the BooksAPI if the search result is in our app's list
        BooksAPI.search(query).then((searchResults) => {
            if (searchResults && searchResults.length > 0) {
                for (let i = 0; i < searchResults.length; i++) {
                    for (let j = 0; j < props.storedBooks.length; j++) {
                        if (searchResults[i].id === props.storedBooks[j].id) {
                            const shelfedBookIndex = props.storedBooks.findIndex((book) => book.id === searchResults[i].id)
                            searchResults[i].shelf = props.storedBooks[shelfedBookIndex].shelf
                        }
                    }
                }
            }
            setsearchedBooks(searchResults);
        })
    }

    return <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input  type="text" 
                            value={query}
                            placeholder="Search by title or author"
                            onChange={(event) => updateQuery(event.target.value)}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchedBooks &&
                    searchedBooks.length > 0 &&
                    searchedBooks.map((book) => (
                        <Book
                            key={book.id}
                            onUpdateShelf={props.onUpdateShelf}
                            bookItem={book}
                        />
                    ))}
                </ol>
            </div>
        </div>
}
export default BookSearch