"use strict";
//==================Bankist App================================

//====================Data======================================
const account1 = {
  owner: "Nayeem khan Jim",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "Neamat Khan Mim",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Umme Afsana Afroj",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Tanvir Ahmed Sourav",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//===========================Lectures======================================

//sorting the movements elements

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  //reverse the sorted element for the reverse action
  sorted = !sorted;
});
const displayMovements = function (movements, sort = false) {
  //Emptying the entire container
  containerMovements.innerHTML = "";
  //when the sort button is clicking , this will happen
  // slice using for coping the arrray
  // if not then it will change the original array.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //for each iteration a callback function will be called
  movs.forEach(function (mov, i) {
    //checking with ternary operator
    const type = mov > 0 ? "deposit" : "withdrawal";
    //creating a html row document
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__value">${mov}€</div>
</div>
    `;
    //here including the html which is we create to the movements.
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

//Creating user name=======================

const createUsernames = function (accs) {
  //looping over each elemet
  accs.forEach(function (acc) {
    //creating a object property
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    //we are not creating a new value to return
  });
};
createUsernames(accounts);

////Calculate display balance..................
const calcDisplayBalance = function (account) {
  //work with reduce method for a single value return
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  // account.balance=balance;
  //targeting selecting element
  labelBalance.textContent = `${account.balance} EUR`;
};
// calcDisplayBalance(account1.movements);

//Calculate display summary Input............................
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  //Calculate display summary output..........
  const withdraw = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdraw)}€`;

  //Calculate Display summary interest .................
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);
//Calculate display summary output..........

// const calcDisplaySummaryOut = function (movements) {
//   const withdraw = movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(withdraw)}€`;
// };
// calcDisplaySummaryOut(account1.movements);

//Calculate Display summary interest .................

// const calcDisplayInterestrate = function (movements) {
//   const interest = movements
//     .filter((mov) => mov > 0)
//     .map((mov) => (mov * 1.2) / 100)
//     .filter((int, i, arr) => {
//       return int >= 1;
//     })
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };
// calcDisplayInterestrate(account1.movements);
const updateUi = function (current) {
  //Display movements..............
  displayMovements(current.movements);
  //Display balance................
  calcDisplayBalance(current);
  //Display summary................
  calcDisplaySummary(current);
};

//=============Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //Prevent from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  ); // optional chaining ?    .................
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("login");

    //Display ui/message.............
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    // //Display movements..............
    // displayMovements(currentAccount.movements);
    // //Display balance................
    // calcDisplayBalance(currentAccount);
    // //Display summary................
    // calcDisplaySummary(currentAccount);
    updateUi(currentAccount);
  }
});

//================btn transfer=====================================
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");

  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, reciverAccount);

  if (
    amount > 0 &&
    reciverAccount &&
    currentAccount.balance >= amount &&
    reciverAccount?.username !== currentAccount.username
  ) {
    // Pushing the transfer amount.................
    console.log("Transfer valid");
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(amount);
    //update ui................
    updateUi(currentAccount);
  }
});

//..............close ...account.......
//================================================
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    //delete account ..........
    accounts.splice(index, 1);
    //Hiding th UI......
    containerApp.style.opacity = 0;
  }
});

////============Request a loan of deposit 10%
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }
});
