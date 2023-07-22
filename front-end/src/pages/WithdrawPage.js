import React, {useContext, useEffect, useState} from "react"
// images
import bankImg from "../assets/img/bank-main.jpg"
// context
import { BankContext } from '../assets/context/BankContext';
// components
import { history } from '../components';
// ui
import { LogoutButton } from '../components/ui';
// pages
import { LandingPage } from "../pages";

export const WithdrawPage = () => {
	const { activeUserEmail, activeUser, getUserDetails, transactionExecute, userLogOutSubmit }  = useContext(BankContext);
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
		console.log('EXECUTED: transaction() in WithdrawPage.js');
		const newBalance = Number(activeUser?.balance) - Number(amount);
		const newUserOBJ = {...activeUser, balance: newBalance};
		console.log('WithdrawPage newUserOBJ',newUserOBJ);
		transactionExecute(newUserOBJ, "withdraw")
			.then(()=> {// also update local activeUser
				getUserDetails()
			})
			.catch((error) => {
				console.log('WithdrawPage nodeUpdate error',error);
			}
		);
	}

	return(		
		(activeUser?.email)
		? (
				<div className="container mx-auto font-thin">
					<div className="card " >
					<img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Rex" />
					<div className="card-img-overlay text-white">
						<h1 className="card-title position-relative">GOOD BANK: TRANSACTION WITHDRAWALS</h1>
						<LogoutButton/>
						<div className="card-text lh-l">
							<div className="container  text-light mx-auto p-1  bg-secondary text-white font-thin">
								{/* <h1>Hello {activeUser.name} your balance is $ {activeUser.balance} USD</h1> */}
								<h1>Hello {activeUser?.name} your balance is $ {activeUser?.balance} USD</h1>

								<div className="btn-group-vertical w-25" >
									<div className="input-group  mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text ">$</span>
										</div>
										{/* <input type="number" id="amount" name="amount" min="0" max={activeUser.balance}className="form-control" aria-label="Amount (to the nearest dollar)" onChange={e => setAmount(e.target.value)} /> */}
										<input type="number" id="amount" name="amount" min="0" max={activeUser?.balance}className="form-control" aria-label="Amount (to the nearest dollar)" onChange={e => setAmount(e.target.value)} />

										<div className="input-group-append">
											<span className="input-group-text">.00</span>
										</div>
									</div>
									<button className="card-link btn btn-secondary mt-auto"  style={{  border: "2px solid white"}} onClick={()=>{((amount<=	Number(activeUser?.balance)) && amount>0)?transaction():alert("INVALID INPUT")}}>Withdraw Amount</button>
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

