import React from "react";

const Home = () => {
	return (
		<div>
			<div className="hero-section">
				<h1 className="home-top-heading chomsky">OpinioNect</h1>
				<p className="home-top-subheading">
					Bringing your opinions to the world...
				</p>
			</div>

			<div className="what-is-opinionect">
				<h2 className="chomsky">
					What is OpinioNect?
					<br />
					<img
						src="/images/heading-decoration-border.png"
						alt="heading-decoration-border"
					/>
				</h2>
				<div className="empty"></div>
			</div>
		</div>
	);
};

export default Home;
