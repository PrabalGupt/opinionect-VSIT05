import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Article = () => {
  const location = useLocation();
  const articleContent = location.state ? location.state.articleContent : null;
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  useEffect(() => {
    // Fetch comments when component mounts
    if (articleContent && articleContent.hash) {
      fetchComments();
    }
  }, [articleContent]);
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getComments?hash=${articleContent.hash}`);
      if (response.ok) {
        const comments = await response.json();
        console.log('Comments:', comments);
        setCommentsList(comments);
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log(articleContent.hash);
    console.log(comment);

    // Check if comment is not null
    if (!comment.trim()) {
      alert('Please enter a non-empty comment.');
      return;
    }

    const response = await fetch('http://localhost:5000/postComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hash: articleContent.hash,
        comments: comment,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to post comment');
    }
    setComment('');
    // Fetch comments after successfully posting a comment
    fetchComments();
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
