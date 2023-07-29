import React, { useEffect } from "react"
//icons
import { HiOutlineMail } from "react-icons/hi"
import { TbPassword } from "react-icons/tb"
// background image
import bankImg from "../assets/img/bank-main.jpg"
// formik
import { useFormik } from 'formik'
import * as Yup from 'yup'
// css
import "./form.css"

import { history } from '../components'

import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios";
import {AiFillGoogleCircle} from "react-icons/ai"


/**
 * LogIn component calls userLogInSubmit() 
 * @param {*} param0 
 * @returns LogIn component
 */
export const LogIn =  ({ changeOption, userLogInSubmit, setGoogleOAuthLogin }) => {
  // const { userLogInSubmit } = useContext(BankContext);

  // inderts values in setGoogleOAuthLogin
  const googleOAuthResult = useGoogleLogin({
    onSuccess: async respose => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            })
            console.log(res.data, typeof(res.data))
            const {name, email} = res.data
            console.log(name, email) 
            setGoogleOAuthLogin({name, email, password: "12345678", balace: 0})
        } catch (err) {
            console.log(err)
        }
    }
});


  const formikInitialValues = { //form initial data
    "name": "",
    "email": ""
  }

  const onSubmitFunction = async (values) => {
    try {
      await userLogInSubmit(values); // returns a promise
      history.push('/');
    } catch(error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: { ...formikInitialValues },
    validationSchema:
      Yup.object({
        email: Yup.string()
          .matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Only small caps allowed')
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .required('Required'),
      }),
    onSubmit: (values) => {
      (onSubmitFunction(values)) 
    }
  });  

  return (
    <div className="container mx-auto font-thin mt-5">
      {/*Bootstrap Card */}
      <div className="card " >
        <img className="card-img"  style={{opacity: 0.85}}  src={bankImg} alt="Bank" />
        <div className="card-img-overlay text-white">
          <h1 className="card-title">LOGIN TO GOOD BANK</h1>
          <div className="card-text lh-sm">
            <div className="container  text-dark">
              {/*input form */}
              <form className="inputForm" onSubmit={formik.handleSubmit}>
                {/* email */}
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
                {/* password */}
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
                {/*buttons */}
                <div className="btn-group gap-1 btn-group-vertical btn-group-lg " role="group" aria-label="Login Buttons">
                  <div className="btn-group gap-1 btn-group-lg" role="group" aria-label="Login Buttons">
                    <button  id="submit" type="button"  className="card-link btn btn-secondary mt-auto" disabled={!(formik.isValid && formik.dirty)} onClick={formik.handleSubmit}>Submit</button>
                    <button  id="reset" type="button" className="card-link btn btn-secondary mt-auto"  onClick={formik.handleReset} disabled={false}>Reset</button>
                  </div>
                  <div className="btn-group gap-1 btn-group-vertical btn-group-lg " role="group" aria-label="Login Buttons">
                  <button id="googleLogin" type="button" className="card-link btn btn-secondary mt-auto" onClick={googleOAuthResult}><AiFillGoogleCircle /> OAuth</button>
                  <button id="register" type="button" className="card-link btn btn-secondary mt-auto" onClick={() => changeOption('register')}>To Register Page</button>
                </div>   
                </div>             
              </form>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}

