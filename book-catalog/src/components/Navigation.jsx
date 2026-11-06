import { Link, useLocation } from 'react-router-dom';
import { BookOpen, House, Settings } from "lucide-react";

function Navigation() {
  const location = useLocation();

  const isManagePage = location.pathname == "/manage";
  const pageTitle = isManagePage ? "Manage Books" : "Book Catalog";

  return (
    <header className='app-header'>
      <Link to="/" className="brand">
        <BookOpen size={34} strokeWidth={2.2} />
        <span>{pageTitle}</span>
      </Link>

      <nav className="main-nav">
        <Link to="/" className={!isManagePage ? "nav-link active" : "nav-link"}>
          <House size={18} />
          <span>Catalog</span>
        </Link>
        <Link
          to="/manage"
          className={isManagePage ? "nav-link active" : "nav-link"}
        >
          <Settings size={18} />
          <span>Manage Books</span>
        </Link>
      </nav>

    </header>
  );
}

export default Navigation;
