import BookListPage from './Components/BookListPage';
import NewBookPage from './Components/NewBookPage';
import ModifyBookPage from './Components/ModifyBookPage';
import SingleBookPage from './Components/SingleBookPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">Könyvek</a>
            </li>
            <li className="nav-item">
              <a href="/new-book" className="nav-link">Új könyv</a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/new-book" element={<NewBookPage />} />
        <Route path="/modify-book/:id" element={<ModifyBookPage />} />
        <Route path="/book/:id" element={<SingleBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
