// Start in the top left of an m x n grid. If you travel only right or down,
// how many ways are there to get to the bottom right?

function travelGrid (m, n, memo = {}) {
    let key = `${m},${n}`;
    if (key in memo) {
        return memo[key];
    }
    if (m == 1 && n == 1) {
        return 1;
    }
    if (m == 0 || n == 0) {
        return 0;
    }
    memo[key] = travelGrid(m - 1, n, memo) + travelGrid(m, n - 1, memo);
    return memo[key];
}

console.log(`Traveling a 1x1 grid: ${travelGrid(1, 1)}`);
console.log(`Traveling a 2x3 grid: ${travelGrid(2, 3)}`);
console.log(`Traveling a 3x2 grid: ${travelGrid(3, 2)}`);
console.log(`Traveling a 3x2 grid: ${travelGrid(6, 6)}`);
console.log(`Traveling a 18x18 grid: ${travelGrid(18, 18)}`);