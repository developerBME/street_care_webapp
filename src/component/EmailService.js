export const emailConfirmation = async (
  userEmail,
  userName,
  eventName,
  htmlEmailBody
) => {
  const data = {
    userEmail,
    userName,
    eventName,
    htmlEmailBody,
  };

  fetch(
    "https://us-central1-streetcare-d0f33.cloudfunctions.net/sendOutreachEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        console.log(response);
        console.log(response.ok);
        throw new Error("Failed to send confirmation email");
      }
    })
    .then((data) => {
      console.log(data);
      alert("Check your email for confirmation and details.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error signing up for the event.");
      
    });
};
