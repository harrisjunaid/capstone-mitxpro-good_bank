/**
 * PATCH request to update the data in the database.
 * @param {*} newUserOBJ 
 * @returns 
 */
export const nodeUpdate = async (newUserOBJ) => {
  console.log('EXECUTED: nodeUpdate.js')
  if (!newUserOBJ) {console.log("no Params found"); return; }
  const id = String(newUserOBJ._id);
  const { _id, ...rest } = newUserOBJ;
  console.log('nodeUpdate newUserOBJ input',newUserOBJ);

  console.log('nodeUpdate id from newUserOBJ to PATCH id',id);
  // This will send a post request to update the data in the database.
  await fetch(`http://localhost:5050/record/${id}`, {
    method: "PATCH",
    body: JSON.stringify(rest),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

