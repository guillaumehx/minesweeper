import { Component } from '@angular/core';
import { GameComponent } from './game/game.component';

@Component({
  selector: '<game></game>',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
