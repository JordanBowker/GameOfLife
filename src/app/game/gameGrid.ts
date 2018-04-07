import { Cell } from './cell';

export class GameGrid {
    cells: Cell[][];
    gridLength: number;
    rows: number[] = new Array<number>();

    constructor(gridLength: number) {
        this.gridLength = gridLength;

        this.cells = [];
        for (let index = 0; index < gridLength; index++) {
            this.rows.push(index);
            this.cells[index] = [];
            for (let jdex = 0; jdex < gridLength; jdex++) {
                this.cells[index][jdex] = new Cell();
            }
        }
    }
}
