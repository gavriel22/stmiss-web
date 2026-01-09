// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const About = lazy(() => import('./pages/About'));
const Academic = lazy(() => import('./pages/Academic'));
const Admission = lazy(() => import('./pages/Admission'));
const Scholarship = lazy(() => import('./pages/Scholarship'));
const ContextualCurriculum = lazy(() => import('./pages/ContextualCurriculum'));
const Lecturers = lazy(() => import('./pages/Lecturers'));
const Programs = lazy(() => import('./pages/Programs'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Agenda = lazy(() => import('./pages/Agenda'));

// Lightweight loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-500 text-sm">Memuat...</p>
    </div>
  </div>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/kurikulum-kontekstual" element={<ContextualCurriculum />} />
            <Route path="/dosen" element={<Lecturers />} />
            <Route path="/program-studi" element={<Programs />} />
            <Route path="/berita" element={<News />} />
            <Route path="/berita/:id" element={<NewsDetail />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
        </Suspense>
      </Router>
    </DataProvider>
  );
}

export default App;