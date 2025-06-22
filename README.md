# Sudoku – WEBGAME
#### Author: Bocaletto Luca

[![Made with HTML5](https://img.shields.io/badge/Made%20with-HTML5-E34F26?logo=html5)](https://www.w3.org/html/)
[![Made with CSS3](https://img.shields.io/badge/Made%20with-CSS3-1572B6?logo=css3)](https://www.w3.org/Style/CSS/)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?logo=javascript)](https://developer.mozilla.org/docs/Web/JavaScript)

[![Test Online](https://img.shields.io/badge/Test%20Online-Click%20Here-brightgreen?style=for-the-badge)](https://bocaletto-luca.github.io/Sudoku/)

## Overview

**Sudoku – WEBGAME** is a modern, professional, and fully responsive web game developed in a single-page application. This version faithfully recreates the classic 9x9 Sudoku puzzle with:

- **Complete Game Logic:**  
  Utilizes a backtracking algorithm to generate a complete solution and then removes cells according to the selected difficulty to create a unique, solvable puzzle.
  
- **Real-Time Input Validation:**  
  As players fill in the blank cells, the game immediately highlights any errors (duplicate numbers in a row, column, or 3x3 subgrid).

- **Responsive & Playable UI:**  
  The grid is sizable (630px square) for comfortable play on desktops and scales properly on mobile devices using CSS Grid and media queries.
  
- **Additional Features:**  
  A timer records the gameplay time, and buttons are provided for starting a new game, resetting the current puzzle, and viewing a detailed Help modal. A message area displays feedback during gameplay.
  
- **Modern Design:**  
  The interface employs a modern, minimal look with a sticky header and footer. The footer displays “© 2025 Bocaletto Luca” and remains at the bottom of the page.

## Features

- **Responsive Design:**  
  The Sudoku grid is centered and uses fixed dimensions on larger screens (630px by 630px) and scales gracefully on smaller devices.

- **Puzzle Generation using Backtracking:**  
  A robust algorithm generates a complete solution first then selectively removes cells according to the chosen difficulty (Easy, Medium, Hard, Extreme) to ensure a unique solution.

- **Real-Time Cell Validation:**  
  Cells update live as you type and visually indicate any rule violations by highlighting errors.

- **Timer & Game Controls:**  
  A game timer displays the elapsed time. Users can start a new game, reset the current puzzle, or view help via dedicated buttons.

- **Help Modal:**  
  A detailed help modal explains the rules and instructions so players can quickly familiarize themselves with the game.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bocaletto-luca/Sudoku.git

2. Start Server Example Apache2 and open index.html in web browser.

## Usage
Starting a New Game: Select a difficulty from the dropdown and click "New Game" to generate a new Sudoku puzzle.

Filling the Grid: Click on an empty cell and type a number between 1 and 9 on your keyboard. Pre-filled cells (the “givens”) are locked and cannot be changed.

Validation: The game automatically checks for any rule violations (duplicates in rows, columns, or 3x3 blocks). Cells with errors are highlighted.

Reset Functionality: If you make a mistake, click "Reset Puzzle" to restore the initial state of the current puzzle.

Help: Click the "Help" button to view instructions and rules on how to play the game.

Timer: Your play time is tracked and displayed at the top.

## Contributing
Contributions, bug reports, and feature suggestions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss your ideas.

#### Enjoy Game - By Bocaletto Luca

#### License: GPLv3
