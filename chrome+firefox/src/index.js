import derpElement from "./herp";

const checkComment = commentNode => {
  const c = commentNode;
  // if everything is fine, return
  if (
    (c.clicked && c.textContent === c.derpOriginal) ||
    (!c.clicked && c.textContent === c.derpString)
  )
    return;

  // otherwise, fix the comment
  // the only case of malformed comment encountered so far are these two cases:
  if (c.textContent.indexOf(c.derpString) !== -1) {
    // in the case of the new comment being appended after the derp string,
    // just grab it and put it in the derpOriginal variable
    const idx = c.derpString.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.textContent.substring(0, idx);
    c.clicked = false;
    return;
  }

  if (c.textContent.indexOf(c.derpOriginal) !== -1) {
    // Same issue but the comment was appended after derpOriginal
    const idx = c.derpOriginal.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.derpString;
    c.clicked = false;
  }
};

const init = commentsSection => {
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
    document.querySelectorAll(derpSelectorString).forEach(derpElement);
  });

  observer.observe(commentsSection, mutationConfig);
};

// Check every 1s if comments are loaded or not. Once they are, the timeout stops until the user leaves youtube or reloads the page.
// This needs to be done since comments are added in the DOM through js at an undetermined point through Youtube's execution.
const checkCommentsLoaded = () => {
  setTimeout(() => {
    // This selector is awful, but Youtube re-uses a lot of the DOM (the selector for the comments is re-used across a bunch of pages) so we need the exact path to the comments to match
    const commentsSection = document.querySelector(
      "html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch.style-scope.ytd-page-manager.hide-skeleton div#top.style-scope.ytd-watch div#container.style-scope.ytd-watch div#main.style-scope.ytd-watch ytd-comments#comments.style-scope.ytd-watch ytd-item-section-renderer#sections.style-scope.ytd-comments div#contents.style-scope.ytd-item-section-renderer"
    );
    if (commentsSection != null) init(commentsSection);
    else checkCommentsLoaded();
  }, 1000);
};

checkCommentsLoaded();
