export const nodeReadAll = async () => {
  console.log('EXECUTED: nodeReadAll()')
  const connectTo = process.env.CONNECT_TO || 'localhost'
  console.log('connectTo👩‍💻', connectTo, typeof(connectTo), process.env.CONNECT_TO)

  try {
    const response = await fetch(`http://159.89.47.38:5051/record`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allData = await response.json();
    // console.log(allData);  
    // Check if the response is ok
    if (!allData) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return allData; // parses JSON response into native JavaScript objects
  } catch (error) { // catches both fetch and network errors
    console.error(error);
    window.alert(error.message);
  }
}