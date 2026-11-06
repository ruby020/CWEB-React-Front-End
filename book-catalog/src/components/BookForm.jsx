import { useEffect, useState } from "react";

function BookForm({ book, onSaved, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const isEditing = book !== null;

  useEffect(() => {
    setTitle(book?.title) ?? "";
    setAuthor(book?.author) ?? "";
    setPrice(book?.price) ?? "";
  }, [book]);

  function handleSubmit(event) {
    event.preventDefault();

    const bookData = {
      title: title,
      author: author,
      price: Number(price),
    };

    let url = "http://localhost:8080/books";
    let method = "POST";

    if (isEditing) {
      url = `http://localhost:8080/books/${book.id}`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to ${isEditing ? "update" : "create"} book.`);
        }
        return response.json()
      })
      .then((data) => {
        console.log(isEditing ? "Book updated: " : "Book created: ", data);

        setTitle("");
        setAuthor("");
        setPrice("");

        onSaved();

        if (isEditing) {
          onCancelEdit();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleCancel() {
    setTitle("");
    setAuthor("");
    setPrice("");

    onCancelEdit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {isEditing ? "Edit Book" : "Add Book"}
      </h2>

      <div className="form-field">
        <label>
          Title
          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </label>
      </div>

      <div className="form-field">
        <label>
          Author
          <input type="text" value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
      </div>

      <div className="form-field">
        <label>
          Price
          <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
        </label>
      </div>

      <div className="form-actions">

        <button type="submit" className="button button-primary">{isEditing ? "Update Book" : "Add Book"}</button>
        {isEditing && (
          <button type="button"
            className="button button-secondary"
            onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
