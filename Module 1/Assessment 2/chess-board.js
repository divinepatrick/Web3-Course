let size = prompt("How big is your chess", Number());
let grid = "";


for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    // Add space or # to grid based on (i + j) % 2
      if ((i + j) % 2 === 0) {
          grid += " ";
      } else {
          grid += "#";
      }
  }
  // Add newline character to grid
    grid += "\n";
}

console.log(grid);
