import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Layout from '../../components/Layout/layout.jsx'
import RecipeReviewCard from '../../components/Cards/cards.jsx'

function DashboardPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch("https://author-book-u7or.onrender.com/books/")
      .then((res) => res.json())
      .then((data) => {
        // if API returns { books: [...] }
        if (Array.isArray(data)) {
          setBooks(data)
        } else if (Array.isArray(data.books)) {
          setBooks(data.books)
        } else {
          console.error("Unexpected response:", data)
        }
      })
      .catch((err) => console.error("Error fetching books:", err))
  }, [])

  return (
    <>
      <div className='Display_container'>
        <h4>YOUR BOOKS</h4>
        <div className='cards'>
          {books.length > 0 ? (
            books.map((book) => (
              <RecipeReviewCard
                key={book._id}
                title={book.title}
                author={book.author}
                description={book.description}
                genre={book.genre}
                price={book.price}
                image={book.image}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardPage