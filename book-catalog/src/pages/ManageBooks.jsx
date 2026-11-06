import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import { Pencil, Trash2 } from "lucide-react";

function ManageBooks() {

  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  function loadBooks() {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }

  function deleteBook(id) {
    fetch(`http://localhost:8080/books/${id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log("Deleting Book ID: " + id);
      if (!response.ok) {
        throw new Error("Failed to delete book");

      }

      loadBooks();
    });
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <main>
      <h1>Manage Books</h1>

      <p className="page-description">
        Add new books or update your existing catalog.
      </p>

      <section class="panel">
        <BookForm
          book={editingBook}
          onSaved={loadBooks}
          onCancelEdit={() => setEditingBook(null)} />
      </section>

      <section class="panel">
        <h2>Current Books</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="button button-primary"
                      onClick={() => setEditingBook(book)}>
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      className="button button-danger"
                      onClick={() => deleteBook(book.id)}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}

export default ManageBooks;
