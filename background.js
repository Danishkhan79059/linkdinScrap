chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openApollo") {
        chrome.tabs.create({ url: "https://www.apollo.io/", active: true });
    }
});
