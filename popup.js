document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    if (currentTab.url.includes("")) {
      chrome.tabs.sendMessage(
        currentTab.id,
        { action: "getUserName" },
        (response) => {
          const userName = response?.userName || "No name found";
          const location = response?.location || "No location found";
          const company = response?.company || "No company found";
          const description = response?.description || "No description";
          const profileImageUrl = response?.profileImageUrl || "No image URL";
          const detail = response?.detail || "No detail found";
          const contactdetails = response?.contactdetails || "no tilte found"

          // Display the user's information in the popup
          document.getElementById(
            "user-name"
          ).textContent = `Name: ${userName}`;
          document.getElementById(
            "company-name"
          ).textContent = `Company: ${company}`;
          document.getElementById(
            "location"
          ).textContent = `Location: ${location}`;
          document.getElementById(
            "description"
          ).textContent = `Description: ${description}`;
          document.getElementById(
            "imageUrl"
          ).textContent = `ImageURL: ${profileImageUrl}`;
          document.getElementById("detail").textContent = `Detail: ${detail}`;
          document.getElementById("contactdetails").textContent = `contactTitle: ${contactdetails}`;


          // Submit to ChatGPT with detailed business note instruction
          document
            .getElementById("submitToChatGPTBtn")
            .addEventListener("click", () => {

              const contactNumber = document.getElementById("contact-number").value;
              const promptText = `
                Write a concise and professional business introduction based on the following details. Focus on highlighting key achievements, role, and expertise areas suitable for business networking or client introductions.
  
                Name: ${userName}
                Company: ${company}
                Location: ${location}
                Role/Description: ${description}
                Additional Details: ${detail}
                contactTitle: ${contactdetails}
  
                Create a polished summary in 3-4 sentences that captures ${userName}'s professional background, key contributions at ${company}, and any notable skills or achievements. Ensure it is suitable for a LinkedIn bio or business profile.
              `;

              const chatGptUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(
                promptText
              )}`;

              const localHostUrl = `http://localhost:3000/dash/calls/new/?contactNumber=${encodeURIComponent(contactNumber)}&contactCompany=${encodeURIComponent(
                company
              )}&contactName=${encodeURIComponent(
                userName 
              )}&contactTitle=${encodeURIComponent(
                contactdetails
              )}`;
              chrome.tabs.create({ url: chatGptUrl });
              chrome.tabs.create({ url: localHostUrl });
            });
        }
      );
    } else {
      document.getElementById("user-name").textContent = "Not a LinkedIn page";
      document.getElementById("company-name").textContent = "No company name";
      document.getElementById("location").textContent = "No location";
      document.getElementById("description").textContent = "No description";
      document.getElementById("imageUrl").textContent = "No image URL";
      document.getElementById("detail").textContent = "No details";
      document.getElementById("contactdetails").textContent = "No details";


    }
  });
});
