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
  if (typeof dollars !== "number") {
    return "Error: not a number";
  }

  const dollarsRounded = dollars.toFixed(2);
  if (dollarsRounded > dollarLimit) {
    return "Error: dollar amount is too large (limit is $100)";
  }
  if (dollarsRounded < 0) {
    return "Error: dollar amount must be positive";
  }

  let convert_dollars_to_cents = dollarsRounded * 100;
  const dollar_coins = Math.trunc(convert_dollars_to_cents / 100);
  convert_dollars_to_cents = convert_dollars_to_cents % 100;

  const num_quarters = Math.trunc(convert_dollars_to_cents / 25);
  convert_dollars_to_cents = convert_dollars_to_cents % 25;

  const num_dimes = Math.trunc(convert_dollars_to_cents / 10);
  convert_dollars_to_cents = convert_dollars_to_cents % 10;

  const num_nickels = Math.trunc(convert_dollars_to_cents / 5);
  convert_dollars_to_cents = convert_dollars_to_cents % 5;

  // At this point we are left with the leftover change
  const num_pennies = convert_dollars_to_cents;

  console.log(`Converting ${dollarsRounded} into coins...`);
  return `${dollar_coins} dollars, ${num_quarters} quarters, ${num_dimes} dimes, ${num_nickels} nickels, ${num_pennies} pennies`;
};

// ===== Test Cases =====
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: dollar amount is too large (limit is $100)
console.log(calculateChange("4.62"));
// "4.62" ==> Error: not a number
console.log(calculateChange(-4.62));
// -$4.62 ==> Error: dollar amount must be positive
console.log(calculateChange(4.621));
// $4.621 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(4.625));
// $4.625 ==> 4 dollars, 2 quarters, 1 dime, 3 pennies
