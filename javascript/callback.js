const arr = [1, 2, 3, 4, 5]

function forEach(nums, callback) {
  callback(nums)
}

function dobuled(nums) {
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i] * 2)
  }
}

forEach(arr, dobuled(arr))