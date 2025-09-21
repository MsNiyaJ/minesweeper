export class Board {
  boardCells: string[][] = [];

  constructor() {
    this.generateBoard(10, 10);
  }

  private setBombs(rows: number, cols: number): void {
    const numOfBombs = Math.floor((rows * cols) / 6); // Approximately 16% of the board
    let bombsPlaced = 0;

    while (bombsPlaced < numOfBombs) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (this.boardCells[row]?.[col] === '') {
        this.boardCells[row][col] = 'B'; // Place a bomb
        this.incrementAdjacentCounts(row, col);
        bombsPlaced++;
      }
    }
  }

  private incrementAdjacentCounts(bombRow: number, bombCol: number): void {
    const directions: [number, number][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    directions.forEach((direction) => {
      const adjRow = bombRow + direction[0];
      const adjCol = bombCol + direction[1];

      const cell = this.boardCells[adjRow]?.[adjCol];
      if (cell !== 'B' && cell !== undefined) {
        const newValue = cell === '' ? '1' : (parseInt(cell) + 1).toString();
        this.boardCells[adjRow]![adjCol] = newValue;
      }
    });
  }

  generateBoard(rows: number, cols: number): void {
    this.boardCells = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => '')
    );

    this.setBombs(rows, cols);
    console.log(this.boardCells);
  }

  revealEmptyCells(): void {
    // TODO: This should reveal all other adjacent empty cells & numbers and stops at bombs
    console.log('Revealing empty cells...');
  }
}
