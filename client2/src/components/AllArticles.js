import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import OpinioNect from '../abis/OpinioNectAbi.json'
import config from '../config.json'
const AllArticles = () => {
  const [hashes, setHashes] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchHashes();
  }, []); 
  
  async function fetchHashes() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork()
      console.log(provider)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log(network)

      const contract = new ethers.Contract(
      config[network.chainId].OpinioNect.address,OpinioNect,signer);    
      const getArticleHashes = async () => {
          const articleHashes = [];
          const length = await contract.articleHashLength();
          console.log(length);
          for(let i = 0; i < length; i++){
              const articleHash = await contract.articleHash(i);
              articleHashes.push(articleHash);
          }
          console.log(articleHashes);
          return articleHashes; // Return the array of hashes
      };

      // Call the getArticleHashes function and assign the result to the hashes variable
      const hashes = await getArticleHashes();
      // Set hashes state
      setHashes(hashes);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  async function fetchArticleContent(hash) {
    try {
      const cleanHash = hash.replace(/'/g, '');
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cleanHash}`);
      if (!response.ok) {
        throw new Error(`Error fetching article content: ${response}`);
      }
      const content = await response.json();
      const fullContent = content.content;
      setArticles((prevArticles) => [
        ...prevArticles,
        { title: content.title, content: fullContent, hash },
      ]);
    } catch (error) {
      console.error(`Error fetching article content for hash ${hash}:`, error);
    }
  }

  useEffect(() => {
    hashes.forEach((hash) => fetchArticleContent(hash));
  }, [hashes]);

  return (
		<div>
			<div className="articles-heading-container">
				<h2 className="articles-heading chomsky">News Articles</h2>
			</div>
			<div className="all-articles-container">
				{articles.map(
					(content, index) =>
						content.title && (
							<div key={index}>
								<Link
									className="article-link"
									to={`/article/${content.hash}`}
									state={{ articleContent: content }}
								>
									<i class="fa-solid fa-arrow-up-right-from-square"></i>
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