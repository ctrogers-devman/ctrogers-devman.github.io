const entryNumber = document.getElementById("number");
const resultNumber = document.getElementById("output");
const convertButton = document.getElementById("convert-btn");
const romanKeys = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
const romanValues = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];

const convertNumber = (number) => {
  const len = romanKeys.length;
  let romanNumber = "";
  for (var i = 0; i < len; i++) {
    while (number >= romanKeys[i]) {
      romanNumber += romanValues[i];
      number -= romanKeys[i];
    }
  }
  return romanNumber;
};

const handleButtonClick = () => {
  if (entryNumber.value.length === 0) {
    resultNumber.innerText = "Please enter a valid number";
    return;
  } else if (parseInt(entryNumber.value) < 1) {
    resultNumber.innerText = "Please enter a number greater than or equal to 1";
  } else if (parseInt(entryNumber.value) >= 4000) {
    resultNumber.innerText = "Please enter a number less than or equal to 3999";
  } else {
    resultNumber.innerText = convertNumber(parseInt(entryNumber.value));
    resultNumber.classList.remove("hidden");
  }
};

convertButton.addEventListener("click",() => {
  handleButtonClick();
});

entryNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleButtonClick();
  }
});