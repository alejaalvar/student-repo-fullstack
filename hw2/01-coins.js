/** Exercise 01 - Coins **/

const calculateChange = function calculateChangeNeededGivenDollars(dollars) {
  const dollarLimit = 100;

  // Input validation
  if (typeof dollars !== "number") {
    return "Error: not a number";
  }
  if (dollars > dollarLimit) {
    return "Error: dollar amount is too large (limit is $100)";
  }
  if (dollars < 0) {
    return "Error: dollar amount must be positive";
  }

  return `Received ${dollars} dollars`;
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
