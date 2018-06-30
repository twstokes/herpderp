// builds a string with random herps and derps
function derpString() {
  const maxLength = 20;
  const randomLength = Math.floor(Math.random() * maxLength) + 1;

  let string = "";
  for (let x = 0; x <= randomLength; x++) {
    string += Math.floor(Math.random() * 2) ? "herp " : "derp ";
  }
  return string;
}

// derps a comment
function derpComment(commentNode) {
  const comment = commentNode;
  // preserve the original contents
  comment.derpOriginal = comment.textContent;
  // Swap between the two when clicked
  comment.onclick = () => {
    comment.clicked = !comment.clicked;
    comment.textContent = comment.clicked
      ? comment.derpOriginal
      : comment.derpString;
  };
  // add derped class
  comment.classList.add("derped");
  // Create a derp string for this comment
  comment.derpString = derpString();
  // change the contents
  comment.textContent = comment.derpString;
  comment.clicked = false;
}

function checkComment(commentNode) {
  const comment = commentNode;
  // If everything is fine, return
  if (
    (comment.clicked && comment.textContent === comment.derpOriginal) ||
    (!comment.clicked && comment.textContent === comment.derpString)
  )
    return;
  // Otherwise, fix the comment. The only case of malformed comment encountered so far are these two cases:
  if (comment.textContent.indexOf(comment.derpString) !== -1) {
    // In the case of the new comment being appended after the derp string, just grab it and put it in the derpOriginal variable
    const idx = comment.derpString.length;
    comment.derpOriginal = comment.textContent.substring(idx);
    comment.textContent = comment.textContent.substring(0, idx);
    comment.clicked = false;
    return;
  }

  if (comment.textContent.indexOf(comment.derpOriginal) !== -1) {
    // Same issue but the comment was appended after derpOriginal
    const idx = comment.derpOriginal.length;
    comment.derpOriginal = comment.textContent.substring(idx);
    comment.textContent = comment.derpString;
    comment.clicked = false;
  }
}

function init(commentsSection) {
  // selectors for comments
  const selectors = ["#content-text"];
  // build the full selector string
  const derpSelectorString = selectors
    .map(sel => `${sel}:not(.derped)`)
    .join(", ");
  const checkSelectorString = selectors.map(sel => `${sel}.derped`).join(", ");

  // Only watch for child list changes, as we're watching the comments container
  const mutationConfig = { attributes: false, childList: true, subtree: true };

  // Create a MutationObserver
  // This object will monitor the comments for DOM changes
  const observer = new MutationObserver(() => {
    // Check that everything's fine with the already derped comments
    // This is necessary because youtube does a lot of wizardry with comments in-between videos
    document.querySelectorAll(checkSelectorString).forEach(checkComment);
    // Derp all un-derped comments
    document.querySelectorAll(derpSelectorString).forEach(derpComment);
  });

  observer.observe(commentsSection, mutationConfig);
}

// Check every 1s if comments are loaded or not. Once they are, the timeout stops until the user leaves youtube or reloads the page.
// This needs to be done since comments are added in the DOM through js at an undetermined point through Youtube's execution.
function checkCommentsLoaded() {
  setTimeout(() => {
    // This selector is awful, but Youtube re-uses a lot of the DOM (the selector for the comments is re-used across a bunch of pages) so we need the exact path to the comments to match
    const commentsSection = document.querySelector(
      "html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch.style-scope.ytd-page-manager.hide-skeleton div#top.style-scope.ytd-watch div#container.style-scope.ytd-watch div#main.style-scope.ytd-watch ytd-comments#comments.style-scope.ytd-watch ytd-item-section-renderer#sections.style-scope.ytd-comments div#contents.style-scope.ytd-item-section-renderer"
    );
    if (commentsSection != null) init(commentsSection);
    else checkCommentsLoaded();
  }, 1000);
}

checkCommentsLoaded();
