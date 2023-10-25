// Set 'maxSum' to first array element
// Set 'sum' to 0
// Loop over every element in array
//  If 'sum' is negative
//    reset 'sum' to zero
//  Add the current number onto sum
//  If 'maxSum' is less than 'sum'
//    'maxSum' equals 'sum'
// Return 'maxSum'

function maxSubArray(nums) {
  let sum = 0;
  let maxSum = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (sum < 0) {
      sum = 0;
    }

    sum += nums[i];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum;
}

console.log(maxSubArray([5, 4, -1, 7, 8]));
