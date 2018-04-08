export class Cell {
    isAlive = false;
    iPos: number;
    jPos: number;
    neighbourPos: string[] = [];
    numberOfAliveNeighbours = 0;

    private rowAbove;
    private rowBelow;
    private columnLeft;
    private columnRight;
    constructor(iPos: number, jPos: number, maxCells: number, randomiseCells: boolean) {
        this.updateRelativePos(iPos, jPos);
        this.populateNeighbourPos(maxCells);
        if (randomiseCells) {
            const rndNumber = Math.floor(Math.random() * 100);
            console.log(rndNumber);
            if (rndNumber > 50) { this.isAlive = true; }
        }
    }

    private updateRelativePos(iPos: number, jPos: number) {
        this.iPos = iPos;
        this.jPos = jPos;

        this.rowAbove = this.iPos - 1;
        this.rowBelow = this.iPos + 1;
        this.columnLeft = this.jPos - 1;
        this.columnRight = this.jPos + 1;
    }

    private populateNeighbourPos(maxCells: number) {
        if (this.rowAbove >= 0) { this.addNeighboursForRowPos(this.rowAbove, maxCells); }
        this.addNeighboursForRowPos(this.iPos, maxCells);
        if (this.rowBelow <= maxCells) { this.addNeighboursForRowPos(this.rowBelow, maxCells); }
    }

    private addNeighboursForRowPos(rowPosToAdd: number, maxCells: number) {
        if (this.columnLeft >= 0) { this.neighbourPos.push(rowPosToAdd + '-' + this.columnLeft); }
        if (this.iPos !== rowPosToAdd) { this.neighbourPos.push(rowPosToAdd + '-' + this.jPos); }
        if (this.columnRight <= maxCells) { this.neighbourPos.push(rowPosToAdd + '-' + this.columnRight); }
    }
}
