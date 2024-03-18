let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

/*
let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];
*/

const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const priceVessel = document.getElementById("price-vessel");
const drawerAmounts = document.getElementById("drawer-amounts");
const changeDue = document.getElementById("change-due");

priceVessel.innerHTML = `Total: $${price.toFixed(2)}`;

const refreshChangeDue = (result) => {
  let changeDueList = `<p>Status: ${result.status}`;
  for (let i = 0; i < result.change.length; i++) {
    changeDueList += ` ${result.change[i][0]}: $${result.change[i][1]}`;

    cid.slice().some((arr, ind) => {
      const isTrue = arr[0] === result.change[i][0];
       if (isTrue) {
         cid[ind][1] -= result.change[i][1];
       };
       return isTrue;
    });
  }
  changeDue.innerHTML = `${changeDueList}</p>`;
  changeDue.style.display = "block";
  refreshDrawer();
}

const refreshDrawer = () => {
  const displayList = `
  <p><strong>Change in Drawer:</strong></p>
  <p>Pennies: $${cid[0][1]}</p>
  <p>Nickels: $${cid[1][1]}</p>
  <p>Dimes: $${cid[2][1]}</p>
  <p>Quarters: $${cid[3][1]}</p>
  <p>Ones: $${cid[4][1]}</p>
  <p>Fives: $${cid[5][1]}</p>
  <p>Tens: $${cid[6][1]}</p>
  <p>Twenties: $${cid[7][1]}</p>
  <p>Hundreds: $${cid[8][1]}</p>
  `;
  drawerAmounts.innerHTML = displayList;
};

const totalDrawerCash = (type = "all") => {
  let totalCash = 0;
  let arrLength = cid.length;
  let arrStart = 0;
  if (type === "coins") {
    arrLength = 4;
  } else if (type === "bills") {
    arrLength = 9;
    arrStart = 4 
  }
  for (let i = arrStart; i < arrLength; i++) {
    totalCash += cid[i][1];
  }

  return parseFloat(totalCash);
};

const calcCount = (key, den, dev) => {
  const rawCount = dev > 0 ? den / dev : 0;

  return key > 0 ? Math.floor(rawCount) : Math.round(rawCount);
};

const handleCashEvent = (e) => {
  const cashEntered = parseFloat(cashInput.value);
  let denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let result = { status: 'OPEN', change: [] };
  changeDue.style.display = "none";

  if (!cashEntered) {
    alert("Please enter a cash value.");
  } else if (cashEntered < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashEntered === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    changeDue.style.display = "block";
  } else {
    let cashDiff = cashEntered - price;
    const totalCoins = totalDrawerCash("coins");
    const totalCash = totalDrawerCash();
    const isExactChange = cashDiff === totalCash;

    if ((cashDiff > totalCash) || (cashDiff < 1 && totalCoins < cashDiff)) {
      result.status = "INSUFFICIENT_FUNDS";
    } else {
      // Determine the cash and change
      for (let i = cid.length - 1; i >= 0; i--) {
        if (cid[i][1] > 0 && cashDiff > 0 && cashDiff > denominations[i]) {
          let count = calcCount(i, cashDiff, denominations[i]);
          let tempAmount = count * denominations[i];
          if (count > 0) {
            if (tempAmount <= cid[i][1]) {
              result.change.push([cid[i][0], tempAmount]);
              cashDiff -= tempAmount;
            } else {
              result.change.push([cid[i][0], cid[i][1]]);
              cashDiff -= cid[i][1];
            }
            isExactChange ? result.status = "CLOSED" : false;
          }
        }
      }
    }
    refreshChangeDue(result);
  }
};

purchaseButton.addEventListener("click", handleCashEvent);
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCashEvent();
  }
});

refreshDrawer();
