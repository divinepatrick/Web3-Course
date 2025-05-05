function isEven(value) {
    if (value === 0) {
        return true;
    } else if (value === 1) {
        return false;
    } else if (value > 1) {
        return isEven(value - 2)
    } else 
    return "Your Input should be a Positive whole number"
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → Your Input should be a Positive whole number
