import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Article = () => {
	const location = useLocation();
	const articleContent = location.state
		? location.state.articleContent
		: null;
	const [comment, setComment] = useState("");
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
			const response = await fetch(
				`http://localhost:5000/getComments?hash=${articleContent.hash}`
			);
			if (response.ok) {
				const comments = await response.json();
				console.log("Comments:", comments);
				setCommentsList(comments);
			} else {
				throw new Error("Failed to fetch comments");
			}
		} catch (error) {
			console.error("Error fetching comments:", error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(articleContent.hash);
			console.log(comment);

			// Check if comment is not null
			if (!comment.trim()) {
				alert("Please enter a non-empty comment.");
				return;
			}

			const response = await fetch("http://localhost:5000/postComments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					hash: articleContent.hash,
					comments: comment,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to post comment");
			}
			setComment("");
			// Fetch comments after successfully posting a comment
			fetchComments();
		} catch (error) {
			console.error("Error posting comment:", error);
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
								Username
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
