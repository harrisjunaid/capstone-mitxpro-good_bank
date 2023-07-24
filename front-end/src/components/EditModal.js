import React, { useState } from "react"
// icons
import { MdOutlinePersonOutline } from "react-icons/md"
import { HiOutlineMail } from "react-icons/hi"
import { TbPassword } from "react-icons/tb"
// background and css
import bankImg from "../assets/img/bank-main.jpg"
import "./form.css"
// formik and yup
import { useFormik } from 'formik'
import * as Yup from 'yup'
// 
import { LogoutButton } from "./ui"

import "./EditModal.css";

export const EditModal = ({ closeModal, defaultValues, editModalSubmit }) => {
  console.log("EXECUTED: EditModal defaultValues", JSON.stringify(defaultValues, null, 2))
  const [submitStatus, SetSubmitStatus] = useState(false);

  const formikInitialValues = {
    "name": defaultValues?.name,
    "email": defaultValues?.email,
    "password": defaultValues?.password
  }
  
  function capitalizeWords(str) {
    // Split the string by spaces into an array of words
    var words = str.split(" ");
    // Map over each word and capitalize the first letter
    var capitalizedWords = words.map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    // Join the array of words back into a string with spaces
    return capitalizedWords.join(" ");
  }

  const formikSubmit = async (values) => {
    console.log("EXECUTED: formikSubmit in EditModal component values", values)
    try {
      const newRecordOBJ = { // add _id and format values
        "_id": defaultValues?._id,
        "name": capitalizeWords(values.name),
        "email": values.email.toLowerCase(),
        "password": values.password
      }
      
      await editModalSubmit(newRecordOBJ) // create user in firebase and mongodb
      closeModal(); // close modal
      SetSubmitStatus(false); // to display success message for 6 seconds on submit
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: { ...formikInitialValues },
    validationSchema: 
      Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        email: Yup.string().matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
          , 'Only small caps allowed').email('Invalid email address').required('Required'),
        password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      }),
    onSubmit: async (values) => {
      await formikSubmit(values)   
        // onRegisterCustomer(values); // function input as props to insert in to local records
        // SetSubmitStatus(false); // to display success message for 6 seconds on submit
        setTimeout(()=> SetSubmitStatus(false), 6000);
    }
  });  
  
  return (
    <div
      className="modal-container "
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal(); // close modal if clicked outside of modal
      }}
    >
      <div className="card mt-0" >
        <img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Bank" />
        <div className="card-img-overlay text-white">
          <h1 className="card-title position-relative">EDIT RECORD</h1>
          <LogoutButton />
          <div className="card-text lh-sm">
            <div className="container  text-dark">
              <form className="inputForm" onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3 input-container">
                  <MdOutlinePersonOutline className="icon fa-lg"/>
                  <input className="form-control" id="name" name="name" type="text" placeholder="Name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name ? <p className="text-danger fs-5 error-message">{formik.errors.name}</p>:null}
                  <label htmlFor="name">Name</label>
                </div>
                {/* hide if passowrd changes */}
                {(defaultValues?.password===formik?.values?.password)?(<div className="form-floating mb-3">
                  <HiOutlineMail className="icon fa-lg"/>
                  <input className="form-control" id="email" name="email" type="email" placeholder="Email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? <p className="text-danger fs-5 error-message">{formik.errors.email}</p>:null}
                  <label htmlFor="email">Email</label>
                </div>) : null}
                {/* hide if email changes */}
              {  (defaultValues?.email===formik?.values?.email)?(<div className="form-floating mb-3">
                  <TbPassword className="icon fa-lg"/>
                  <input className="form-control" id="password" name="password" type="password" placeholder="Password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? <p className="text-danger fs-5 error-message">{formik.errors.password}</p>:null}
                  <label htmlFor="password">Password</label>
                </div>) : null}
                <div className="btn-group gap-1 btn-group-vertical btn-group-lg " role="group" aria-label="Login Buttons">
                  <div className="btn-group gap-1 btn-group-lg" role="group" aria-label="Login Buttons">
                    <button  id="submit" type="button"  className="card-link btn btn-secondary mt-auto" disabled={!(formik.isValid && formik.dirty && (formik.values.email!=="admin@admin.com"))} onClick={formik.handleSubmit}>Submit</button>
                    <button  id="reset" type="button" className="card-link btn btn-secondary mt-auto"  onClick={formik.handleReset} disabled={false}>Reset</button>
                  </div>
                  <button id="back" type="button" className="card-link btn btn-secondary mt-auto" onClick={() => closeModal()}>Go Back</button>
                </div>                

              </form>
              {submitStatus ? <pre className="text-warning mt-3 fs-2 h-25 bg-success">{`User Created: ${formik.values.name} : ${formik.values.email} : ${formik.values.password}`}</pre> : null}
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}




