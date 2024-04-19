import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import { ethers } from 'ethers'
import Article from './components/Article'
import Articles from './components/AllArticles'
import Footer from './components/Footer'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import OpinioNect from './abis/OpinioNectAbi.json'
import config from './config.json'
function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [opinioNect, setopinioNect] = useState(null)
  const [occasions, setOccasions] = useState([])

  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false)

  const [error, setError] = useState("");

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
