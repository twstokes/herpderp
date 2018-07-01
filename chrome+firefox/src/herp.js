// returns a random int from 1 to max
const randomInt = max => Math.floor(Math.random() * max);

// builds a string with random herps and derps
const derpString = (length = 20) => {
  const randomLength = randomInt(length) + 1;
  const randomDerp = randomInt(2) ? "herp" : "derp";

  return Array.from({ length: randomLength }, () => randomDerp).join(" ");
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
  c.derpString = derpString();
  // change the contents
  c.textContent = c.derpString;
  c.clicked = false;
};

export default derpElement;
