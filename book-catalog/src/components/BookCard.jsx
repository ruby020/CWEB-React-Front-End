import "../App.css";

function BookCard({ book }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>${book.price}</p>
      <button>Add to Cart</button>
    </article>
  );
}

export default BookCard;
