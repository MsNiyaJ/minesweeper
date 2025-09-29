export interface ICellData {
  value: string;
  hasFlag: boolean;
  revealed: boolean;
}

export class Board {
  boardCells!: ICellData[][];
  ROW_LENGTH: number = 10;
  COL_LENGTH: number = 10;

  constructor() {
    this.generateBoard();
  }

  generateBoard(): void {
    this.boardCells = Array.from({ length: this.ROW_LENGTH }, (_row) =>
      Array.from({ length: this.COL_LENGTH }, (_col) => ({
        revealed: false,
        hasFlag: false,
        value: '',
      }))
    );

    this.setValues();
  }

  private setValues(): void {
    const numOfBombs = Math.floor((this.ROW_LENGTH * this.COL_LENGTH) / 6); // Approximately 16% of the board
    let bombsPlaced = 0;

    while (bombsPlaced < numOfBombs) {
      const row = Math.floor(Math.random() * this.ROW_LENGTH);
      const col = Math.floor(Math.random() * this.COL_LENGTH);

      const cell = this.getCell(row, col);
      if (cell && cell.value === '') {
        cell.value = 'B'; // Place a bomb
        this.incrementAdjacentCounts(row, col);
        bombsPlaced++;
      }
    }
  }

  private getCell(rowIndex: number, colIndex: number): ICellData | undefined {
    return this.boardCells[rowIndex]?.[colIndex];
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

      const cell = this.getCell(adjRow, adjCol);
      if (cell && cell.value !== 'B') {
        const value = cell.value === '' ? 0 : parseInt(cell.value);
        cell.value = (value + 1).toString();
      }
    });
  }

  revealCell(rowIndex: number, colIndex: number) {
    const cell = this.getCell(rowIndex, colIndex);
    if (cell) cell.revealed = true;
  }

  revealCells(rowIndex: number, colIndex: number): void {
    // TODO: This should reveal all other adjacent empty cells & numbers and stops at bombs
    console.log('Revealing adjacent cells...', {
      rowIndex,
      colIndex,
    });

    this.revealCell(rowIndex, colIndex);
  }
}
