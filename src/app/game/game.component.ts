import { Component, ViewChild } from '@angular/core';
import { ClassicalBoardComponent } from '../board/classical-board/classical-board.component';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../service/confetti/confetti.service';
import { TimerService } from '../service/timer/timer.service';

@Component({
  selector: 'game',
  standalone: true,
  imports: [ClassicalBoardComponent, NgIf, DatePipe, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  result: undefined | 'ONGOING' | 'WON' | 'GAMEOVER';
  // This field is required for the shaking animation
  @ViewChild('content') content!: HTMLElement;
  @ViewChild('minesweeper') minesweeper!: ClassicalBoardComponent;

  playingTime: number = 0;
  displayInputs: boolean = false;

  input: { row: number; column: number; mine: number } = {
    row: 1,
    column: 1,
    mine: 1,
  };
  maxMines: number = 0;

  constructor(
    private conffetiService: ConfettiService,
    private timerService: TimerService,
  ) {}

  startNewGame(rows?: number, columns?: number, mines?: number) {
    if (rows !== undefined && columns !== undefined && mines !== undefined) {
      this.minesweeper.rowsNumber = rows;
      this.minesweeper.columnsNumber = columns;
      this.minesweeper.minesNumber = mines;
    }
    this.minesweeper.initializeBoard();
    this.result = undefined;
    this.timerService.clear();
    this.conffetiService.stopConfettis(true);
  }

  updateGameStatus(status: string) {
    if (status === 'WON' || status === 'GAMEOVER') {
      if (status === 'WON') {
        this.conffetiService.stopConfettis(false);
        this.conffetiService.triggerConfettis();
      }
      this.timerService.stop();
      this.result = status;
    } else if (status === 'ONGOING') {
      this.timerService.start();
      this.result = status;
    }
  }

  customGame() {
    if (!this.displayInputs) {
      this.displayInputs = true;
    }
    this.input.row = 3;
    this.input.column = 3;
    this.input.mine = 1;
    this.updateBoard();
  }

  updateBoard() {
    this.maxMines = this.input.row * this.input.column;
    this.startNewGame(this.input.row, this.input.column, this.input.mine);
  }
}
