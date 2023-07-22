export const nodeReadAll = async () => {
  try {
    const response = await fetch("http://localhost:5050/record", {
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