/*
Instruction: Implement every as a function that takes an array and a predicate function as parameters. 
Write two versions, one using a loop and one using the some method.
*/



function every (array, test) {
    for (let element of array) {
        if (!test(element)) {
            return false;
        } 
    }
    return true;
}
console.log(every([1, 3, 5], n => n < 10));


// using the some methood

function every(array, test) {
  return !array.some(function(element) {
    return !test(element);
  });
}

console.log(every([2, 4, 16], n => n < 10));