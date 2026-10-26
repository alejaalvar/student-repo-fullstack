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
  const numDollarCoins = Math.trunc(convertDollarsToCents / 100);
  convertDollarsToCents = convertDollarsToCents % 100;

  const numQuarters = Math.trunc(convertDollarsToCents / 25);
  convertDollarsToCents = convertDollarsToCents % 25;

  const numDimes = Math.trunc(convertDollarsToCents / 10);
  convertDollarsToCents = convertDollarsToCents % 10;

  const numNickels = Math.trunc(convertDollarsToCents / 5);
  convertDollarsToCents = convertDollarsToCents % 5;

  // At this point we are left with the leftover change
  const numPennies = convertDollarsToCents;

  // We we will build up our result string and store it here
  let result = `$${dollarsRounded} ==> `;

  // Resolve the plurality for our result string (e.g., 1 penny vs 2 pennies)
  // The intuition: we start with the base of the word, e.g., 'dollar'
  // and then we can check if we have more than one of that coin. If
  // we have only 1, we don't want to add an ending. If we have more
  // than one coin though, we can add the appropriate ending.
  // Credit for this block of logic goes to Danner Snow
  if (numDollarCoins > 0) {
    result += `${numDollarCoins} dollar${numDollarCoins != 1 ? "s" : ""}, `;
  }
  if (numQuarters > 0) {
    result += `${numQuarters} quarter${numQuarters != 1 ? "s" : ""}, `;
  }
  if (numDimes > 0) {
    result += `${numDimes} dime${numDimes != 1 ? "s" : ""}, `;
  }
  if (numNickels > 0) {
    result += `${numNickels} nickel${numNickels != 1 ? "s" : ""}, `;
  }
  if (numPennies > 0) {
    result += `${numPennies} penn${numPennies != 1 ? "ies" : "y"}`;
  }

  // If there are no pennies for a particular case, then
  // it is possible to have a trailing comma and space, so
  // we remove it before returning the result
  result = result.replace(/, $/, "");
  return result;
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
