/** Exercise 01 - Fizzbuzz

Problem: 

Given an integer n, return a string array answer (1-indexed) where:

answer[i] === "FizzBuzz" if i is divisible by 3 and 5.
answer[i] === "Fizz" if i is divisible by 3.
answer[i] === "Buzz" if i is divisible by 5.
answer[i] === i (as a string) if none of the above conditions are true.
 

Example 1:

Input: n = 3
Output: ["1","2","Fizz"]

Example 2:

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**/

/**
 * Computes the FizzBuzz array given an integer n
 * and returns it to the caller.
 *
 * @param {number} n - The given number to count to
 * @returns {List[String]} The string array answer
 */
const fb = function fizzBuzz(n) {
  let answer = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      answer.push("FizzBuzz");
    } else if (i % 3 === 0) {
      answer.push("Fizz");
    } else if (i % 5 === 0) {
      answer.push("Buzz");
    } else {
      answer.push(i.toString());
    }
  }
  return answer;
};

// Checking for missing command line arguments or invalid input
if (process.argv[2] === undefined || isNaN(parseInt(process.argv[2]))) {
  console.error("Please provide an integer n as a command line argument.");
  console.error("Usage: node 01-fizzbuzz.js 15");
  process.exit(1);
}

// Checking for non-positive integer input
if (parseInt(process.argv[2]) < 1) {
  console.error("Please provide a positive integer n greater than 0.");
  console.error("Usage: node 01-fizzbuzz.js 15");
  process.exit(1);
}

const n = parseInt(process.argv[2]);
console.log(`FizzBuzz for n=${n}:`);
console.log(fb(n));
