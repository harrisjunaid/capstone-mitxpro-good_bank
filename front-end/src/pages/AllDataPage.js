import React, { useState } from 'react'
// IMAGES
import bankImg from "../assets/img/bank-main.jpg"
// CONTEXT
// import { BankContext } from '../assets/context/BankContext';

import {
	ReloadButton
} from '../components/ui'
import {
	EditModal
}	from '../components'

const TableRow = ({user, key ,userDeleteSubmit, tableEditSubmit  }) => {
	return(
		<>
			<tr className="fs-5" key={key}>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.password}</td>
				<td>${user.balance}</td>
				<td>
					<button className="btn btn-link" type="button" data-bs-toggle="modal"  data-bs-target="#fullScreenModal" onClick={()=>{
						tableEditSubmit();
						}}>Edit</button> 

						|
					<button className="btn btn-link" onClick={() => {userDeleteSubmit();}}>Delete</button>
				</td>
			</tr>
		</>
	)
}

export const AllDataPage = ({allRecords, nodeRecords, userDeleteSubmit, userEditSubmit}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmailId, setEditEmailId] = useState(null);
 
	function recordList(tableEditSubmit){
		if(!allRecords) return (<tr><td>Loading...</td></tr>)
		return allRecords.map((user) => {
			return (
				<>
					<TableRow
						key={user._id}
						user={user} 
						userDeleteSubmit={() => userDeleteSubmit(user)}
						tableEditSubmit={() => tableEditSubmit(user)}
					/>
				</>
			);
		})
	}
	/**
	 * called from TableRow
	 * @param {*} user 
	 */
	const tableEditSubmit = (user) => { // as display in table row (not recently updated)
		console.log("EXECUTED: tableEditSubmit user", user)
    setEditEmailId({"email": user.email}); // for EditModal defaultValues
    setModalOpen(true); // open modal
  };
	/**
	 * called from EditModal component
	 * @param {*} newRecordOBJ 
	 */
  const editModalSubmit = async (newRecordOBJ) => {
		console.log("EXECUTED: editModalSubmit newRecordOBJ input", newRecordOBJ)
		// HANDLE EMAIL CHANGE
		if(editEmailId.email !== newRecordOBJ.email){
			await nodeRecords(); // get all records from mongodb
			const findResult = await allRecords.find((user) => user.email === newRecordOBJ.email)
			if(findResult) {
				alert("Error: Email already exists in database")
				setModalOpen(false); // close modal	
				setEditEmailId(null); // must be done at the end
				return false;
			} else {
				await userEditSubmit(editEmailId, newRecordOBJ);
				setModalOpen(false); // close modal	
				setEditEmailId(null); // must be done at the end
				return true; 
			}
		}
		// HANDLE PASSWORD CHANGE
		await nodeRecords(); // get all records from mongodb
		const findResult = await allRecords.find((user) => user.email === newRecordOBJ.email)
		if(findResult) {
			if(findResult.password !== newRecordOBJ.password){
				await userEditSubmit(editEmailId, newRecordOBJ);
				setModalOpen(false); // close modal	
				setEditEmailId(null); // must be done at the end
				return true;
			} else {
				alert("Error: Password already exists in database")
				setModalOpen(false); // close modal	
				setEditEmailId(null); // must be done at the end
				return false;
			}
		}
	}

	return(
		<>	
			<div className="container mx-auto font-thin">
				<div className="card " >
					<img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Rex" />
					<div className="card-img-overlay text-white" style={{overflowY: "scroll"}}>
						<h1 className="card-title position-relative">GOOD BANK RECORD</h1>
						<ReloadButton />
						{/* DISPLAY TABLE */}
						<div className="card-text lh-l text-center" >					
							<table className="table  table-hover mx-auto p-5  bg-secondary text-white font-monospace">
								<thead>
									<tr className="fs-4">
										<th>Name</th>
										<th>Email</th>
										<th>Password</th>
										<th>Balance</th>
										<th>Actions</th>
									</tr>						
								</thead>
								<tbody>{recordList(tableEditSubmit)}</tbody>
							</table>  
						</div>				
					</div>
				</div>
			</div>
			{modalOpen && (
        <EditModal // DOES NOT UPDATE BALANCE
          closeModal={() => {
            setModalOpen(false);
            setEditEmailId(null);
          }}
          editModalSubmit={editModalSubmit}
          defaultValues={editEmailId !== null && allRecords.find((user) => user.email === editEmailId.email)}
        />
			)}
		</>
	)
};

