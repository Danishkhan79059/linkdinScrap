document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    if (currentTab.url.includes("")) {
      chrome.tabs.sendMessage(
        currentTab.id,
        { action: "getUserName" },
        (response) => {
          const userName = response?.userName || "No name found";
          const company = response?.company || "No company found";
          const location = response?.location || "No location found";
          const description = response?.description || "No description";
          const detail = response?.detail || "No detail found";
          const contactdetails = response?.contactdetails || "no title found";
          const firstAnchorurl = response?.firstAnchorurl || "no url found";
          const profileImageUrl = response?.profileImageUrl || "No image URL";

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
          document.getElementById("detail").textContent = `Detail: ${detail}`;
          document.getElementById(
            "contactdetails"
          ).textContent = `Contact Title: ${contactdetails}`;
          document.getElementById(
            "imageUrl"
          ).textContent = `ImageURL: ${profileImageUrl}`;
          document.getElementById(
            "companyurl"
          ).textContent = `ComapnyUrl : ${firstAnchorurl}`;

          // Submit to ChatGPT with detailed business note instruction
          document
            .getElementById("submitToChatGPTBtn")
            .addEventListener("click", () => {
              const contactNumber =
                document.getElementById("contact-number").value;
              const promptText = `
              Write a concise and professional business introduction based on the following details:
              Name: ${userName}
              Company: ${company}
              Location: ${location}
              Role/Description: ${description}
              Additional Details: ${detail}
              Contact Title: ${contactdetails}

              Create a polished summary in 3-4 sentences that captures ${userName}'s professional background, key contributions at ${company}, and any notable skills or achievements. Ensure it is suitable for a LinkedIn bio or business profile.
            `;

              const chatGptUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(
                promptText
              )}`;
              const localHostUrl = `http://localhost:3000/dash/calls/new/?contactNumber=${encodeURIComponent(
                contactNumber
              )}&contactCompany=${encodeURIComponent(
                company
              )}&contactName=${encodeURIComponent(
                userName
              )}&contactTitle=${encodeURIComponent(contactdetails)}`;

              // Retrieve stored tab IDs from chrome storage
              chrome.storage.local.get(
                ["chatGptTabId", "localHostTabId"],
                (data) => {
                  const { chatGptTabId, localHostTabId } = data;

                  // Function to open or update ChatGPT Tab
                  function handleChatGptTab() {
                    if (chatGptTabId) {
                      chrome.tabs.get(chatGptTabId, (tab) => {
                        if (chrome.runtime.lastError || !tab) {
                          // Tab doesn't exist, open a new one
                          openNewChatGptTab();
                        } else {
                          // Update existing tab
                          chrome.tabs.update(chatGptTabId, {
                            url: chatGptUrl,
                            active: true,
                          });
                        }
                      });
                    } else {
                      openNewChatGptTab();
                    }
                  }

                  // Function to open or update Localhost Tab
                  function handleLocalHostTab() {
                    if (localHostTabId) {
                      chrome.tabs.get(localHostTabId, (tab) => {
                        if (chrome.runtime.lastError || !tab) {
                          // Tab doesn't exist, open a new one
                          openNewLocalHostTab();
                        } else {
                          // Update existing tab
                          chrome.tabs.update(localHostTabId, {
                            url: localHostUrl,
                            active: true,
                          });
                        }
                      });
                    } else {
                      openNewLocalHostTab();
                    }
                  }

                  // Open new ChatGPT tab and store its ID
                  function openNewChatGptTab() {
                    chrome.tabs.create({ url: chatGptUrl }, (newTab) => {
                      chrome.storage.local.set({ chatGptTabId: newTab.id });
                    });
                  }

                  // Open new Localhost tab and store its ID
                  function openNewLocalHostTab() {
                    chrome.tabs.create({ url: localHostUrl }, (newTab) => {
                      chrome.storage.local.set({ localHostTabId: newTab.id });
                    });
                  }

                  // Handle both tabs
                  handleChatGptTab();
                  handleLocalHostTab();
                }
              );
            });
        }
      );
    } else {
      document.getElementById("user-name").textContent = "Not a username";
      document.getElementById("company-name").textContent = "No company name";
      document.getElementById("location").textContent = "No location";
      document.getElementById("description").textContent = "No description";
      document.getElementById("detail").textContent = "No details";
      document.getElementById("contactdetails").textContent =
        "No companydetails";
      document.getElementById("companyurl").textContent = "No companyurl";
      document.getElementById("imageUrl").textContent = "No image URL";
    }
  });
});
