import React, { useState, useEffect } from 'react'
import './dashboard.css'
import RecipeReviewCard from '../../components/Cards/cards.jsx'

function DashboardPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    // Get logged-in username from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    const username = loggedInUser?.username

    fetch("https://author-final-1.onrender.com/books/")
      .then((res) => res.json())
      .then((data) => {
        let allBooks = []

        if (Array.isArray(data)) {
          allBooks = data
        } else if (Array.isArray(data.books)) {
          allBooks = data.books
        } else {
          console.error("Unexpected response:", data)
        }

        // Filter books by author matching logged-in user
        if (username) {
          const userBooks = allBooks.filter((book) => book.author === username)
          setBooks(userBooks)
        } else {
          setBooks([])
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
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#555' }}>
              You haven’t uploaded any books yet.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardPage
