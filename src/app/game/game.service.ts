import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { never } from 'rxjs/observable/never';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { GameGrid } from './gameGrid';
import { Cell } from './cell';

@Injectable()
export class GameService {

  private _timer = new Subject<number>();
  private _hasStarted = new Subject<boolean>();

  timer$ = this._timer.asObservable().switchMap(ticks => interval(ticks));
  hasStarted$ = this._hasStarted.asObservable();

  private _gameGrid = new BehaviorSubject(new GameGrid(10, false));
  gameGrid$ = this._gameGrid.asObservable();

  constructor() { }

  start(ticksPerSecond: number): void {
    this._hasStarted.next(true);
    this._timer.next(1000 / ticksPerSecond);
  }

  stop(): void {
    this._hasStarted.next(false);
  }

  iterate(): void {
    const game = this._gameGrid.getValue();
    const isGameOver = game.updateGameAndCheckIfOver();
    if (isGameOver) { this.stop(); }
    this._gameGrid.next(game);
  }

  getGridWidthPercent(): string {
    const game = this._gameGrid.getValue();
    return 100 / game.gridLength + '%';
  }

  invertCellAliveStatus(i: number, j: number) {
    const game = this._gameGrid.getValue();
    game.cells[i][j].isAlive = !game.cells[i][j].isAlive;
    this._gameGrid.next(game);
  }

  updateGridSize(gridSize: number) {
    this._gameGrid.next(new GameGrid(gridSize, false));
  }

  randomiseGrid(gridSize: number) {
    this._gameGrid.next(new GameGrid(gridSize, true));
  }
}
