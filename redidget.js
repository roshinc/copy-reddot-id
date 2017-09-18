//Get HTML comment method modified from https://stackoverflow.com/questions/16753384/get-text-inside-html-comment-tag

CopyFormattedID();

function filterNone() {
  return NodeFilter.FILTER_ACCEPT;
}

function getFirstComment(rootElem) {
    var comment = ""; // Will hold the first comments found.
    
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    
    var curNode;
    if(curNode = iterator.nextNode())
    	comment = curNode.nodeValue;
    return comment;
  }

  function getRedID(firstComment)
  {
	// If the comments is empty
	if (firstComment.length == 0)
  {
    console.log("Could not find a comment in head, may not be a RedDot page.")
    return ""
  }
  //Holding varibles 
	var idString = "ID:"; //The formated ID string
  var idStart = firstComment.indexOf("PageID"); // Start of the id substring
  var idEnd = firstComment.indexOf("-"); // End of the id substring
  // Check weather it is a reddot page/ we have the correct comment
  if(idStart == -1)
  {
    console.log("Could not find a RedDot comment, may not be a reddot page.")
  	return ""
  }
  //Add the id number to the ID string
  idString = idString.concat(firstComment.substring(idStart + 7, idEnd - 1));
  
  return idString;
}

function CopyFormattedID() {
	//prompt("Copy to clipboard: Ctrl+C, Enter", getRedID(getFirstComment(document.head)));
  idResult = getRedID(getFirstComment(document.head));
  if (idResult.length == 0)
    return
  //Copy direct to clipboard method from 
  //https://stackoverflow.com/questions/33855641/copy-output-of-javascript-variable-to-clipboard
  var dummy = document.createElement("input");
    // Add it to the document
    document.body.appendChild(dummy);
    // Set its ID
    dummy.setAttribute("id", "dummy_id");
    // Output the array into it  
    document.getElementById("dummy_id").value = idResult;  
    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");
    // Remove it as its not needed anymore
    document.body.removeChild(dummy);
  }
