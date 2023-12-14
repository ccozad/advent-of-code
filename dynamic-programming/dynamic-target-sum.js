// Determine if a given number can be formed by adding any number
// of elements in a given array

function canSum(targetSum, numbers, memo = {}) {
    if (targetSum in memo) {
        return memo[targetSum];
    }

    if (targetSum == 0) {
        return true;
    }

    if (targetSum < 0) {
        return false;
    }

    for(let i = 0; i < numbers.length; i++) {
        let remainder = targetSum - numbers[i];
        if (remainder >= 0) {
            if (canSum(remainder, numbers, memo)) {
                memo[targetSum] = true;
                return true;
            }
        }
    }
    
    memo[targetSum] = false;
    return false;
}

function howSum(targetSum, numbers, memo = {}) {
    if (targetSum in memo) {
        return memo[targetSum];
    }

    if (targetSum == 0) {
        return [];
    }

    if (targetSum < 0) {
        return null;
    }

    for(let i = 0; i < numbers.length; i++) {
        let remainder = targetSum - numbers[i];
        if (remainder >= 0) {
            let remainderResult = howSum(remainder, numbers, memo);
            if (remainderResult != null) {
                memo[targetSum] = [...remainderResult, numbers[i]];
                return memo[targetSum];
            }
        }
    }
    
    memo[targetSum] = null;
    return null;
}

console.log(`Can sum 7 from [2, 3]: ${canSum(7, [2, 3])}`);
console.log(`Can sum 7 from [5, 3, 4, 7]: ${canSum(7, [5, 3, 4, 7])}`);
console.log(`Can sum 7 from [2, 4]: ${canSum(7, [2, 4])}`);
console.log(`Can sum 8 from [2, 3, 5]: ${canSum(8, [2, 3, 5])}`);
console.log(`Can sum 300 from [7, 14]: ${canSum(300, [7, 14])}`);

console.log(`How sum 7 from [2, 3]: ${howSum(7, [2, 3])}`);
console.log(`How sum 7 from [5, 3, 4, 7]: ${howSum(7, [5, 3, 4, 7])}`);
console.log(`How sum 7 from [2, 4]: ${howSum(7, [2, 4])}`);
console.log(`How sum 8 from [2, 3, 5]: ${howSum(8, [2, 3, 5])}`);
console.log(`How sum 300 from [7, 14]: ${howSum(300, [7, 14])}`);