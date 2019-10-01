// returns a random int from 1 to max
const randomInt = max => Math.floor(Math.random() * max);

// builds a string with random herps and derps
const derpString = (length = 20, text) => {
  const randomDerp = () => (randomInt(2) ? "herp" : "derp");
  let derpedLength = text ? text.split(" ").length : randomInt(length) + 1;
  let derpedText = Array.from({ length: derpedLength }, randomDerp).join(" ");

  return derpedText.charAt(0).toUpperCase() + derpedText.slice(1) + ".";
};

// herp derps an element
const derpElement = element => {
  const c = element;
  // preserve the original contents
  c.derpOriginal = c.textContent;
  // swap between the two when clicked
  c.onclick = () => {
    c.clicked = !c.clicked;
    c.textContent = c.clicked ? c.derpOriginal : c.derpString;
  };

  // add derped class
  c.classList.add("derped");
  // create a derp string for this comment
  c.derpString = derpString(20, c.textContent);
  // change the contents
  c.textContent = c.derpString;
  c.clicked = false;
};

export default derpElement;
