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
function twoSum(nums, target) {
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
}

let nums = [3, 2, 4];
let target = 6;

console.log(twoSum(nums, target)); // Output: [1, 2]
