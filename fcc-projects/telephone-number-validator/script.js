const resultsDiv = document.getElementById("results-div");
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const matchRegex = /^([1]?[\s]?)((\(\d{3}\))|(\d{3}))[\s-]?\d{3}[\s-]?\d{4}$/i;

const checkBtnClick = (e) => {
  if (userInput.value === "") {
    alert("Please provide a phone number");
  } else if (matchRegex.test(userInput.value)) {
    resultsDiv.innerText = `Valid US number: ${userInput.value}`;
  } else {
    resultsDiv.innerText = `Invalid US number: ${userInput.value}`;
  }
};

const clearBtnClick = (e) => {
  userInput.value = "";
  resultsDiv.innerText = "";
};

checkBtn.addEventListener("click", checkBtnClick);
clearBtn.addEventListener("click", clearBtnClick);