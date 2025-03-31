import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import OpinioNect from '../abis/OpinioNectAbi.json';
import config from '../config.json';
import store, { addArticle } from '../articlesSlice';

// Import the posts data from the local file in the components folder
import postsData from './postData.json'; // Adjust the path as needed

const AllArticles = () => {
  const [hashes, setHashes] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchHashes();
  }, []); 
  
  // Fetch article hashes from the smart contract
  async function fetchHashes() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();

      const contract = new ethers.Contract(
        config[network.chainId].OpinioNect.address,
        OpinioNect,
        signer
      );

      const articleHashes = [];
      const length = await contract.articleHashLength();
      
      for (let i = 0; i < length; i++) {
        const articleHash = await contract.articleHash(i);
        articleHashes.push(articleHash);
      }
      
      setHashes(articleHashes);
    } catch (error) {
      console.error('Error fetching article hashes:', error);
    }
  }

  // Instead of fetching data, directly use the imported JSON data
  useEffect(() => {
    // Format the posts data based on the structure in the JSON file
    const formattedPosts = postsData.map((post) => ({
      title: post.title,
      content: post.fullContent, // Assuming 'fullContent' is available in the JSON file
      hash: post.hash, // Assuming 'hash' is available in the JSON file
    }));

    setPosts(formattedPosts);
    // Dispatching the articles if necessary for redux
    // store.dispatch(addArticle());
  }, []); // Only run once on mount

  return (
    <div>
      <div className="articles-heading-container">
        <h2 className="articles-heading chomsky">New Posts</h2>
      </div>
      <div className="all-articles-container">
        {posts.map((content, index) => 
          content.title && (
            <div key={index}>
              <Link
                className="article-link"
                to={`/`}
                state={{ articleContent: content }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                {content.title}
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllArticles;
