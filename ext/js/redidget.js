// Function to copy formatted ID of the RedDot page to the clipboard.
function copyFormattedID() {
  const idResult = getRedID(getFirstComment(document.head));

  // Check if the ID was successfully retrieved.
  if (idResult.length === 0) {
    // Retrieve alert setting from storage and alert if not a RedDot page.
    chrome.storage.sync.get({ redAlert: true }, function (items) {
      if (items.redAlert) alert("Not a RedDot Page!");
    });
    return;
  }

  // Check user's preference for copying method.
  chrome.storage.sync.get({ verboseCopying: false }, function (items) {
    if (items.verboseCopying) {
      // Show a prompt for manual copying if verbose copying is enabled.
      prompt("Copy to clipboard: Ctrl+C, Enter", idResult);
    } else {
      // Automatically copy the ID to the clipboard if verbose copying is disabled.
      copyToClipboard(idResult);
    }
  });
}

// Copies a given text to the clipboard.
function copyToClipboard(text) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

// Retrieves the first HTML comment within the specified root element.
function getFirstComment(rootElem) {
  let comment = "";
  const iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
  const curNode = iterator.nextNode();
  if (curNode) comment = curNode.nodeValue;
  return comment;
}

// Filter callback for NodeIterator.
function filterNone() {
  return NodeFilter.FILTER_ACCEPT;
}

// Extracts the RedDot page ID from the provided comment string.
function getRedID(firstComment) {
  if (firstComment.length === 0) {
    console.log("Could not find a comment in head, may not be a RedDot page.");
    return "";
  }

  const idStart = firstComment.indexOf("PageID");
  const idEnd = firstComment.indexOf("-", idStart);

  if (idStart === -1 || idEnd === -1) {
    console.log("Could not find a RedDot comment, may not be a RedDot page.");
    return "";
  }

  // Extract and return the formatted ID string.
  return "ID: " + firstComment.substring(idStart + 7, idEnd).trim();
}

// Initialize the process when the script is loaded.
copyFormattedID();
