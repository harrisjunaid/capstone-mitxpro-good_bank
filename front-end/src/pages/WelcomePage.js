import React from 'react';
// images
import bankImg from "../assets/img/bank-main.jpg"

export const WelcomePage = () => (
	<>
		<div className="container mx-auto font-thin" >
			<div className="card text-center border border-light border-4 shadow" >
				{/* card */}
				<div className="card-body">
					<h4 className="card-title text-secondary">WELCOME BACK TO GOOD BANK</h4>
					<p className="card-text lh-sm">Take advantage of our top-notch customer care, no account fees, security and fraud protection, mobile access, and accessible ATMs.</p>
					{/* <a href="#" className="card-link btn btn-secondary mt-auto">more info</a> */}
				</div>
				<img className="card-img-bottom" src={bankImg} alt="Bank" />
			</div>
		</div>
	</>
);

