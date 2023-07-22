export const nodeDelete = async (id) => {
  console.log('EXECUTED: nodeDelete() in mongoDelete.js with input', id)
  try {
    const res = await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const resJSON = await res.json();
    // Check if the response is ok
    // if (!resJSON.ok) {
    //   throw new Error(`HTTP error ${resJSON.status}`);
    // }
    return resJSON; // optionally return data from the response body
  } catch (error) { // catches both fetch and network errors
    console.error(error);
    window.alert(error.message);
  }
}