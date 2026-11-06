import "../App.css";
import { BookOpen, ShoppingCart } from "lucide-react";

function BookCard({ book, onAddToCart }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={"Cover of ${book.title}"}
            loading="lazy" />
        ) : (
          <div className="book-cover-placeholder">
            <BookOpen area-hidden="true" />
          </div>
        )}
      </div>

      <div className="book-card-content">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">by {book.author}</p>
        <div className="book-price">${Number(book.price).toFixed(2)}</div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => onAddToCart?.(book)}
        >
          <ShoppingCart size={19} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default BookCard;
