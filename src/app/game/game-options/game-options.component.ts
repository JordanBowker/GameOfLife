import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { never } from 'rxjs/observable/never';
import 'rxjs/add/operator/map';

import { GameService } from './../game.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent implements OnInit, OnDestroy {

  ticksPerSecond = 1;
  speedOptions = [0.5, 1, 2];

  gridSize = 10;
  gridSizes = [10, 20, 30];

  private _takeUntil = new Subject<boolean>();

  iteration$ = this._gameService.hasStarted$.switchMap((started) => started ? this._gameService.timer$ : never())
    .map(x => x as number + 1)
    .do(x => this._gameService.iterate())
    .takeUntil(this._takeUntil);

  constructor(private _gameService: GameService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._takeUntil.next(true);
  }

  start(): void {
    this._gameService.start(this.ticksPerSecond);
  }

  stop(): void {
    this._gameService.stop();
  }

  updateGridSize(): void {
    this._gameService.updateGridSize(this.gridSize);
  }
}
