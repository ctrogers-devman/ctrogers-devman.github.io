const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const resultInput = document.getElementById("result");

const populateResult = (textEntry, isValid = true) => {
  const validText = isValid ? "" : "not";
  resultInput.innerText = `${textEntry} is ${validText} a palindrome`;
  resultInput.classList.remove("hidden");
}

const cleanEntry = (str) => {
  const regex = /[^a-zA-Z0-9]/g;
  return str.replace(regex, "").toLowerCase();
}

const reverseEntry = (str) => {
  return str.split('') .reverse() .join('');
}

const validateEntry = () => {
  const cleanText = cleanEntry(textInput.value);
  const reversedText = reverseEntry(cleanText);
  
  return cleanText == reversedText;
}

const handleButtonClick = () => {
  if (textInput.value.length === 0 ) {
    resultInput.classList.add("hidden");
    alert("Please input a value");
    return;
  } else if (textInput.value.length === 1) {
      populateResult(textInput.value);
      return;
  } else if (validateEntry()) {
      populateResult(textInput.value);
  } else {
      populateResult(textInput.value, false);
  }
}

checkButton.addEventListener("click",() => {
  handleButtonClick();
  textInput.value = "";
});

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleButtonClick();
    textInput.value = "";
  }
});
