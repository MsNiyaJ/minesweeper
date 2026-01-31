# Minesweeper

## How to Play

### Game Objective

Your goal is to reveal all cells that don't contain mines without clicking on any mine. Click on a cell to uncover what's beneath it.

### Game Mechanics

- **Left-click a cell** to reveal it. If it's a mine, the game is over. If it's a numbered cell, it shows how many mines are adjacent. If it's empty, adjacent cells may auto-reveal.
- **Use the flag button** to toggle flagging mode. When enabled, left-clicking cells will place or remove flags instead of revealing them. Flags help you mark cells you believe contain mines.
- **Right-click a cell** to quickly place or remove a flag without needing to toggle the flag button first. This is a convenient shortcut for flagging suspicious cells while in reveal mode.
- **Click the smiley face button** to start a new game. This resets the board and all flags, allowing you to play again.
- **Logical deduction**: Use the numbers on revealed cells to deduce mine locations. For example, if a cell shows "2" and has 2 unrevealed adjacent cells, both likely contain mines.

### Winning and Losing

- **Win**: Reveal all non-mine cells without clicking any mines.
- **Lose**: Click on a mine—the game ends immediately.

### Running locally

- Switch to the node version specified under engines in [package.json](./package.json)

- Install dependencies

```
yarn
```

- Run the app

```
yarn dev
```

- Visit http://localhost:5173/
