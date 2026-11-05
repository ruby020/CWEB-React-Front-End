import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Catalog</Link>
      <Link to="/manage">Manage Books</Link>
    </nav>
  );
}

export default Navigation;
