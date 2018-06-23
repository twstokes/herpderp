// builds a string with random herps and derps
function derpString() {
  const maxLength = 20;
  const randomLength = Math.floor(Math.random() * maxLength) + 1;

  let string = "";
  for (let x = 0; x <= randomLength; x++) {
    string += Math.floor(Math.random() * 2) ? "herp " : "derp ";
  }
  return string;
};

// derps a comment
function derpComment(comment) {
  // preserve the original contents
  comment.derpOriginal = comment.textContent;
  comment.clicked = false;
  // revert to the original when clicked
    comment.onclick = () => {
        comment.textContent = comment.derpOriginal;
        comment.clicked = true;
    };
  // add derped class
  comment.classList.add("derped");
  // Create a derp string for this comment
  comment.derpString = derpString();
  // change the contents
  comment.textContent = comment.derpString;
};

function checkComment(comment) {
  // If everything is fine, return
  if ((comment.clicked && comment.textContent == comment.derpOriginal) ||
      (!comment.clicked && comment.textContent == comment.derpString))
      return;
  // Otherwise, fix the comment. The only case of malformed comment encountered so far is this case:
  // In the case of the new comment being appended after the derp string, just grab it and put it in the derpOriginal variable
  let idx = comment.derpString.length;
  comment.derpOriginal = comment.textContent.substring(idx);
  comment.textContent = comment.textContent.substring(0, idx);
  comment.clicked = false;
}

function init(commentsSection) {
    // selectors for comments
    let selectors = ["#content-text"];
    // build the full selector string
    let derpSelectorString = selectors
          .map(sel => sel + ":not(.derped)")
          .join(", ");
    let checkSelectorString = selectors
        .map(sel => sel + ".derped")
        .join(", ");

    // Watch all the things
    let mutationConfig = {attributes: true, childList: true, subtree: false};

    // Create a MutationObserver
    let observer = new MutationObserver((mutationList) => {
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
    setTimeout((evt) => {
        let commentsSection = document.querySelector("html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch.style-scope.ytd-page-manager.hide-skeleton div#top.style-scope.ytd-watch div#container.style-scope.ytd-watch div#main.style-scope.ytd-watch ytd-comments#comments.style-scope.ytd-watch ytd-item-section-renderer#sections.style-scope.ytd-comments div#contents.style-scope.ytd-item-section-renderer");
        if (commentsSection != null)
            init(commentsSection);
        else
            checkCommentsLoaded();
    }, 1000);
}

checkCommentsLoaded();
