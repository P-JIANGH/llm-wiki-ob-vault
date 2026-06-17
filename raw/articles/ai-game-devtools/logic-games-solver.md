# LogicGamesSolver

> Source: https://github.com/fabridigua/LogicGamesSolver
> Captured: 2026-04-14

## README

### Basic Overview

This project combines Computer Vision and Artificial Intelligence to solve logic puzzle games like *Sudoku*, *Stars Battle* and *Skyscrapers*.

The execution consists of 2 phases:

1. **Board Detection** — The software detects the board showed by the user (in real-time or analyzing a local image). Then analyzes the structure to understand the needed informations to solve the game.
2. **Game solving** — The information collected is then used to solve the puzzle considering it as a Constraints Satisfaction Problem using a Backtracking algorithm to find the solution, given the game rules.

**Language**: *Python*

**Frameworks**: *OpenCV*, *Tensorflow*

**Algorithms**: Constraints Satisfaction Problem Backtracking, Digits Classifier (CNN), Image Contours Finding and Warping

### Project structure

```
LogicGamesSolver
├── README.md
├── LICENSE
├── imgs/          # Screenshots for project explanation
├── main.py        # Main file to execute the software
├── DigitClassifier.py  # Class for digit classification with a pretrained CNN
├── PuzzleDetector.py   # Class for puzzle detection and analyze from an image
├── Solver.py          # Class for solving the games given puzzle's informations and rules
└── model_weights.h5    # Pretrained CNN weights
```

### System Requirements

- Python 3.8
- Numpy 1.19.2
- OpenCV 4.0.1
- Tensorflow 2.3.0

### Setup

```bash
$ git clone https://github.com/fabridigua/LogicGamesSolver
$ cd LogicGamesSolver
$ python main.py sudoku 9 3
```

Arguments: `game` (sudoku | skyscrapers | stars), `grid_len` (integer), `square_len` (integer), `is_realtime` (boolean).

### How it works

1. **Board Detection**: Analyzes the image looking for the biggest contour. Once found, warps the puzzle applying a perspective transformation.
2. **Puzzle Analyzing**: For puzzles with numbers (Sudoku, Skyscrapers), a CNN digit classifier trained on MNIST is used. For Stars, OpenCV connected components analysis finds grid areas.
3. **Game solving**: The game is represented as a CSP (Constraint Satisfaction Problem) and solved via backtracking algorithm.

CSP formulation:
- *Variables*: the grid cells to fill
- *Domains*: the sets of values that each cell can assume
- *Constraints*: the game's rules

### Games Included

**Sudoku**: Fill empty cells with 1-9 respecting row/column/area constraints.
**Stars**: Insert stars in each row, column and sector (no adjacent stars).
**Skyscrapers**: Fill grid with 1 to N, where edge numbers indicate visible buildings.

### References

- [Contours : Getting Started - OpenCV](https://docs.opencv.org/3.4/d4/d73/tutorial_py_contours_begin.html)
- [MNIST Dataset](http://yann.lecun.com/exdb/mnist/)
- [The connected-component labeling problem: A review](https://www.sciencedirect.com/science/article/pii/S0031320317301693)
- [Constraint satisfaction problem - Wikipedia](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem)

## Key Source Files

### main.py (96 lines)

Entry point. Orchestrates 3 phases:

```python
# 1. Board detection
detector = PuzzleDetector(info)
cap = cv2.VideoCapture(0)  # Real-time camera
detector.detectGameBoard(frame)

# 2. Board analyze
classifier = DigitClassifier()  # CNN on MNIST
digits_found = classifier.get_sudoku_digits(info)

# 3. Game solution
solver = Solver(info)
solved = solver.solveGame(data)
```

### Solver.py (588 lines)

CSP backtracking solver for Sudoku, Stars, Skyscrapers.

Key methods:
- `solveSudoku()` — All-different constraints in rows, cols, areas
- `solveStars()` — Binary domain ('0'/'1'), adjacency constraint
- `solveSkyscrapers()` — All-different + visibility constraints
- `recursive_backtracking()` — Standard backtracking with neighbor heuristic
- `easy_inference()` — Forward checking to reduce domains

Constraint functions: `alldiff_in_cols_and_rows`, `all_diff_in_areas`, `only_X_in_colums_and_rows`, `never_adjacents`, `max_X_zeros`, `values_are_ordered`.

### PuzzleDetector.py (287 lines)

OpenCV-based board detection.

Key methods:
- `detectSudokuBoard()` — Finds largest contour → perspective warp → grid cell extraction
- `detectStarsBoard()` — Connected components labeling for area detection
- `detectSkyscrapersBoard()` — Similar to Sudoku but extracts edge observer numbers
- `findPolygon()` — Adaptive threshold + contours to find puzzle boundary
- `get_digit()` — Cell ROI → binary threshold → largest contour extraction

Uses `skimage.segmentation.clear_border` to clean cell boundaries.

### DigitClassifier.py (231 lines)

Keras CNN trained on MNIST for digit recognition.

Architecture:
```
Conv2D(32, 5x5) → ReLU → MaxPool(2x2)
Conv2D(32, 3x3) → ReLU → MaxPool(2x2)
Flatten → Dense(64) → ReLU → Dropout(0.5)
Dense(64) → ReLU → Dropout(0.5)
Dense(10) → Softmax
```

Training: Adam lr=1e-3, categorical_crossentropy, 10 epochs, batch 128.

Key methods:
- `get_sudoku_digits()` — Aggregates predictions across 7 frames (mode voting, 4↔9 heuristic)
- `get_skyscrapers_digits()` — Similar aggregation for edge numbers
- `analyze_skyscrapers_boards()` — Extracts observer digits from grid edges
