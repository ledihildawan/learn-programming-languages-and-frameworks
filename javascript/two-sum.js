function twoSum(nums, target) {
  const mapDifferenceToIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (mapDifferenceToIndex.has(nums[i])) {
      return [mapDifferenceToIndex.get(nums[i]), i];
    }

    const difference = target - nums[i];

    mapDifferenceToIndex.set(difference, i);
  }
}

console.log(twoSum([1, 2, 4, 9, 5], 13));

function containsDuplicate(arr) {
  const set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      return true;
    }

    set.add(arr[i]);
  }
}

console.log(containsDuplicate([1, 2, 3, 4, 4, 5, 100]));
