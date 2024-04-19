import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import OpinioNect from '../abis/OpinioNectAbi.json'
import config from '../config.json'



const Article = () => {
  const location = useLocation();
  const articleContent = location.state ? location.state.articleContent : null;
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  useEffect(() => {
    if (articleContent && articleContent.hash) {
      fetchComments();
    }
  }, [articleContent]);

  const fetchComments = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork()
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
      config[network.chainId].OpinioNect.address, OpinioNect, signer);    
      const cleanHash = articleContent.hash.replace(/'/g, '');
      const comments = await contract.getCommentsOnArticle(cleanHash)
      console.log(articleContent.hash)
      console.log(comments)
      setCommentsList(comments)
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  const addComment = async (articleHash, comment) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork()

      const contractInstance = new ethers.Contract(
      config[network.chainId].OpinioNect.address, OpinioNect,signer);
      const tx = await contractInstance.addComment(articleHash, comment);
      await tx.wait();
      console.log(tx)
      setComment('')
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!comment.trim()) {
        alert('Please enter a non-empty comment.');
        return;
      }
      const cleanHash = articleContent.hash.replace(/'/g, '');
      const response = await addComment(cleanHash, comment)
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};
  return (
    <div>
      {articleContent && (
        <div>
          <h2 className='article-title'>{articleContent.title}</h2>
          <p className='article-body'>{articleContent.content}</p>
        </div>
      )}
      <h3 className='comments-heading'>Comments</h3>
      <form onSubmit={handleSubmit}>
        <label className='comment-text-input-holder'>
          <input className='comment-text-input' type="text" value={comment} onChange={handleInputChange} placeholder='Type what you feel...' />
        </label>
        <button className='comment-post-button' type="submit" >Post</button>
      </form>
      <div>
        <ul className='comments-list-comment-holder'>
          {commentsList.map((comment, index) => (
            <li className='comments-list-comment' key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;