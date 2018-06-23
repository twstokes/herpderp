// selectors for comments
const selectors = ["#content-text"];
// build the full selector string
const derpSelectorString = selectors
  .map(sel => sel + ":not(.derped)")
  .join(", ");

// builds a string with random herps and derps
const derpString = () => {
  const maxLength = 20;
  const randomLength = Math.floor(Math.random() * maxLength) + 1;

  let string = "";
  for (let x = 0; x <= randomLength; x++) {
    string += Math.floor(Math.random() * 2) ? "herp " : "derp ";
  }
<<<<<<< HEAD
  return returnString;
}

// derps a comment
var derpComment = function(comment) {
    // indicate that this comment is derped
    comment.derped = true;

    // preserve the original contents
    comment.derpOriginal = comment.textContent;

    // switch between derped and underped when clicked
    comment.onclick = function() {
      // invert derp value
      comment.derped = !comment.derped;

      // change contents to either a new random derp string or the original comment
      comment.textContent = comment.derped ? derpString() : comment.derpOriginal;
    };

    // add derped class
    comment.classList.add('derped');
=======

  return string;
};
>>>>>>> upstream/master

// derps a comment
const derpComment = comment => {
  // preserve the original contents
  comment.derpOriginal = comment.textContent;
  // revert to the original when clicked
  comment.onclick = () => (comment.textContent = comment.derpOriginal);
  // add derped class
  comment.classList.add("derped");
  // change the contents
  comment.textContent = derpString();
};

// every 100 milliseconds, derp any un-derped elements
setInterval(() => {
  document.querySelectorAll(derpSelectorString).forEach(derpComment);
}, 100);
