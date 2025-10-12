export interface ICellData {
  value: string;
  hasFlag: boolean;
  revealed: boolean;
}

export class Board {
  boardCells!: ICellData[][];
  ROW_LENGTH: number = 10;
  COL_LENGTH: number = 10;
  totalBombs: number = 0;
  totalFlags: number = 0;

  constructor() {
    this.generateBoard();
  }

  get remainingBombs() {
    const remains = this.totalBombs - this.totalFlags;
    return remains < 0 ? 0 : remains;
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
    this.totalBombs = Math.floor((this.ROW_LENGTH * this.COL_LENGTH) / 6); // Approximately 16% of the board
    let bombsPlaced = 0;

    while (bombsPlaced < this.totalBombs) {
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

  private revealAllAdjCells(rowIndex: number, colIndex: number) {
    // runs for each empty adjacant cell and ends once a number is discovered
    for (let adjRow = rowIndex - 1; adjRow <= rowIndex + 1; adjRow++) {
      for (let adjCol = colIndex - 1; adjCol <= colIndex + 1; adjCol++) {
        const ogCellClicked = adjRow === rowIndex && adjCol === colIndex;

        if (!ogCellClicked) {
          this.revealCells(adjRow, adjCol);
        }
      }
    }
  }

  revealCells(rowIndex: number, colIndex: number): void {
    const cell = this.getCell(rowIndex, colIndex);
    if (!cell || cell.revealed) return;

    cell.revealed = true;

    const cellHasNumber = !isNaN(parseInt(cell.value));
    if (!cellHasNumber) {
      this.revealAllAdjCells(rowIndex, colIndex);
    }
  }

  flagAdded(cell: ICellData) {
    cell.hasFlag = true;
    this.totalFlags = this.totalFlags + 1;
  }

  flagRemoved(cell: ICellData) {
    cell.hasFlag = false;
    this.totalFlags = this.totalFlags - 1;
  }
}
