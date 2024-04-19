import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Article from './components/Article'
import Articles from './components/AllArticles'
import Footer from './components/Footer'

import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Article/:hash" element={<Article />} />
        <Route path="/Articles" element={<Articles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
