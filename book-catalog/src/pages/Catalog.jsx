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


  return (
    <main>
      <h1>Book Catalog</h1>

      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </main>

  );
}

export default Catalog;
