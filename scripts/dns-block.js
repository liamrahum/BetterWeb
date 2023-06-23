const blockedWebsites = [
  'example.com',
  'blockedwebsite.com',
];

// Function to block and redirect websites
function blockAndRedirect(requestDetails) {
  console.log("Something");
   const url = new URL(requestDetails.url);
  const hostname = url.hostname;

  // Check if the requested website is in the blocked list
  if (blockedWebsites.includes(hostname)) {
    // Redirect the user to a different webpage
    return { redirectUrl: 'https://example.com/blocked.html' };
  }

  // Allow the request to proceed
  return { cancel: false };
}

chrome.webRequest.onBeforeRequest.addListener(
  blockAndRedirect,
  { urls: ['<all_urls>'] },
  ['blocking']
);

