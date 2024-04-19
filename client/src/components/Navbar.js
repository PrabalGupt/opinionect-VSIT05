import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userHash, setUserHash] = useState(null);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserHash(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
  }

  return (
    <div className='navbar'>
      <img className="logo" src='./images/typewriter.png' alt='printer'></img>
      <Link className='nav-about-us nav-link' to="/About">About Us</Link>
      <Link className='nav-read-articles nav-link' to="/Articles">Read Articles</Link>
      {userHash ? (
        <span>{userHash}</span>
      ) : (
        <Link to="/Articles" onClick={connect} className='signin-button'>CONNECT WALLET</Link>
      )}
    </div>
  );
}

export default Navbar;
