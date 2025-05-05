/* 

Write a function called countBs that takes a string as its 
only argument and returns a number that indicates how many 
uppercase B characters there are in the string.

*/

function countBs(string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === "B") {
            count++;
        }
    }
    return count;
}
console.log(countBs("BBbbCDEFGHIJKL")); // 2



/* 

write a function called countChar that behaves like countBs,
 except it takes a second argument that indicates the character that is to be counted 
 (rather than counting only uppercase B characters).
*/ 

function countChar(string, char) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === char) {
            count++;
        }
    }
    return count;
}

console.log(countChar("BBbbCDEFGHIJKL", "K")); // 2