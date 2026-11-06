import { useEffect, useState } from "react";
import { Plus, Save, X, RotateCcw } from "lucide-react"

function BookForm({ book, onSaved, onCancelEdit }) {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const isEditing = book !== null;

  useEffect(() => {
    setTitle(book?.title ?? "");
    setAuthor(book?.author ?? "");
    setPrice(book?.price ?? "");
    setErrors({});
    setSubmitted(false);
  }, [book]);

  function validateForm() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!author.trim()) {
      newErrors.author = "Author is required.";
    }

    if (price.trim() === "") {
      newErrors.price = "Price is required.";
    }
    else if (!Number.isFinite(Number(price))) {
      newErrors.price = "Enter a valid price.";
    }
    else if (Number(price) < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      console.log("Error found during form submission.");
      return;
    }

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
        setErrors({});
        setSubmitted(false);

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
    setErrors({});
    setSubmitted(false);

    onCancelEdit();
  }

  function handleFieldChange(field, value, setter) {
    setter(value);

    if (submitted) {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }));
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>
          Title
        </label>
        <input
          type="text"
          placeholder="e.g. Of Mice and Men"
          value={title}
          onChange={(event) => handleFieldChange("title", event.target.value, setTitle)}
          className={errors.title ? "input-error" : ""}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <span id="title-error" className="field-error">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-field">
        <label>
          Author
        </label>
        <input
          type="text"
          placeholder="e.g. John Steinbeck"
          value={author}
          onChange={(event) => handleFieldChange("author", event.target.value, setAuthor)}
          className={errors.author ? "input-error" : ""}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? "title-error" : undefined}
        />
        {errors.author && (
          <span id="author-error" className="field-error">
            {errors.author}
          </span>
        )}
      </div>

      <div className="form-field">
        <label>
          Price
        </label>
        <input
          type="number"
          placeholder="19.99"
          value={price}
          onChange={(event) => handleFieldChange("price", event.target.value, setPrice)}
          className={errors.price ? "input-error" : ""}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? "title-error" : undefined}
        />
        {errors.price && (
          <span id="price-error" className="field-error">
            {errors.price}
          </span>
        )}
      </div>

      <div className="form-actions">

        <button type="submit" className="button button-primary">
          {isEditing ? (
            <>
              <Save size={18} />
              Update Book
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Book
            </>
          )}
        </button>
        {isEditing && (
          <button type="button"
            className="button button-secondary"
            onClick={handleCancel}>
            <>
              <X size={18} />
              Cancel Edit
            </>
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
