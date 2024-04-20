import decoration from "../images/border-decoration.png";
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
					
					<img src={decoration}></img>
				</h2>


				<div className="description">
					<p>
						Every Opinion Matters... Therefore, we bring forth
						“OpinioNect”, a platform that presents your opinions to
						the world transparently, promoting Equal Representation
						and Free Speech that forms the basis of a Democracy.
					</p>
					<p>
						With OpinioNect, we ensure that your invaluable opinion
						on a topic is given equal chance of representation. In
						that way, each topic can have a variety of views x
					</p>
				</div>
			</div>

			<div className="how-does-it-works">
				<h2 className="chomsky">
					How Does It Works?
					<br />
					<img
						src="/images/heading-decoration-border.png"
						alt="heading-decoration-border"
					/>
				</h2>
				<div className="process-steps">
					<div className="step">
						<i class="fa-solid fa-wallet"></i>
						Connect Your
						<br />
						Wallet
					</div>
					<i class="fa-solid fa-arrow-right"></i>
					<div className="step">
						<i class="fa-solid fa-newspaper"></i>
						Read Article
					</div>
					<i class="fa-solid fa-arrow-right"></i>
					<div className="step">
						<i class="fa-solid fa-message"></i>
						Bring Your
						<br />
						Opinion Forward
					</div>
					<i class="fa-solid fa-arrow-right"></i>
					<div className="step">
						<i class="fa-brands fa-hive"></i>
						Comments Stored
						<br />
						On Blockchain
					</div>
					<i class="fa-solid fa-arrow-right"></i>
					<div className="step">
						<i class="fa-solid fa-brain"></i>
						Get Summarized
						<br />
						Comments Through AI
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
