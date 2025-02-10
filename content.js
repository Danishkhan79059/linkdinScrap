function scrapeLinkedInDetails() {
  // Scrape the Name
  const nameElement = document.querySelector(
    "h1.inline.t-24.v-align-middle.break-words"
  );

  // Scrape the Location
  const locationElement = document.querySelector(
    "span.text-body-small.inline.t-black--light.break-words"
  );

  // Scrape the Company Name
  const companyElement = document.querySelector(
    "div.DHiZDVCyDsydROmauXjcJVbzXXNHtXTLOw.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp"
  );

  // Scrape the Description
  const descriptionElement = document.querySelector(
    // "div.BDYWiZkRIOLogHEIDWtAGVILxxGwODFFqFU span[aria-hidden='true']"
    "div.DHiZDVCyDsydROmauXjcJVbzXXNHtXTLOw"
  );

  // Scrape the Profile Image URL
  const imageElement = document.querySelector(
    "div.pv-top-card__non-self-photo-wrapper img"
  );

  // Scrape the Detail
  const detailElement = document.querySelector(
    "div.text-body-medium.break-words[data-generated-suggestion-target]"
  );

  // Scrape the detail element
  const contactTitle = document.querySelector(
    "div.text-body-medium.break-words[data-generated-suggestion-target]"
  );

  // // Check if the element exists and retrieve the text content
  // if (contactTitle) {
  //   const roleText = contactTitle.textContent.trim();
  //   console.log("Extracted Role:", roleText);
  // } else {
  //   console.log("Role not found.");
  // }

  const userName = nameElement ? nameElement.innerText : "No name found";
  const location = locationElement
    ? locationElement.innerText
    : "No location found";
  const company = companyElement
    ? companyElement.innerText
    : "No company found";
  const description = descriptionElement
    ? descriptionElement.innerText
    : "No description found";
  const detail = detailElement ? detailElement.innerText : "No detail found";
  const profileImageUrl = imageElement ? imageElement.src : "No image found";
  const contactdetails = contactTitle ? contactTitle.innerText : "no detail found"
 


  // Log the scraped data in the console
  console.log("User's Name:", userName);
  console.log("Location:", location);
  console.log("Company Name:", company);
  console.log("Description:", description);
  console.log("Profile Image URL:", profileImageUrl);
  console.log("Detail:", detail);
  console.log("contactTile", contactdetails);

  return {
    userName,
    location,
    company,
    description,
    profileImageUrl,
    detail,
    contactdetails
  };
}

// Listening for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserName") {
    const {
      userName,
      location,
      company,
      description,
      profileImageUrl,
      detail,
      contactdetails
    } = scrapeLinkedInDetails();
    // Send all collected data back in the response
    sendResponse({
      userName,
      location,
      company,
      description,
      profileImageUrl,
      detail,
      contactdetails
    });
  }
});
