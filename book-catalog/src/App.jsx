import { BrowserRouter, Routes, Route } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ManageBooks from './pages/ManageBooks'
import Catalog from './pages/Catalog'
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path="/manage" element={<ManageBooks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
