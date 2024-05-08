import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

// Define your custom headers
const headers = {
  mode: "no-cors",
};

const logEvent = async (tag, message) => {
  try {
    const addLogEntry = httpsCallable(functions, "addLogEntry", { headers });
    await addLogEntry({ tag, message });
    console.log("Event logged successfully");
  } catch (error) {
    console.error("Error logging event:", error);
  }
};

export default logEvent;
