export const nodeReadUserEmail = async (email) => {
  console.log('EXECUTED: nodeReadUserEmail with input', email)
  let url = `http://localhost:5050/record/${email.email}`;
  try {
    let response = await fetch(url);
    if (response.ok) {     // Check if the response is OK (status code 200)
      let data = await response.json();
      // console.log('nodeReadUserEmail', data)
      return data;
    } else { // Throw an error if the response is not OK
        throw new Error(`Status code: ${response.status}`);
      }
  } catch (error) {     // Handle any errors that may occur
    console.error(error);
  }
}
