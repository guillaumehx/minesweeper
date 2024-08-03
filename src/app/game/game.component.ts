import {Component, ViewChild} from '@angular/core';
import {ClassicalBoardComponent} from "../board/classical-board/classical-board.component";
import {DatePipe, NgIf} from "@angular/common";
import {TimerComponent} from "../timer/timer.component";
import { confetti } from 'tsparticles-confetti';
import 'animate.css';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'game',
  standalone: true,
  imports: [
    ClassicalBoardComponent,
    NgIf,
    TimerComponent,
    DatePipe,
    FormsModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  result: undefined | 'ONGOING' | 'WON' | 'GAMEOVER'
  @ViewChild('timer') timer!: TimerComponent;
  @ViewChild('minesweeper') minesweeper!: ClassicalBoardComponent;

  playingTime: number = 0;
  stopConfettis: boolean = false;
  displayInputs: boolean = false;
  
  rowsInput: number = 1;
  columnsInput: number = 1;
  minesInput: number = 1;
  maxMines: number = 0;

  startNewGame(rows?: number, columns?: number, mines?: number) {
    if(rows !== undefined && columns !== undefined && mines !== undefined) {
      this.minesweeper.rowsNumber = rows;
      this.minesweeper.columnsNumber = columns;
      this.minesweeper.minesNumber = mines;
    }
    
    this.minesweeper.initializeBoard();
    this.result = undefined;
    this.timer.clearTimer();
    this.timer.startTimer();
    this.stopConfettis = true;
  }

  updateGameStatus(status: string) {
    if (status === 'WON' || status === 'GAMEOVER') {
      if (status === 'WON') {
        this.stopConfettis = false;
        this.triggerConfettis();
      }
      this.playingTime = this.timer.counter;
      this.timer.clearTimer();
      this.result = status;
    } else if (status === 'ONGOING') {
      this.timer.startTimer();
      this.result = status;
    }
  }

  triggerConfettis() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0 || this.stopConfettis) {
        return clearInterval(interval);
      }
    
      const particleCount = 20 * (timeLeft / duration);
    
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random() * (0.3 - 0.1) + 0.1, y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random() * (0.9 - 0.7) + 0.7, y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  customGame() {
    if (!this.displayInputs) {
      this.displayInputs = true;
    }
    this.rowsInput = 1;
    this.columnsInput = 1;
    this.minesInput = 1;
    this.updateBoard();
  }



  updateBoard() {
    this.maxMines = this.rowsInput * this.columnsInput;
    this.startNewGame(this.rowsInput, this.columnsInput, this.minesInput);
  }
}
