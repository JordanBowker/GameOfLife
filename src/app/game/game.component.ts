import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { never } from 'rxjs/observable/never';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  ticksPerSecond = 1;

  private _timer = new Subject<number>();
  private _hasStarted = new Subject<boolean>();
  private _takeUntil = new Subject<boolean>();

  private _timer$ = this._timer.asObservable().switchMap(ticks => interval(ticks));
  private hasStarted$ = this._hasStarted.asObservable();

  timer$ = this.hasStarted$.switchMap((started) => started ? this._timer$ : never()).takeUntil(this._takeUntil);

  start(): void {
    this._hasStarted.next(true);
    this._timer.next(1000 / this.ticksPerSecond);
  }

  stop(): void {
    this._hasStarted.next(false);
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._takeUntil.next(true);
  }
}
