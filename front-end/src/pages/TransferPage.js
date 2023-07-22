import React, {useContext, useEffect, useState} from "react"
// icons
import { HiOutlineMail } from "react-icons/hi"
// formik and yup
import { useFormik } from 'formik'
import * as Yup from 'yup'
// images
import bankImg from "../assets/img/bank-main.jpg"
// context
import { BankContext } from '../assets/context/BankContext';
// components
import { LogoutButton } from '../components/ui/LogoutButton';
import { LandingPage } from "./LandingPage";
// import { input } from "@testing-library/user-event/dist/types/event"
// IMPORTANT NOT TO USE THIS IMPORT
// DepositPage should only use BankContext
// import {
// 	nodeUpdate
// } from '../components/api_mongo'

export const TransferPage = () => {
	const { activeUser, activeUserEmail, transferExecute}  = useContext(BankContext);
	// const [amount, setAmount] =useState(null);
	const [submitStatus, SetSubmitStatus] = useState(false);
	const [transferStatus, setTransferStatus] = useState(false);


	const initialData = {
    "email": "",
		"amount": 0
  }
	const formikSubmit = (values) => {
		const inputOBJ = {
			"emailTo": values.email,
			"emailFrom": activeUserEmail.email,
			"amount": values.amount
		}
		/**
		 * check if user exists in mongo
		 * update both users in mongo
		 * update activeUser in context
		 */

		 transferExecute(inputOBJ)
		  .then((result) => {
				setTransferStatus(result)
				if(!result) alert('Transfer Failed')
		})
  }
	const formik = useFormik({
    initialValues: { ...initialData },
    validationSchema: Yup.object({
      email: Yup.string().matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

, 'Only small caps allowed').email('Invalid email address').required('Required'),
			amount: Yup.number().min(1, 'Must be at least 1').max(Number(activeUser?.balance), 'Available User Balance').required('Required'),
		}),
    onSubmit:(values) => {
      formikSubmit(values)   
        SetSubmitStatus(true); // to display success message for 6 seconds on submit
        setTimeout(()=> SetSubmitStatus(false), 6000);
    }
  });

	// useEffect(() => {
	// 	if(activeUser?.email === (null || undefined)) {
	// 		history.push('/');
	// 		return;
	// 	}
	// 	console.log("user is:😁", activeUserEmail)
	// 	console.log("selected deposit amont:💲", Number(amount))
	// }, [ activeUserEmail, amount]);



	return(		
		(activeUser?.email)
		? (
				<div className="container mx-auto font-thin ">
					<div className="card " >
					<img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Rex" />
					<div className="card-img-overlay text-white">
						<h1 className="card-title position-relative">GOOD BANK: INTERNAL TRANSFER</h1>
						<LogoutButton />
						<div className="card-text lh-l">
							<div className="container  text-light mx-auto p-1  bg-secondary text-white font-thin">
								<h1>Hello {activeUser?.name} your balance is $ {activeUser?.balance} USD</h1>
								{/* <div className="container"> */}
								<form className="inputForm container" onSubmit={formik.handleSubmit}>
									{/* amount to transfer */}
									<div className="row">
										<h3  className="col">Enter Amount to Transfer</h3>
										{/* number entry button group */}
										<div className=" col" >
											<div className=" btn-group-vertical w-25" >
												<div className=" input-group  mb-3">
													<div className="input-group-prepend">
														<span className="input-group-text ">$</span>
													</div>
													<input type="number" id="amount" name="amount" min="0" max={Number(activeUser?.balance)}className="form-control" aria-label="Amount (to the nearest dollar)" 
														onChange={formik.handleChange} 
														onBlur={formik.handleBlur}
														value={formik.values.amount}
													/>
													<div className="input-group-append">
														<span className="input-group-text">.00</span>
													</div>
												</div>
											</div>
										</div>
										{/* end of number entry button group */}
									</div>
									{/* transfer to */}
									<div className="row">
										<h3 className="col">Transfer to</h3>
										<div className="col form-floating mb-3">
											<HiOutlineMail className="icon fa-lg"/>
											<input className="form-control" id="email" name="email" type="email" placeholder="Email" 
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.email}
											/>
											{formik.errors.email ? <p className="text-danger fs-5 error-message">{formik.errors.email}</p>:null}
											<label htmlFor="email">Email</label>
										</div>
									</div>	
									{/* button groug */}
									<div className="btn-group gap-1 btn-group-lg" role="group" aria-label="Transfer Amount Buttons">
										<button  id="submit" type="button"  className="card-link btn btn-secondary mt-auto" style={{  border: "2px solid white"}} disabled={!(formik.isValid && formik.dirty && (formik?.values?.email !== activeUserEmail?.email) && (formik.values.email!=="admin@admin.com"))} onClick={formik.handleSubmit}>Transfer</button>
										<button  id="reset" type="button" className="card-link btn btn-secondary mt-auto"  style={{  border: "2px solid white"}} onClick={formik.handleReset} disabled={false}>Reset</button>
              	  </div>
									{/* ** */}
								</form>			
								{(submitStatus && transferStatus) ? <pre className="text-warning mt-3 fs-2 h-25 bg-success">{`Transferred Amount: $${formik.values.amount} to ${formik.values.email}`}</pre>:null}
							</div>  
						</div>
					</div>
					</div>
				</div>
			)
		: <LandingPage />			
	)
};

