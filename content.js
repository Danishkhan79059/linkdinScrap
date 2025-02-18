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
    "div.inline-show-more-text--is-collapsed[style*='-webkit-line-clamp:2']"
  );

  // Scrape the Description
  const descriptionElement = document.querySelector(
    "div.display-flex.full-width div.full-width.t-14.t-normal.t-black.display-flex.align-items-center span[aria-hidden='true']"
  );

  // Scrape the Profile Image URL
  const imageElement = document.querySelector(
    "div.pv-top-card__non-self-photo-wrapper img"
  );

  // Scrape the Detail
  const detailElement = document.querySelector(
    "div.text-body-medium.break-words[data-generated-suggestion-target]"
  );

  // Scrape Contact Title
  const contactTitle = document.querySelector(
    "div.text-body-medium.break-words[data-generated-suggestion-target]"
  );

  // Scrape the first company URL anchor
  const firstAnchor = document.querySelector(
    'a[data-field="experience_company_logo"]'
  );

  // NEW: Scrape data from Apollo-like element
  const apolloNameElement = document.querySelector(
    "div.zp_d9irS.EditTarget span"
  );

  // Extract text or use default placeholders if elements are missing
  const userName = nameElement ? nameElement.innerText : "No name found";
  const apolloUserName = apolloNameElement
    ? apolloNameElement.innerText
    : "No Apollo name found";
  const firstAnchorurl = firstAnchor ? firstAnchor.href : "No URL found";
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
  const contactdetails = contactTitle
    ? contactTitle.innerText
    : "No contact details found";

  // Log the scraped data in the console
  console.log("User's Name:", userName);
  console.log("Apollo User's Name:", apolloUserName); // New data log
  console.log("Location:", location);
  console.log("Company Name:", company);
  console.log("Description:", description);
  console.log("Profile Image URL:", profileImageUrl);
  console.log("Detail:", detail);
  console.log("Contact Title:", contactdetails);
  console.log("Company URL:", firstAnchorurl);

  // Return all collected data
  return {
    userName,
    apolloUserName, // Include Apollo data in the returned object
    location,
    company,
    description,
    profileImageUrl,
    detail,
    contactdetails,
    firstAnchorurl,
  };
}

// Listening for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserName") {
    const {
      userName,
      apolloUserName, // Include Apollo data in the response
      location,
      company,
      description,
      profileImageUrl,
      detail,
      contactdetails,
      firstAnchorurl,
    } = scrapeLinkedInDetails();

    // Send all collected data back in the response
    sendResponse({
      userName,
      apolloUserName, // Send Apollo name back to the extension
      location,
      company,
      description,
      profileImageUrl,
      detail,
      contactdetails,
      firstAnchorurl,
    });
  }
});
