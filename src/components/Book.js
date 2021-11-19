import React from "react"
import PropTypes from "prop-types"
import BookShelfChanger from "./BookShelfChanger"

const Book =(props)=> {

    // book required props
    Book.PropTypes = {
        onUpdateShelf: PropTypes.func.isRequired,
        bookItem: PropTypes.object.isRequired
    }

    return <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, 
                            height: 193, 
                            backgroundImage: ((props.bookItem.imageLinks && props.bookItem.imageLinks.smallThumbnail) ?
                                            `url(${props.bookItem.imageLinks.smallThumbnail})` : "none")}}></div>
                <BookShelfChanger
                    onUpdateShelf={props.onUpdateShelf}
                    shelf={props.bookItem.shelf}
                    bookItem={props.bookItem}
                />
            </div>
            <div className="book-title">{props.bookItem.title}</div>
            <div className="book-authors">{(props.bookItem.authors &&  props.bookItem.length) > 1 ?
                                            props.bookItem.authors.join(", ") : props.bookItem.authors}
                                            </div>
        </div>
    </li>
}
export default Book