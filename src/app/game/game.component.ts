import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { GameService } from './game.service';
import { GameGrid } from './gameGrid';
import { Cell } from './cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  css = 'red';
  private _takeUntil = new Subject<boolean>();

  gameGrid$ = this._gameService.gameGrid$.takeUntil(this._takeUntil);

  constructor(private _gameService: GameService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._takeUntil.next(true);
  }

  getGridWidthPercent() {
    return this._gameService.getGridWidthPercent();
  }

  invertCellAliveStatus(i, j) {
    this._gameService.invertCellAliveStatus(i, j);
  }
}
