 /***********************************************
     * Global Variables and Game State
     ***********************************************/
    let solution = [];       // Complete solution board (9x9 array)
    let puzzle = [];         // Current puzzle board (9x9 array) with blanks (0)
    let initialPuzzle = [];  // Copy of the initial puzzle state for "Reset Puzzle"
    let timerInterval, startTime;
    // Define, for each difficulty, how many cells to remove (more removal = higher difficulty)
    const difficultyRemoval = {
      easy: 35,
      medium: 45,
      hard: 55,
      extreme: 60
    };
    
    /***********************************************
     * Sudoku Generator using Backtracking
     ***********************************************/
    function generateCompleteSudoku() {
      let board = Array.from({length: 9}, () => Array(9).fill(0));
      if (fillGrid(board)) {
        return board;
      } else {
        console.error("Failed to generate sudoku board.");
        return board;
      }
    }
    
    function fillGrid(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            let numbers = shuffleArray([1,2,3,4,5,6,7,8,9]);
            for (let num of numbers) {
              if (isSafe(board, row, col, num)) {
                board[row][col] = num;
                if (fillGrid(board)) {
                  return true;
                }
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    
    function isSafe(board, row, col, num) {
      // Check row and column conflict.
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }
      // Check the 3x3 subgrid.
      let startRow = row - (row % 3);
      let startCol = col - (col % 3);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[startRow + r][startCol + c] === num) return false;
        }
      }
      return true;
    }
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    /***********************************************
     * Remove Cells to Create Puzzle
     * Create a puzzle by removing an appropriate number of cells
     ***********************************************/
    function removeCells(board, count) {
      let puzzleBoard = board.map(row => row.slice());
      let cellsRemoved = 0;
      while (cellsRemoved < count) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzleBoard[row][col] !== 0) {
          puzzleBoard[row][col] = 0;
          cellsRemoved++;
        }
      }
      return puzzleBoard;
    }
    
    /***********************************************
     * Rendering the Sudoku Grid
     ***********************************************/
    function renderSudoku(grid) {
      let container = document.getElementById("sudoku-container");
      container.innerHTML = "";
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          let cellDiv = document.createElement("div");
          cellDiv.className = "cell row-" + row + " col-" + col;
          cellDiv.dataset.row = row;
          cellDiv.dataset.col = col;
          
          let input = document.createElement("input");
          input.type = "text";
          input.maxLength = "1";
          input.dataset.row = row;
          input.dataset.col = col;
          if (grid[row][col] !== 0) {
            input.value = grid[row][col];
            cellDiv.classList.add("given");
            input.disabled = true;
          } else {
            input.value = "";
          }
          input.oninput = handleCellInput;
          cellDiv.appendChild(input);
          container.appendChild(cellDiv);
        }
      }
    }
    
    /***********************************************
     * Handle Input in a Cell
     ***********************************************/
    function handleCellInput(e) {
      let input = e.target;
      let value = input.value;
      if (!/^[1-9]$/.test(value)) {
        input.value = "";
        return;
      }
      let row = parseInt(input.dataset.row);
      let col = parseInt(input.dataset.col);
      puzzle[row][col] = parseInt(value);
      validateCell(row, col);
      if (checkSudoku()) {
        document.getElementById("message").textContent = "Congratulations! Puzzle solved!";
        clearInterval(timerInterval);
      }
    }
    
    function validateCell(row, col) {
      let currentInput = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
      currentInput.classList.remove("error");
      let cellValue = currentInput.value;
      if (cellValue === "") return;
      let conflict = false;
      // Validate row
      for (let c = 0; c < 9; c++) {
        if (c !== col) {
          let other = document.querySelector(`input[data-row="${row}"][data-col="${c}"]`);
          if (other && other.value === cellValue) conflict = true;
        }
      }
      // Validate column
      for (let r = 0; r < 9; r++) {
        if (r !== row) {
          let other = document.querySelector(`input[data-row="${r}"][data-col="${col}"]`);
          if (other && other.value === cellValue) conflict = true;
        }
      }
      // Validate block
      let startRow = row - (row % 3);
      let startCol = col - (col % 3);
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (r === row && c === col) continue;
          let other = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
          if (other && other.value === cellValue) conflict = true;
        }
      }
      if (conflict) {
        currentInput.classList.add("error");
      }
    }
    
    /***********************************************
     * Timer Functions
     ***********************************************/
    function startTimer() {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
      let now = new Date();
      let diff = Math.floor((now - startTime) / 1000);
      let minutes = Math.floor(diff / 60);
      let seconds = diff % 60;
      document.getElementById("timer").textContent = "Time: " +
          (minutes < 10 ? "0" + minutes : minutes) + ":" +
          (seconds < 10 ? "0" + seconds : seconds);
    }
    
    /***********************************************
     * Check if the Sudoku Puzzle is Solved
     ***********************************************/
    function checkSudoku() {
      for (let row = 0; row < 9; row++) {
        let seen = new Set();
        for (let col = 0; col < 9; col++) {
          let val = puzzle[row][col];
          if (val === 0) return false;
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
      for (let col = 0; col < 9; col++) {
        let seen = new Set();
        for (let row = 0; row < 9; row++) {
          let val = puzzle[row][col];
          if (val === 0) return false;
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
      for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
          let seen = new Set();
          for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
            for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
              let val = puzzle[row][col];
              if (val === 0) return false;
              if (seen.has(val)) return false;
              seen.add(val);
            }
          }
        }
      }
      return true;
    }
    
    /***********************************************
     * New Game and Reset Functions
     ***********************************************/
    function newGame() {
      clearInterval(timerInterval);
      let difficulty = document.getElementById("difficulty").value;
      let removeCount = difficultyRemoval[difficulty];
      solution = generateCompleteSudoku();
      puzzle = removeCells(solution, removeCount);
      initialPuzzle = puzzle.map(row => row.slice());
      renderSudoku(puzzle);
      startTimer();
      document.getElementById("message").textContent = "";
    }
    
    function resetPuzzle() {
      puzzle = initialPuzzle.map(row => row.slice());
      renderSudoku(puzzle);
      document.getElementById("message").textContent = "Puzzle has been reset.";
    }
    
    /***********************************************
     * Event Listeners for UI Buttons and Help Modal
     ***********************************************/
    document.getElementById("newGameBtn").onclick = newGame;
    document.getElementById("resetBtn").onclick = resetPuzzle;
    document.getElementById("helpBtn").onclick = function() {
      document.getElementById("helpModal").style.display = "block";
    };
    document.getElementById("closeHelp").onclick = function() {
      document.getElementById("helpModal").style.display = "none";
    };
    window.onclick = function(e) {
      if (e.target === document.getElementById("helpModal")) {
        document.getElementById("helpModal").style.display = "none";
      }
    };
    
    /***********************************************
     * Initialize Game on Page Load
     ***********************************************/
    newGame();
