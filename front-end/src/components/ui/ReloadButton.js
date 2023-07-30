import React, {useContext} from "react";
// app context
import { BankContext } from "../../assets/context/BankContext"

export const ReloadButton = () => {
  const {  dataReloadSubmit } = useContext(BankContext);
  return (
    <>
      <button className="card-link btn btn-secondary mt-auto position-absolute top-0 end-0 "  style={{  border: "2px solid white"}} onClick={()=>{
        dataReloadSubmit();
        }}>Reload</button>
    </>
  );
};