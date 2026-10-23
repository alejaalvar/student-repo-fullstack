/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

/**
 * Finds the two indices of a given integer array whose values
 * sum is the given target integer
 *
 * @param {List[int]} nums - the array of integers to search
 * @param {int} target - the target we are solving for
 *
 * @returns {List[int]} The indices array whose sum is the target
 */
const twoSum = function computeTwoSum(nums, target) {
  let res = [];
  let visitedElements = {};

  for (let i = 0; i < nums.length; i++) {
    let currentNum = nums[i];
    let complement = target - currentNum;

    if (visitedElements[complement] !== undefined) {
      res = [visitedElements[complement], i];
      break;
    }

    visitedElements[currentNum] = i;
  }

  return res;
};

// Checking for missing command line arguments
if (process.argv[2] === undefined || process.argv[3] === undefined) {
  console.error(
    "Please provide an array of integers and a target integer as command line arguments.",
  );
  console.error("Usage: node 02-twosum.js '[2,7,11,15]' 9");
  process.exit(1);
}

// Verifying command line arguments are valid JSON and integer
let nums;
try {
  nums = JSON.parse(process.argv[2]);
} catch (error) {
  console.error("Error parsing command line arguments:", error.message);
  process.exit(1);
}

// Check if nums is an array of integers
if (!Array.isArray(nums) || !nums.every(Number.isInteger)) {
  console.error(
    "Error: nums argument must be a JSON array of integers, e.g. '[2,7,11,15]'.",
  );
  process.exit(1);
}

let target = parseInt(process.argv[3]);

// parseInt does not throw an error for invalid input, so we need to check if the result is NaN
if (isNaN(target)) {
  console.error("Error: Target is not a valid integer.");
  process.exit(1);
}

console.log(`Nums: ${nums}`);
console.log(`Target: ${target}`);

console.log(twoSum(nums, target));
