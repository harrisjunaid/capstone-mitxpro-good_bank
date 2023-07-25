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
// ui 
import { LogoutButton } from "./ui"

export const InputForm = ({userRegisterSubmit}) => {
  // const { userRegisterSubmit } = useContext(BankContext);
  const [submitStatus, SetSubmitStatus] = useState(false);
  
  const initialData = {
    "name": "",
    "email": "",
    "password": "",
    "balance": 0
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
    const { name, email, password } = values;
    const newUser = { name: capitalizeWords(name) , email: email.toLowerCase(), password, balance: 0 };
    try {
      const resultUserRegisterSubmit = await userRegisterSubmit(newUser) // create user in firebase and localhost  
      SetSubmitStatus(resultUserRegisterSubmit)    
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: { ...initialData },
    validationSchema: Yup.object({
      name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      email: Yup.string().matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

, 'Only small caps allowed').email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    }),
    onSubmit:(values) => {
      formikSubmit(values)   
        setTimeout(()=> SetSubmitStatus(false), 6000);
    }
  });
  
  return (
    <div className="container mx-auto font-thin mt-2">
      <div className="card mt-" >
        <img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Bank" />
        <div className="card-img-overlay text-white">
          <h1 className="card-title position-relative">REGISTER WITH GOOD BANK</h1>
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
                <div className="form-floating mb-3">
                  <HiOutlineMail className="icon fa-lg"/>
                  <input className="form-control" id="email" name="email" type="email" placeholder="Email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? <p className="text-danger fs-5 error-message">{formik.errors.email}</p>:null}
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <TbPassword className="icon fa-lg"/>
                  <input className="form-control" id="password" name="password" type="password" placeholder="Password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? <p className="text-danger fs-5 error-message">{formik.errors.password}</p>:null}
                  <label htmlFor="password">Password</label>
                </div>
                <div className="btn-group gap-1 btn-group-lg" role="group" aria-label="Login Buttons">
                  <button  id="submit" type="button"  className="card-link btn btn-secondary mt-auto" disabled={!(formik.isValid && formik.dirty && (formik.values.email!=="admin@admin.com"))} onClick={formik.handleSubmit}>Submit</button>
                  <button  id="reset" type="button" className="card-link btn btn-secondary mt-auto"  onClick={formik.handleReset} disabled={false}>Reset</button>
                </div>
              </form>
              {submitStatus ? <pre className="text-warning mt-3 fs-2 h-25 bg-success">{`User Created: ${formik.values.name} : ${formik.values.email} : ${formik.values.password}`}</pre>:null}
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}




