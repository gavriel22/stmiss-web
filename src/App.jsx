// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Academic from './pages/Academic';
import Admission from './pages/Admission';
import Scholarship from './pages/Scholarship';

import ContextualCurriculum from './pages/ContextualCurriculum';
import Lecturers from './pages/Lecturers';
import Programs from './pages/Programs';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/kurikulum-kontekstual" element={<ContextualCurriculum />} />
          <Route path="/dosen" element={<Lecturers />} />
          <Route path="/program-studi" element={<Programs />} />
          <Route path="/berita" element={<News />} />
          <Route path="/berita/:id" element={<NewsDetail />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;