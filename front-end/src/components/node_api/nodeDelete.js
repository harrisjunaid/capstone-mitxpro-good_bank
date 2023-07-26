export const nodeDelete = async (id) => {
  const connectTo = process.env.CONNECT_TO || 'localhost'
  console.log('EXECUTED: nodeDelete() in mongoDelete.js with input', id)
  console.log('connectTo👩‍💻', connectTo, typeof(connectTo), process.env.CONNECT_TO)
  try {
    const res = await fetch(`http://159.89.47.38:5051/record/${id}`, {
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