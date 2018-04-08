import { Cell } from './cell';

export class GameGrid {
    cells: Cell[][];
    gridLength: number;
    rows: number[] = new Array<number>();

    constructor(gridLength: number, randomiseCells: boolean) {
        this.gridLength = gridLength;
        this.cells = [];
        for (let iPos = 0; iPos < gridLength; iPos++) {
            this.rows.push(iPos);
            this.cells[iPos] = [];
            for (let jPos = 0; jPos < gridLength; jPos++) {
                this.cells[iPos][jPos] = new Cell(iPos, jPos, gridLength - 1, randomiseCells);
            }
        }
    }

    updateGameAndCheckIfOver(): boolean {
        this.cells.forEach(cells => {
            cells.forEach(cell => {
                this.updateCellsAliveNeighbours(cell);
            });
        });

        let isGameOver = true;
        this.cells.forEach(cells => {
            cells.forEach(cell => {
                this.calculateAliveStatus(cell);
                if (cell.isAlive) { isGameOver = false; }
            });
        });

        return isGameOver;
    }

    updateCellsAliveNeighbours(cell: Cell) {
        let aliveNeighbours = 0;
        cell.neighbourPos.forEach(x => {
            const posArray = x.split('-');
            const neighbour = this.cells[posArray[0]][posArray[1]] as Cell;
            if (neighbour.isAlive) { aliveNeighbours = aliveNeighbours + 1; }
        });

        cell.numberOfAliveNeighbours = aliveNeighbours;
    }

    private calculateAliveStatus(cell: Cell) {
        if (cell.isAlive) {
            if (cell.numberOfAliveNeighbours < 2 || cell.numberOfAliveNeighbours > 3) { cell.isAlive = false; }
            return;
        }
        if (cell.numberOfAliveNeighbours === 3) { cell.isAlive = true; }
    }
}
