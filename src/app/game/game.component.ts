import {Component, ViewChild} from '@angular/core';
import {ClassicalBoardComponent} from "../board/classical-board/classical-board.component";
import {DatePipe, NgIf} from "@angular/common";
import {TimerComponent} from "../timer/timer.component";

@Component({
  selector: 'game',
  standalone: true,
  imports: [
    ClassicalBoardComponent,
    NgIf,
    TimerComponent,
    DatePipe
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  result: undefined | 'ONGOING' | 'WON' | 'GAMEOVER'
  @ViewChild('timer') timer!:TimerComponent;
  @ViewChild('minesweeper') minesweeper!:ClassicalBoardComponent;

  playingTime:number = 0;

  startNewGame(){
    this.minesweeper.initializeBoard();
    this.result = undefined;
    this.timer.clearTimer();
    this.timer.startTimer();
  }
  updateGameStatus(status: string) {
    if(status == 'ONGOING' || status == 'WON' || status == 'GAMEOVER') {
      if (status == 'WON' || status == 'GAMEOVER'){
        this.playingTime = this.timer.counter;
        this.timer.clearTimer();
      }
      if(status == 'ONGOING') this.timer.startTimer();
      this.result = status;
    }
  }
}
