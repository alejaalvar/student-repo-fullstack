/** Exercise 01 - Coins **/

/**
 * Accepts a dollar amount up to $100 (inclusive)
 * and converts it to the number of coins needed,
 * silently rounding when necessary. USD currency is
 * assumed.
 *
 * @param {number} dollars - The dollar amount to convert
 * @returns {string} The coins needed as a string
 */
const calculateChange = function calculateChangeNeededGivenDollars(dollars) {
  const dollarLimit = 100;

  // Input validation
  if (typeof dollars !== "number" || Number.isNaN(dollars)) {
    return "Error: not a number";
  }

  if (dollars === 0) {
    return "No change needed";
  }

  const dollarsRounded = dollars.toFixed(2);
  if (dollarsRounded > dollarLimit) {
    return "Error: dollar amount is too large (limit is $100)";
  }
  if (dollarsRounded < 0) {
    return "Error: dollar amount must be positive";
  }

  let convertDollarsToCents = dollarsRounded * 100;
  const dollarCoins = Math.trunc(convertDollarsToCents / 100);
  convertDollarsToCents = convertDollarsToCents % 100;

  const numQuarters = Math.trunc(convertDollarsToCents / 25);
  convertDollarsToCents = convertDollarsToCents % 25;

  const numDimes = Math.trunc(convertDollarsToCents / 10);
  convertDollarsToCents = convertDollarsToCents % 10;

  const numNickels = Math.trunc(convertDollarsToCents / 5);
  convertDollarsToCents = convertDollarsToCents % 5;

  // At this point we are left with the leftover change
  const numPennies = convertDollarsToCents;

  console.log(`Converting $${dollarsRounded} into coins...`);
  return `${dollarCoins} dollars, ${numQuarters} quarters, ${numDimes} dimes, ${numNickels} nickels, ${numPennies} pennies`;
};

// ===== Test Cases =====
console.log(calculateChange(4.62));
console.log("==========");
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
console.log("==========");
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
console.log("==========");
// $150.11 ==> Error: dollar amount is too large (limit is $100)
console.log(calculateChange("4.62"));
console.log("==========");
// "4.62" ==> Error: not a number
console.log(calculateChange(-4.62));
console.log("==========");
// -$4.62 ==> Error: dollar amount must be positive
console.log(calculateChange(4.621));
console.log("==========");
// $4.621 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(4.625));
console.log("==========");
// $4.625 ==> 4 dollars, 2 quarters, 1 dime, 3 pennies
console.log(calculateChange(0));
console.log("==========");
// $0.00 ==> No change needed
console.log(calculateChange(100));
console.log("==========");
// $100 ==> 100 dollars
console.log(calculateChange(NaN));
