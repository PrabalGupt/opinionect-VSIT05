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
  const [address, setAddress] = useState([]);

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
      setAddress(contract.address)
      const comments = await contract.getCommentsOnArticle(cleanHash)
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
		<div className="single-article">
			{articleContent && (
				<>
					<div className="single-article-hero">
						<h2>{articleContent.title}</h2>
					</div>
					<p className="single-article-content">
						{articleContent.content}
					</p>
				</>
			)}
			<h3 className="comments-heading chomsky">
				Comments
				<br />
				<img
					src="/images/heading-decoration-border.png"
					alt="heading-decoration-border"
				/>
			</h3>
			<form onSubmit={handleSubmit} className="comment-form">
				<textarea
					className="comment-text-input"
					id="comment-text-input-holder"
					type="text"
					value={comment}
					onChange={handleInputChange}
					placeholder="Type what you feel..."
				/>
				<button className="comment-post-button" type="submit">
					Post
				</button>
			</form>
			<div>
				<ul className="comments-list-comment-holder">
					{commentsList.map((comment, index) => (
						<li className="comments-list-comment" key={index}>
							<div className="user-info">
								<i class="fa-solid fa-user"></i>
								{address}
							</div>
							<p>{comment}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Article;