import React from 'react'
// components
import {InputForm} from "../components"

export const CreateAccountPage = ({userRegisterSubmit}) => {
    // const { activeUserEmail} = useContext(BankContext);

    return(
        <InputForm userRegisterSubmit = {userRegisterSubmit}  />
    );
}

