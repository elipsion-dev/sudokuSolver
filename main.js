//Arrays Setup
let puzzle = new Array(9), columns = new Array(9), cubes = new Array(9), iteration = 0, startTime;
for (let i = 0; i < 9; i += 1) {
    puzzle[i] = new Array(9).fill(0); //Horizontal
    columns[i] = new Array(9).fill(0); //Vertical
    cubes[i] = new Array(9).fill(0); //3X3 Cubes
}
// Function to solve the puzzle
function solveSudoku(puzzle) {
    ++iteration
    for (let i = 0; i < 9; i += 1) {   //Looping through the rows
        for (let j = 0; j < 9; j += 1) {    //Looping through the columns
            if (puzzle[i][j] === 0) {   //If this slot isn't 0
                for (let k = 1; k <= 9; k += 1) {   //Trying 1-9 recursively
                    if (!puzzle[i].includes(k) && !columns[j].includes(k) && !cubes[whichCubeMap[i][j]].includes(k)) {
                        //If no doubles in row/column/cube
                        puzzle[i][j] = k;   //update rows array
                        columns[j][i] = k;  //update columns array
                        let cube = whichCubeMap[i][j]; //use map to find which cube
                        let index = whichIndexMap[i][j]; //use map to find correct index in cube array
                        cubes[cube][index] = k; //update cubes array
                        if (solveSudoku(puzzle)) {//try to solve with new data
                            return true;
                        }
                        // Change slot back to 0 so line 13 will let the function back in to increment
                        puzzle[i][j] = 0; //change row array back 
                        columns[j][i] = 0; //change column array back
                        cubes[cube][index] = 0; //change cube array back
                    }
                }
                return false;
            }
        }
    }
    let endTime = (window.performance.now() - startTime).toFixed(2);
    console.log('Total Time: ' + endTime + 'ms');
    console.log('Function Calls: ' + iteration);
    $('#info').css({visibility:'visible'});
    $('#time').text(endTime + 'ms');
    $('#fnCalls').text(iteration);
    return true;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//End of Puzzle Logic - Begin UI Functions
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Function to update the arrays if user puts 1-9 into any input box on screen
$('.square').on('input', function (e) {
    let val = $(this).val() * 1;
    if (val > 0 && val < 10) {
        let location = e.target.id[1] + e.target.id[2];
        puzzle[location[0] * 1][location[1] * 1] = $(this).val() * 1;
        columns[location[1] * 1][location[0] * 1] = $(this).val() * 1;
        cubes[whichCubeMap[location[0] * 1][location[1] * 1]][whichIndexMap[location[0] * 1][location[1] * 1]] = $(this).val() * 1;
    } else $(this).val('');
})
// Reset button
$('#reset').on('click', function () {
    let newPuzzle = new Array(9), newColumns = new Array(9), newCubes = new Array(9);
    for (let i = 0; i < 9; i += 1) {
        newPuzzle[i] = new Array(9).fill(0); //Reset array for rows
        newColumns[i] = new Array(9).fill(0); //Reset array for columns
        newCubes[i] = new Array(9).fill(0); //Reset array for cubes
    }
    puzzle = newPuzzle;
    columns = newColumns;
    cubes = newCubes;
    $('.square').val('');
    $('#info').css({visibility:'hidden'});
    $('#time').text('');
    $('#fnCalls').text('');
})
// Solve button
$('#solve').on('click', function () {
    startTime = window.performance.now();
    iteration = 0;
    solveSudoku(puzzle);
    update();
})
// Function to loop through puzzle array to update the HTML, column array, & cube array
function update() {
    $('.square').val('')
    for (var i = 0; i < 9; i += 1) {
        for (var j = 0; j < 9; j += 1) {
            if (puzzle[i][j] !== 0) {
                $(`#a${i}${j}`).val(puzzle[i][j])
            }
            columns[i][j] = puzzle[j][i]
            cubes[whichCubeMap[i][j]][whichIndexMap[i][j]] = puzzle[i][j]
        }
    }
}
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//Pre-Programmed Puzzles
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$('#puzzle1').on('click', function () {
    puzzle = [
        [0, 0, 6, 4, 3, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [4, 0, 0, 0, 0, 1, 2, 5, 0],
        [0, 6, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 0, 7, 0, 0, 5],
        [1, 9, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 5, 7, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 9, 0],
        [2, 0, 0, 0, 0, 0, 7, 0, 0]
    ];
    update()
})
$('#puzzle2').on('click', function () {
    puzzle = [
        [0, 0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 7, 3, 0, 0, 0, 0, 0],
        [0, 5, 8, 0, 0, 0, 0, 0, 0],
        [4, 3, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 0, 0, 7, 6],
        [0, 0, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 7, 3, 0, 0],
        [0, 0, 0, 0, 9, 8, 0, 0, 0]
    ];
    update()
})
$('#puzzle3').on('click', function () {
    puzzle = [
        [0, 0, 0, 0, 0, 0, 7, 6, 0],
        [3, 0, 0, 0, 4, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 1, 0, 3, 9],
        [0, 0, 5, 0, 0, 3, 0, 8, 0],
        [9, 3, 0, 0, 0, 0, 0, 7, 5],
        [0, 7, 0, 6, 0, 0, 9, 0, 0],
        [6, 9, 0, 7, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 2],
        [0, 5, 3, 0, 0, 0, 0, 0, 0]
    ];
    update()
})
$('#puzzle4').on('click', function () {
    puzzle = [
        [0, 8, 0, 0, 0, 0, 0, 5, 0],
        [9, 3, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 4, 3, 1, 0, 0, 9],
        [0, 0, 1, 0, 0, 0, 0, 4, 0],
        [5, 2, 0, 0, 0, 0, 0, 9, 7],
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [2, 0, 0, 6, 9, 8, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 1, 5],
        [0, 4, 0, 0, 0, 0, 0, 6, 0]
    ];
    update()
})
$('#puzzle5').on('click', function () {
    puzzle = [
        [0, 0, 2, 0, 0, 6, 0, 0, 0],
        [0, 7, 5, 0, 4, 0, 0, 0, 8],
        [0, 3, 0, 9, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 4, 2, 9, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 7],
        [0, 9, 3, 2, 0, 0, 0, 0, 5],
        [0, 0, 0, 0, 0, 1, 0, 4, 0],
        [1, 0, 0, 0, 2, 0, 7, 5, 0],
        [0, 0, 0, 8, 0, 0, 6, 0, 0]
    ];
    update()
})
$('#puzzle6').on('click', function () {
    puzzle = [
        [0, 2, 0, 3, 9, 0, 0, 0, 0],
        [7, 0, 3, 0, 0, 6, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 4, 8, 1, 3, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 6],
        [0, 7, 2, 9, 6, 0, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 6, 0, 0, 2, 0, 5],
        [0, 0, 0, 0, 1, 9, 0, 7, 0]
    ];
    update()
})
$('#puzzle7').on('click', function () {
    puzzle = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0]
    ];
    update()
})
$('#puzzle8').on('click', function () {
    puzzle = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 8, 5],
        [0, 0, 1, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 7, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 1, 0, 0],
        [0, 9, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 7, 3],
        [0, 0, 2, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 9]
    ];
    update()
})
let whichCubeMap = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8]
]
let whichIndexMap = [
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [3, 4, 5, 3, 4, 5, 3, 4, 5],
    [6, 7, 8, 6, 7, 8, 6, 7, 8],
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [3, 4, 5, 3, 4, 5, 3, 4, 5],
    [6, 7, 8, 6, 7, 8, 6, 7, 8],
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [3, 4, 5, 3, 4, 5, 3, 4, 5],
    [6, 7, 8, 6, 7, 8, 6, 7, 8]
]