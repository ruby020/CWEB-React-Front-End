import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import "../App.css";

function Catalog() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  function handleAddToCart(book) {
    // Placeholder 
    console.log("Add to cart: ", book.id);
  }

  return (
    <main>
      <div className="catalog-header">
        <h1>Find Your Next Favorite</h1>
        <p>Explore our catalog</p>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p role="alert">Could not load the catalog: {error}</p>}
      {!loading && !error && books.length === 0 && (
        <p>No books are available yet.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </main>

  );
}

export default Catalog;
