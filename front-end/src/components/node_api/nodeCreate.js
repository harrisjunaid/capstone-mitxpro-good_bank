
export const nodeCreate = async (name, email, password, balance) => {
  console.log('EXECUTING nodeCreate() to fetch POST')
  try {
    const newData = {
      name, // Use shorthand property names
      email,
      password,
      balance
    }
    console.log('newData', newData)

    const response = await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response; // optionally return data from the response body
  } catch (error) { // catches both fetch and network errors
    console.error(error);
    window.alert(error.message);
  }
}
