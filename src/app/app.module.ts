import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';
import { GameOptionsComponent } from './game/game-options/game-options.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
