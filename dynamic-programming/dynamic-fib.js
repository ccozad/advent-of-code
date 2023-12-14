let n = 40;

let memo = [1, 1];
for(let i = memo.length; i < n; i++) {
    memo.push(memo[i - 1] + memo[i - 2]);
}

console.log(`Fibonacci number ${n}: ${memo[n - 1]}`);
console.log("Fibonacci sequence:")
console.log(memo);