import React, { useEffect, useState} from "react"
// images
import bankImg from "../assets/img/bank-main.jpg"
// components
import { LogoutButton } from '../components/ui/LogoutButton';
import { history } from '../components';
import { LandingPage } from "./LandingPage";
// IMPORTANT NOT TO USE THIS IMPORT
// DepositPage should only use BankContext
// import {
// 	nodeUpdate
// } from '../components/api_mongo'

export const DepositPage = ({activeUser, activeUserEmail, getUserDetails, userLogOutSubmit, transactionExecute}) => {
	// const { activeUser, activeUserEmail, getUserDetails, userLogOutSubmit, transactionExecute}  = useContext(BankContext);
	const [amount, setAmount] =useState(null);

	useEffect(() => {
		if(activeUserEmail?.email === (null || undefined)) {
			userLogOutSubmit();
			history.push('/');
			return;
		}
		console.log("user is:😁", activeUserEmail)
		console.log("selected deposit amont:💲", Number(amount))
	}, [ activeUserEmail, amount]);

	const transaction = () => {
		console.log('EXECUTED: transaction() in DepositPage.js');
		// create newUserOBJ with new balance
		const newBalance = Number(activeUser?.balance) + Number(amount);
		const newUserOBJ = {...activeUser, balance: newBalance};
		console.log('DepositPage.js newUserOBJ',newUserOBJ);
		// update mongo
		transactionExecute(newUserOBJ, "deposit") // UPDATED BALANCE
		.then(()=> {// also update local activeUser
			getUserDetails()
		}).catch((error) => {
			console.log('DepositPage nodeUpdate error',error);
		}
		);
	}
	return(		
		(activeUser?.email)
		? (
				<div className="container mx-auto font-thin ">
					<div className="card " >
					<img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Rex" />
					<div className="card-img-overlay text-white">
						<h1 className="card-title position-relative">GOOD BANK: TRANSACTION DEPOSIT</h1>
						<LogoutButton />
						<div className="card-text lh-l">
							<div className="container  text-light mx-auto p-1  bg-secondary text-white font-thin">
								<h1>Hello {activeUser?.name} your balance is $ {activeUser?.balance} USD</h1>
								<div className="btn-group-vertical w-25" >
									<div className="input-group  mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text ">$</span>
										</div>
										<input type="number" id="amount" name="amount" min="0" className="form-control" aria-label="Amount (to the nearest dollar)" onChange={e => setAmount(e.target.value)} />
										<div className="input-group-append">
											<span className="input-group-text">.00</span>
										</div>
									</div>
									<button className="card-link btn btn-secondary mt-auto"  style={{  border: "2px solid white"}} onClick={()=>{(Number(amount) > -1) ? transaction() : alert("INVALID INPUT")}}>Deposit Amount</button>
								</div>
							</div>  
						</div>
					</div>
					</div>
				</div>
			)
		: <LandingPage />			
	)
};

